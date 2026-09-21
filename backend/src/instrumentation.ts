//http://localhost:16686/
import { NodeSDK } from "@opentelemetry/sdk-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";
import { PrometheusExporter } from "@opentelemetry/exporter-prometheus";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";

const traceExporter = new OTLPTraceExporter({
  url: "http://localhost:4317",
});

const metricExporter = new PrometheusExporter({
  port: 9464,
  endpoint: "/metrics",
});

const sdk = new NodeSDK({
  traceExporter,
  metricReader: metricExporter,
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

console.log("OpenTelemetry initialized");
console.log("Prometheus metrics available at http://localhost:9464/metrics");