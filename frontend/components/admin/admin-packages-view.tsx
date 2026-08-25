"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import {
  createAdminPackage,
  deleteAdminPackage,
  listAdminPackages,
  updateAdminPackage,
} from "@/lib/api/admin";
import { getErrorMessage } from "@/lib/api/client";
import { formatINR } from "@/lib/format";
import { useAdminAuthError } from "./use-admin-auth-error";
import { Badge, Card, Skeleton } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input, Select, Textarea } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import type { PackageCategory, PackageInput, TravelPackage } from "@/types";

const CATEGORIES: { id: PackageCategory; label: string }[] = [
  { id: "domestic", label: "Domestic" },
  { id: "international", label: "International" },
  { id: "offer", label: "Offer" },
  { id: "upcoming_event", label: "Upcoming event" },
];

const EMPTY_FORM: PackageInput = {
  title: "",
  tagline: "",
  destination: "",
  category: "domestic",
  duration: "",
  stays: "",
  guests: "2 Adults",
  highlights: [],
  itinerary: [],
  price: 0,
  priceNote: "per person",
  negotiable: true,
  imageUrl: "",
  pdfUrl: "",
  eventDate: null,
  featured: false,
  sortOrder: 0,
  active: true,
};

function linesToList(value: string): string[] {
  return value
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function listToLines(list: string[]): string {
  return list.join("\n");
}

export function AdminPackagesView() {
  const handleAuthError = useAdminAuthError();
  const [packages, setPackages] = useState<TravelPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<TravelPackage | null>(null);
  const [editing, setEditing] = useState<TravelPackage | null>(null);
  const [form, setForm] = useState<PackageInput>(EMPTY_FORM);
  const [highlightsText, setHighlightsText] = useState("");
  const [itineraryText, setItineraryText] = useState("");
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await listAdminPackages();
      setPackages(data);
    } catch (err) {
      if (handleAuthError(err)) return;
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openCreate() {
    setEditing(null);
    setForm(EMPTY_FORM);
    setHighlightsText("");
    setItineraryText("");
    setModalOpen(true);
  }

  function openEdit(pkg: TravelPackage) {
    const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = pkg;
    void _id;
    void _c;
    void _u;
    setEditing(pkg);
    setForm(rest);
    setHighlightsText(listToLines(pkg.highlights));
    setItineraryText(listToLines(pkg.itinerary));
    setModalOpen(true);
  }

  function patchForm(patch: Partial<PackageInput>) {
    setForm((prev) => ({ ...prev, ...patch }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const payload: PackageInput = {
      ...form,
      highlights: linesToList(highlightsText),
      itinerary: linesToList(itineraryText),
      eventDate: form.eventDate?.trim() || null,
      price: Number(form.price) || 0,
      sortOrder: Number(form.sortOrder) || 0,
    };

    if (payload.category === "upcoming_event" && !payload.eventDate) {
      setError("Upcoming event packages need an event date.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      if (editing) {
        const updated = await updateAdminPackage(editing.id, payload);
        setPackages((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        setNotice("Package updated");
      } else {
        const created = await createAdminPackage(payload);
        setPackages((prev) =>
          [...prev, created].sort((a, b) => a.sortOrder - b.sortOrder),
        );
        setNotice("Package created");
      }
      setModalOpen(false);
    } catch (err) {
      if (handleAuthError(err)) return;
      setError(getErrorMessage(err));
    } finally {
      setSaving(false);
    }
  }

  async function handleToggleActive(pkg: TravelPackage) {
    const { id, createdAt, updatedAt, ...rest } = pkg;
    void createdAt;
    void updatedAt;
    try {
      const updated = await updateAdminPackage(id, { ...rest, active: !pkg.active });
      setPackages((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    } catch (err) {
      if (handleAuthError(err)) return;
      setError(getErrorMessage(err));
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteAdminPackage(deleteTarget.id);
      setPackages((prev) => prev.filter((p) => p.id !== deleteTarget.id));
      setNotice("Package deleted");
      setDeleteTarget(null);
    } catch (err) {
      if (handleAuthError(err)) return;
      setError(getErrorMessage(err));
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold text-ink">Packages</h1>
          <p className="mt-0.5 text-sm text-ink-muted">
            Create, edit, activate, and delete holiday packages
          </p>
        </div>
        <Button size="sm" onClick={openCreate}>
          <Plus className="size-3.5" />
          New package
        </Button>
      </div>

      {error && (
        <p role="alert" className="rounded-lg bg-danger-50 px-3 py-2 text-sm text-danger-700">
          {error}
        </p>
      )}
      {notice && (
        <p role="status" className="rounded-lg bg-success-50 px-3 py-2 text-sm text-success-700">
          {notice}
        </p>
      )}

      <Card padded={false} className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-neutral-200 bg-neutral-50 text-[11px] uppercase tracking-wide text-ink-subtle">
            <tr>
              <th className="px-3 py-2.5 font-semibold">Package</th>
              <th className="px-3 py-2.5 font-semibold">Category</th>
              <th className="px-3 py-2.5 font-semibold">Price</th>
              <th className="px-3 py-2.5 font-semibold">Status</th>
              <th className="px-3 py-2.5 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {packages.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-center text-ink-muted">
                  No packages yet. Create one to get started.
                </td>
              </tr>
            ) : (
              packages.map((pkg) => (
                <tr key={pkg.id} className="hover:bg-neutral-50">
                  <td className="px-3 py-2.5">
                    <p className="font-semibold text-ink">{pkg.title}</p>
                    <p className="text-[11px] text-ink-subtle">
                      {pkg.destination} · {pkg.duration}
                    </p>
                  </td>
                  <td className="px-3 py-2.5">
                    <Badge tone="primary">{pkg.category.replace("_", " ")}</Badge>
                  </td>
                  <td className="px-3 py-2.5 font-semibold">{formatINR(pkg.price)}</td>
                  <td className="px-3 py-2.5">
                    <Badge tone={pkg.active ? "success" : "neutral"}>
                      {pkg.active ? "Active" : "Inactive"}
                    </Badge>
                    {pkg.featured && (
                      <Badge tone="accent" className="ml-1">
                        Featured
                      </Badge>
                    )}
                  </td>
                  <td className="px-3 py-2.5">
                    <div className="flex flex-wrap gap-1">
                      <Button size="sm" variant="ghost" onClick={() => openEdit(pkg)}>
                        <Pencil className="size-3.5" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => void handleToggleActive(pkg)}
                      >
                        {pkg.active ? (
                          <EyeOff className="size-3.5" />
                        ) : (
                          <Eye className="size-3.5" />
                        )}
                        {pkg.active ? "Hide" : "Show"}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-danger-700"
                        onClick={() => setDeleteTarget(pkg)}
                      >
                        <Trash2 className="size-3.5" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit package" : "New package"}
        className="sm:max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
          <Field label="Title" className="sm:col-span-2">
            <Input
              required
              value={form.title}
              onChange={(e) => patchForm({ title: e.target.value })}
            />
          </Field>
          <Field label="Tagline" className="sm:col-span-2">
            <Input
              value={form.tagline}
              onChange={(e) => patchForm({ tagline: e.target.value })}
            />
          </Field>
          <Field label="Destination">
            <Input
              required
              value={form.destination}
              onChange={(e) => patchForm({ destination: e.target.value })}
            />
          </Field>
          <Field label="Category">
            <Select
              value={form.category}
              onChange={(e) =>
                patchForm({ category: e.target.value as PackageCategory })
              }
            >
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Duration">
            <Input
              required
              placeholder="5N / 6D"
              value={form.duration}
              onChange={(e) => patchForm({ duration: e.target.value })}
            />
          </Field>
          <Field label="Stays">
            <Input
              value={form.stays}
              onChange={(e) => patchForm({ stays: e.target.value })}
            />
          </Field>
          <Field label="Guests">
            <Input
              value={form.guests}
              onChange={(e) => patchForm({ guests: e.target.value })}
            />
          </Field>
          <Field label="Price (INR)">
            <Input
              type="number"
              min={0}
              required
              value={form.price}
              onChange={(e) => patchForm({ price: Number(e.target.value) })}
            />
          </Field>
          <Field label="Price note">
            <Input
              value={form.priceNote}
              onChange={(e) => patchForm({ priceNote: e.target.value })}
            />
          </Field>
          <Field label="Sort order">
            <Input
              type="number"
              min={0}
              value={form.sortOrder}
              onChange={(e) => patchForm({ sortOrder: Number(e.target.value) })}
            />
          </Field>
          <Field label="Image URL" className="sm:col-span-2">
            <Input
              value={form.imageUrl}
              onChange={(e) => patchForm({ imageUrl: e.target.value })}
              placeholder="https://…"
            />
          </Field>
          <Field label="PDF URL" className="sm:col-span-2">
            <Input
              value={form.pdfUrl}
              onChange={(e) => patchForm({ pdfUrl: e.target.value })}
            />
          </Field>
          {form.category === "upcoming_event" && (
            <Field label="Event date" className="sm:col-span-2">
              <Input
                type="date"
                value={form.eventDate ?? ""}
                onChange={(e) => patchForm({ eventDate: e.target.value || null })}
              />
            </Field>
          )}
          <Field label="Highlights (one per line)" className="sm:col-span-2">
            <Textarea
              rows={3}
              value={highlightsText}
              onChange={(e) => setHighlightsText(e.target.value)}
            />
          </Field>
          <Field label="Itinerary (one per line)" className="sm:col-span-2">
            <Textarea
              rows={3}
              value={itineraryText}
              onChange={(e) => setItineraryText(e.target.value)}
            />
          </Field>
          <label className="flex items-center gap-2 text-sm font-medium text-ink">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => patchForm({ featured: e.target.checked })}
            />
            Featured
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-ink">
            <input
              type="checkbox"
              checked={form.active}
              onChange={(e) => patchForm({ active: e.target.checked })}
            />
            Active (visible on site)
          </label>
          <label className="flex items-center gap-2 text-sm font-medium text-ink sm:col-span-2">
            <input
              type="checkbox"
              checked={form.negotiable}
              onChange={(e) => patchForm({ negotiable: e.target.checked })}
            />
            Price negotiable
          </label>
          <div className="flex justify-end gap-2 sm:col-span-2">
            <Button type="button" variant="outline" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving…" : editing ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        open={Boolean(deleteTarget)}
        onClose={() => setDeleteTarget(null)}
        title="Delete package?"
      >
        {deleteTarget && (
          <div className="space-y-4">
            <p className="text-sm text-ink-muted">
              Permanently delete <strong className="text-ink">{deleteTarget.title}</strong>? This
              cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDeleteTarget(null)}>
                Cancel
              </Button>
              <Button
                className="bg-danger-500 hover:bg-danger-700"
                disabled={deleting}
                onClick={() => void handleDelete()}
              >
                {deleting ? "Deleting…" : "Delete"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
