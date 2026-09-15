import type { IntegrationType } from "../types/integration.types";
import { Radio, Bot } from "lucide-react";

export const INTEGRATION_TYPES: {
  value: IntegrationType;
  label: string;
  description: string;
  icon: typeof Radio;
}[] = [
  {
    value: "PROMETHEUS",
    label: "Prometheus",
    description: "Connect Prometheus for metrics monitoring.",
    icon: Radio,
  },
  {
    value: "RESOLVE_AGENT",
    label: "Resolve Agent",
    description: "Monitor Docker services automatically with Resolve Agent.",
    icon: Bot,
  },
];

export const SHORT_INTEGRATION_TYPES: Record<
  IntegrationType,
  {
    label: string;
    icon: typeof Radio;
    description: string;
  }
> = {
  PROMETHEUS: {
    label: "Prometheus",
    icon: Radio,
    description: "Metrics monitoring",
  },

  RESOLVE_AGENT: {
    label: "Resolve Agent",
    icon: Bot,
    description: "Docker log monitoring",
  },
};