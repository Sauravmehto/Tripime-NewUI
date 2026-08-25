"use client";

import { Bus, Hotel } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useComingSoon } from "@/hooks/use-coming-soon";

export function ComingSoonProductPage({
  product,
  title,
  description,
  icon: Icon,
}: {
  product: string;
  title: string;
  description: string;
  icon: typeof Hotel;
}) {
  const { show, dialog } = useComingSoon(product);

  return (
    <>
      <Container className="py-12 sm:py-16">
        <Card className="mx-auto max-w-lg text-center">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-50 text-primary-700">
            <Icon className="size-6" aria-hidden />
          </span>
          <h1 className="mt-4 text-2xl font-bold text-ink">{title}</h1>
          <p className="mt-2 text-sm text-ink-muted">{description}</p>
          <Button className="mt-6" size="lg" onClick={show}>
            Get help booking {product.toLowerCase()}
          </Button>
        </Card>
      </Container>
      {dialog}
    </>
  );
}

export function HotelsPageView() {
  return (
    <ComingSoonProductPage
      product="Hotels"
      title="Hotels"
      description="Online hotel booking is launching soon. Call or WhatsApp our travel experts to book stays today."
      icon={Hotel}
    />
  );
}

export function BusesPageView() {
  return (
    <ComingSoonProductPage
      product="Buses"
      title="Buses"
      description="Bus booking is launching soon. Call or WhatsApp our travel experts to book coaches today."
      icon={Bus}
    />
  );
}
