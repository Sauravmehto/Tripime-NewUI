"use client";

import { useEffect, useState } from "react";
import { listAdminEnquiries, updateAdminEnquiryStatus } from "@/lib/api/admin";
import { getErrorMessage } from "@/lib/api/client";
import { formatDateTime } from "@/lib/format";
import { useAdminAuthError } from "./use-admin-auth-error";
import { Badge, Card, Skeleton } from "@/components/ui/card";
import { Select } from "@/components/ui/input";
import type { Enquiry, EnquiryStatus } from "@/types";

const STATUS_OPTIONS: EnquiryStatus[] = ["NEW", "CONTACTED", "CLOSED"];

const STATUS_TONE: Record<EnquiryStatus, "warning" | "primary" | "success"> = {
  NEW: "warning",
  CONTACTED: "primary",
  CLOSED: "success",
};

export function AdminEnquiriesView() {
  const handleAuthError = useAdminAuthError();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const data = await listAdminEnquiries();
        if (!cancelled) setEnquiries(data);
      } catch (err) {
        if (handleAuthError(err)) return;
        if (!cancelled) setError(getErrorMessage(err));
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [handleAuthError]);

  async function handleStatusChange(enquiry: Enquiry, status: EnquiryStatus) {
    if (status === enquiry.status) return;
    setUpdatingId(enquiry.id);
    setError("");
    try {
      const updated = await updateAdminEnquiryStatus(enquiry.id, status);
      setEnquiries((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    } catch (err) {
      if (handleAuthError(err)) return;
      setError(getErrorMessage(err));
    } finally {
      setUpdatingId(null);
    }
  }

  const newCount = enquiries.filter((e) => e.status === "NEW").length;

  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold text-ink">Enquiries</h1>
          <p className="mt-0.5 text-sm text-ink-muted">
            Package holiday leads from the public site
          </p>
        </div>
        <Badge tone="warning">{newCount} new</Badge>
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-danger-50 px-3 py-2 text-sm text-danger-700">
          {error}
        </p>
      )}

      {enquiries.length === 0 ? (
        <Card>
          <p className="text-sm text-ink-muted">No enquiries yet.</p>
        </Card>
      ) : (
        <ul className="space-y-3">
          {enquiries.map((e) => (
            <li key={e.id}>
              <Card>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-bold text-ink">{e.name}</h2>
                      <Badge tone={STATUS_TONE[e.status]}>{e.status}</Badge>
                    </div>
                    <p className="mt-1 text-xs text-ink-muted">
                      {e.email} · {e.phone}
                      {e.packageTitle ? ` · ${e.packageTitle}` : ""}
                    </p>
                    <p className="mt-0.5 text-[11px] text-ink-subtle">
                      {formatDateTime(e.createdAt)}
                      {e.travelMonth ? ` · Travel: ${e.travelMonth}` : ""}
                      {e.travelers ? ` · ${e.travelers} travellers` : ""}
                    </p>
                    {e.message && (
                      <p className="mt-2 text-sm leading-relaxed text-ink">{e.message}</p>
                    )}
                  </div>
                  <Select
                    value={e.status}
                    disabled={updatingId === e.id}
                    onChange={(ev) =>
                      void handleStatusChange(e, ev.target.value as EnquiryStatus)
                    }
                    className="h-9 w-[140px] shrink-0 text-xs"
                    aria-label={`Status for ${e.name}`}
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
