export enum IntegrationType {
  PROMETHEUS = "PROMETHEUS",
  GRAFANA = "GRAFANA",
  WEBHOOK = "WEBHOOK",
}

export enum AlertStatus {
  FIRING = "FIRING",
  RESOLVED = "RESOLVED",
}

export enum AlertOperator {
  GT = "GT",
  LT = "LT",
  GTE = "GTE",
  LTE = "LTE",
  EQ = "EQ",
}