import type { IntegrationType } from "../types/integration.types";
import { Globe, Radio, Webhook, } from "lucide-react";

export const INTEGRATION_TYPES: {
  value: IntegrationType;
  label: string;
  description: string;
  icon: typeof Globe;
}[] = [
  {
    value: "PROMETHEUS",
    label: "Prometheus",
    description: "Connect Prometheus for metrics monitoring.",
    icon: Radio,
  },
  {
    value: "GRAFANA",
    label: "Grafana",
    description: "Connect Grafana for metrics visualization.",
    icon: Globe,
  },
  {
    value: "WEBHOOK",
    label: "Webhook",
    description: "Receive monitoring events through a webhook.",
    icon: Webhook,
  },
];

export const SHORT_INTEGRATION_TYPES: Record<
  IntegrationType,
  {
    label: string;
    icon: typeof Globe;
    description: string;
  }
> = {
  PROMETHEUS: {
    label: "Prometheus",
    icon: Radio,
    description: "Metrics monitoring",
  },

  GRAFANA: {
    label: "Grafana",
    icon: Globe,
    description: "Metrics visualization",
  },

  WEBHOOK: {
    label: "Webhook",
    icon: Webhook,
    description: "Event notifications",
  },
};