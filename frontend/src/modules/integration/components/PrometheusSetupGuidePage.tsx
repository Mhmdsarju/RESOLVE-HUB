import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleCheck,
  Clipboard,
  Clock3,
  Copy,
  FileCode2,
  Info,
  Play,
  Server,
  ShieldCheck,
  Terminal,
  Webhook,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const setupSteps = [
  {
    id: "prerequisites",
    number: "01",
    title: "Prerequisites",
    description: "Make sure your application and Docker environment are ready.",
  },
  {
    id: "files",
    number: "02",
    title: "Create Monitoring Files",
    description:
      "Create the configuration files required by Prometheus and Alertmanager.",
  },
  {
    id: "prometheus",
    number: "03",
    title: "Configure Prometheus",
    description: "Configure Prometheus to collect metrics from your application.",
  },
  {
    id: "rules",
    number: "04",
    title: "Configure Alert Rules",
    description: "Define the conditions that should create monitoring alerts.",
  },
  {
    id: "resolvehub",
    number: "05",
    title: "Connect ResolveHub",
    description: "Connect Alertmanager to your ResolveHub monitoring project.",
  },
  {
    id: "docker",
    number: "06",
    title: "Configure Docker Compose",
    description:
      "Run Prometheus and Alertmanager together using Docker Compose.",
  },
  {
    id: "verify",
    number: "07",
    title: "Verify the Setup",
    description:
      "Make sure Prometheus and Alertmanager are working correctly.",
  },
  {
    id: "test",
    number: "08",
    title: "Test an Incident",
    description:
      "Trigger a test alert and verify that ResolveHub receives it.",
  },
  {
    id: "troubleshooting",
    number: "09",
    title: "Troubleshooting",
    description: "Common problems and ways to resolve them.",
  },
];

const prometheusConfig = `global:
  scrape_interval: 5s

alerting:
  alertmanagers:
    - static_configs:
        - targets:
            - "alertmanager:9093"

rule_files:
  - "/etc/prometheus/alert-rules.yml"

scrape_configs:
  - job_name: "my-backend"
    metrics_path: "/metrics"

    static_configs:
      - targets:
          - "host.docker.internal:5005"`;

const alertRulesConfig = `groups:
  - name: my-backend-alerts

    rules:
      - alert: BackendDown
        expr: up{job="my-backend"} == 0
        for: 10s

        labels:
          priority: P2
          severity: HIGH

        annotations:
          summary: "Backend is down"
          description: "Backend has been unreachable for more than 10 seconds."`;

const alertmanagerConfig = `global:
  resolve_timeout: 5m

route:
  receiver: "resolvehub"

receivers:
  - name: "resolvehub"
    webhook_configs:
      - url: "YOUR_RESOLVEHUB_WEBHOOK_URL"
        send_resolved: true`;

const dockerComposeConfig = `services:
  prometheus:
    image: prom/prometheus:latest

    container_name: my-prometheus

    ports:
      - "9090:9090"

    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml:ro
      - ./alert-rules.yml:/etc/prometheus/alert-rules.yml:ro

    depends_on:
      - alertmanager

    restart: unless-stopped

  alertmanager:
    image: prom/alertmanager:latest

    container_name: my-alertmanager

    ports:
      - "9000:9093"

    volumes:
      - ./alertmanager.yml:/etc/alertmanager/alertmanager.yml:ro

    restart: unless-stopped`;

const startCommand = `docker compose up -d`;

const testCommand = `docker stop my-backend`;

function CodeBlock({
  code,
  language = "yaml",
}: {
  code: string;
  language?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
        <div className="flex items-center gap-2">
          <FileCode2 className="h-4 w-4 text-slate-400" />

          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {language}
          </span>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              Copy
            </>
          )}
        </button>
      </div>

      <pre className="overflow-x-auto p-5 text-sm leading-7 text-slate-200">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function StepBadge({ number }: { number: string }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#4B3932] text-xs font-bold text-white shadow-sm">
      {number}
    </div>
  );
}

export default function PrometheusSetupGuidePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [activeStep, setActiveStep] = useState("prerequisites");

  const activeStepIndex = setupSteps.findIndex(
    (step) => step.id === activeStep
  );

  const isFirstStep = activeStepIndex === 0;
  const isLastStep = activeStepIndex === setupSteps.length - 1;

  const handleBackToProject = () => {
    if (id) {
      navigate(`/monitoring/${id}`);
    } else {
      navigate("/monitoring");
    }
  };

  const goToPreviousStep = () => {
    if (!isFirstStep) {
      setActiveStep(setupSteps[activeStepIndex - 1].id);
    }
  };

  const goToNextStep = () => {
    if (!isLastStep) {
      setActiveStep(setupSteps[activeStepIndex + 1].id);
    }
  };

  const renderStep = () => {
    switch (activeStep) {
      case "prerequisites":
        return (
          <section>
            <div className="flex gap-4">
              <StepBadge number="01" />

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-slate-950">
                  Prerequisites
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Before connecting Prometheus to ResolveHub, make sure your
                  application exposes metrics and Docker is available.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {[
                    {
                      icon: Server,
                      title: "Application",
                      description:
                        "Your application should expose a Prometheus-compatible /metrics endpoint.",
                    },
                    {
                      icon: Terminal,
                      title: "Docker",
                      description:
                        "Docker and Docker Compose should be installed on the monitoring machine.",
                    },
                    {
                      icon: ShieldCheck,
                      title: "ResolveHub access",
                      description:
                        "You need access to the ResolveHub project where the integration will be created.",
                    },
                    {
                      icon: Webhook,
                      title: "Webhook access",
                      description:
                        "Alertmanager must be able to reach the ResolveHub webhook endpoint.",
                    },
                  ].map((item) => {
                    const Icon = item.icon;

                    return (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                          <Icon className="h-5 w-5 text-[#4B3932]" />
                        </div>

                        <h3 className="mt-4 text-sm font-bold text-slate-900">
                          {item.title}
                        </h3>

                        <p className="mt-1.5 text-sm leading-6 text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-6 flex gap-3 rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-4">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#4B3932]" />

                  <p className="text-sm leading-6 text-slate-600">
                    This guide uses Docker Compose to run Prometheus and
                    Alertmanager. You do not need to install them separately
                    when using the provided configuration.
                  </p>
                </div>
              </div>
            </div>
          </section>
        );

      case "files":
        return (
          <section>
            <div className="flex gap-4">
              <StepBadge number="02" />

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-slate-950">
                  Create Monitoring Files
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Create a dedicated monitoring directory with the following
                  configuration files.
                </p>

                <div className="mt-5">
                  <CodeBlock
                    language="structure"
                    code={`my-monitoring/
├── prometheus.yml
├── alert-rules.yml
├── alertmanager.yml
└── docker-compose.yml`}
                  />
                </div>

                <div className="mt-5 rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5">
                  <p className="text-sm font-semibold text-slate-900">
                    Create the directory
                  </p>

                  <div className="mt-3">
                    <CodeBlock
                      language="bash"
                      code={`mkdir monitoring
cd monitoring`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case "prometheus":
        return (
          <section>
            <div className="flex gap-4">
              <StepBadge number="03" />

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-slate-950">
                  Configure Prometheus
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Create a file named{" "}
                  <code className="rounded-md bg-[#F1E9E0] px-1.5 py-0.5 text-xs font-semibold text-[#4B3932]">
                    prometheus.yml
                  </code>{" "}
                  and add the following configuration.
                </p>

                <div className="mt-5">
                  <CodeBlock code={prometheusConfig} />
                </div>

                <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <div className="flex gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                    <div>
                      <p className="text-sm font-semibold text-amber-900">
                        Update your application target
                      </p>

                      <p className="mt-1.5 text-sm leading-6 text-amber-800">
                        Replace{" "}
                        <code className="rounded bg-amber-100 px-1.5 py-0.5 font-medium">
                          host.docker.internal:5005
                        </code>{" "}
                        with the host and port where your application exposes
                        its{" "}
                        <code className="rounded bg-amber-100 px-1.5 py-0.5 font-medium">
                          /metrics
                        </code>{" "}
                        endpoint.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <h3 className="text-sm font-bold text-slate-900">
                    What this configuration does
                  </h3>

                  <div className="mt-3 space-y-2">
                    {[
                      "Prometheus collects application metrics every 5 seconds.",
                      "Prometheus reads the alert rules from alert-rules.yml.",
                      "Prometheus sends triggered alerts to Alertmanager.",
                      "The application is monitored through its /metrics endpoint.",
                    ].map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-xl border border-[#E7DDD3] bg-[#FAF6F0] px-4 py-3"
                      >
                        <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#4B3932]" />

                        <span className="text-sm text-slate-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case "rules":
        return (
          <section>
            <div className="flex gap-4">
              <StepBadge number="04" />

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-slate-950">
                  Configure Alert Rules
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Create{" "}
                  <code className="rounded-md bg-[#F1E9E0] px-1.5 py-0.5 text-xs font-semibold text-[#4B3932]">
                    alert-rules.yml
                  </code>{" "}
                  to define when Prometheus should trigger an alert.
                </p>

                <div className="mt-5">
                  <CodeBlock code={alertRulesConfig} />
                </div>

                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  {[
                    {
                      title: "Condition",
                      value: "up == 0",
                      description: "The application target is unavailable.",
                    },
                    {
                      title: "Duration",
                      value: "10 seconds",
                      description:
                        "The condition must remain true for 10 seconds.",
                    },
                    {
                      title: "Severity",
                      value: "HIGH",
                      description:
                        "ResolveHub receives the alert with HIGH severity.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5"
                    >
                      <p className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                        {item.title}
                      </p>

                      <p className="mt-2 text-base font-bold text-slate-900">
                        {item.value}
                      </p>

                      <p className="mt-1 text-sm leading-5 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );

      case "resolvehub":
        return (
          <section>
            <div className="flex gap-4">
              <StepBadge number="05" />

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-slate-950">
                  Connect Alertmanager to ResolveHub
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  This is the connection point between your monitoring stack
                  and ResolveHub.
                </p>

                <div className="mt-6 rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      <Webhook className="h-5 w-5 text-[#4B3932]" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        1. Create the Prometheus integration
                      </p>

                      <p className="mt-1.5 text-sm leading-6 text-slate-500">
                        Open your ResolveHub monitoring project and create a
                        Prometheus integration. ResolveHub will provide a
                        webhook URL for the integration.
                      </p>
                    </div>
                  </div>

                  <div className="my-5 border-t border-[#E7DDD3]" />

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      <Clipboard className="h-5 w-5 text-[#4B3932]" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        2. Copy the ResolveHub webhook URL
                      </p>

                      <p className="mt-1.5 text-sm leading-6 text-slate-500">
                        Copy the webhook URL generated for your integration.
                        You will add this URL to Alertmanager.
                      </p>
                    </div>
                  </div>

                  <div className="my-5 border-t border-[#E7DDD3]" />

                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      <FileCode2 className="h-5 w-5 text-[#4B3932]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-bold text-slate-900">
                        3. Add it to Alertmanager
                      </p>

                      <p className="mt-1.5 text-sm leading-6 text-slate-500">
                        Create{" "}
                        <code className="rounded bg-white px-1.5 py-0.5 text-xs font-semibold text-slate-700">
                          alertmanager.yml
                        </code>{" "}
                        and replace the placeholder with your ResolveHub
                        webhook URL.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <CodeBlock code={alertmanagerConfig} />
                </div>

                <div className="mt-5 flex gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                  <p className="text-sm leading-6 text-blue-800">
                    Keep the webhook URL private. Do not commit sensitive
                    credentials or private integration URLs to a public
                    repository.
                  </p>
                </div>
              </div>
            </div>
          </section>
        );

      case "docker":
        return (
          <section>
            <div className="flex gap-4">
              <StepBadge number="06" />

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-slate-950">
                  Configure Docker Compose
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Create{" "}
                  <code className="rounded-md bg-[#F1E9E0] px-1.5 py-0.5 text-xs font-semibold text-[#4B3932]">
                    docker-compose.yml
                  </code>{" "}
                  to run Prometheus and Alertmanager together.
                </p>

                <div className="mt-5">
                  <CodeBlock code={dockerComposeConfig} />
                </div>

                <div className="mt-5 rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5">
                  <p className="text-sm font-bold text-slate-900">
                    Start the monitoring stack
                  </p>

                  <p className="mt-1.5 text-sm leading-6 text-slate-500">
                    Run the following command from the monitoring directory.
                  </p>

                  <div className="mt-4">
                    <CodeBlock language="bash" code={startCommand} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case "verify":
        return (
          <section>
            <div className="flex gap-4">
              <StepBadge number="07" />

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-slate-950">
                  Verify the Setup
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Once the containers are running, verify each part of the
                  monitoring stack.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  <div className="rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                        <Server className="h-5 w-5 text-[#4B3932]" />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Prometheus
                        </p>

                        <p className="text-xs text-stone-400">
                          http://localhost:9090
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-500">
                      Open Prometheus and go to{" "}
                      <strong className="text-slate-700">
                        Status → Targets
                      </strong>
                      . Your application target should show as{" "}
                      <strong className="text-slate-700">UP</strong>.
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                        <Webhook className="h-5 w-5 text-[#4B3932]" />
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          Alertmanager
                        </p>

                        <p className="text-xs text-stone-400">
                          http://localhost:9000
                        </p>
                      </div>
                    </div>

                    <p className="mt-4 text-sm leading-6 text-slate-500">
                      Open Alertmanager and verify that the service is running
                      and ready to receive alerts from Prometheus.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                    <div>
                      <p className="text-sm font-bold text-emerald-900">
                        Expected result
                      </p>

                      <p className="mt-1.5 text-sm leading-6 text-emerald-800">
                        Prometheus should be able to scrape your application
                        and Alertmanager should be connected as the alert
                        receiver.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case "test":
        return (
          <section>
            <div className="flex gap-4">
              <StepBadge number="08" />

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-slate-950">
                  Test an Incident
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  The easiest way to verify the complete integration is to
                  temporarily stop the monitored application.
                </p>

                <div className="mt-6 rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                      <Play className="h-5 w-5 text-[#4B3932]" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Stop the monitored application
                      </p>

                      <p className="text-sm text-slate-500">
                        Use your application's normal stop command.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <CodeBlock language="bash" code={testCommand} />
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    "Prometheus detects that the application target is DOWN.",
                    "The BackendDown alert remains active for 10 seconds.",
                    "Prometheus sends the alert to Alertmanager.",
                    "Alertmanager sends the webhook request to ResolveHub.",
                    "ResolveHub receives the alert and creates an incident.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-4 rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-4"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white text-xs font-bold text-[#4B3932]">
                        {index + 1}
                      </div>

                      <p className="text-sm text-slate-600">{item}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                    <div>
                      <p className="text-sm font-bold text-emerald-900">
                        Integration test successful
                      </p>

                      <p className="mt-1.5 text-sm leading-6 text-emerald-800">
                        If the incident appears in your ResolveHub monitoring
                        project, your Prometheus integration is working
                        correctly.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5">
                  <p className="text-sm font-bold text-slate-900">
                    Test alert resolution
                  </p>

                  <p className="mt-1.5 text-sm leading-6 text-slate-500">
                    Start your application again. Once Prometheus detects that
                    the target is healthy, Alertmanager sends the resolved
                    event to ResolveHub because{" "}
                    <code className="rounded bg-[#F1E9E0] px-1.5 py-0.5 text-xs font-semibold text-[#4B3932]">
                      send_resolved
                    </code>{" "}
                    is enabled.
                  </p>
                </div>
              </div>
            </div>
          </section>
        );

      case "troubleshooting":
        return (
          <section>
            <div className="flex gap-4">
              <StepBadge number="09" />

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-slate-950">
                  Troubleshooting
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  If the integration is not working, check the following
                  common issues.
                </p>

                <div className="mt-6 overflow-hidden rounded-2xl border border-[#E7DDD3]">
                  {[
                    {
                      problem: "Prometheus target shows DOWN",
                      solution:
                        "Check that your application is running and that the /metrics endpoint, host and port are correct.",
                    },
                    {
                      problem: "Alert is not firing",
                      solution:
                        "Check the alert expression, job name and the configured for duration in alert-rules.yml.",
                    },
                    {
                      problem: "Alertmanager is not receiving alerts",
                      solution:
                        "Check the alertmanager target in prometheus.yml and make sure both containers are on the same Docker Compose network.",
                    },
                    {
                      problem: "ResolveHub does not receive the alert",
                      solution:
                        "Check the ResolveHub webhook URL in alertmanager.yml and make sure Alertmanager can reach the ResolveHub endpoint.",
                    },
                    {
                      problem: "Incident is not created",
                      solution:
                        "Verify that the Prometheus integration is correctly connected to the intended ResolveHub monitoring project.",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.problem}
                      className={`bg-[#FAF6F0] p-5 ${
                        index !== 0 ? "border-t border-[#E7DDD3]" : ""
                      }`}
                    >
                      <p className="text-sm font-bold text-slate-900">
                        {item.problem}
                      </p>

                      <p className="mt-1.5 text-sm leading-6 text-slate-500">
                        {item.solution}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0]">
      <div className="mx-auto max-w-[1200px] px-6 py-8 lg:px-10">
        <div className="mb-8 flex items-center gap-3 text-sm text-slate-500">
          <button
            type="button"
            onClick={handleBackToProject}
            className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-white hover:text-slate-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </button>

          <ChevronRight className="h-4 w-4 text-stone-300" />

          <span>Integrations</span>

          <ChevronRight className="h-4 w-4 text-stone-300" />

          <span className="font-medium text-slate-900">
            Prometheus Setup Guide
          </span>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-[#E7DDD3] bg-[#FFFCF8] shadow-sm">
          <div className="relative overflow-hidden px-7 py-10 lg:px-12 lg:py-12">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#F1E9E0] blur-3xl" />

            <div className="relative">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E7DDD3] bg-[#FAF6F0] px-3.5 py-1.5 text-xs font-semibold text-[#4B3932]">
                <Server className="h-3.5 w-3.5" />
                Monitoring Integration
              </div>

              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl">
                    Prometheus Setup Guide
                  </h1>

                  <p className="mt-4 max-w-3xl text-base leading-7 text-slate-500 lg:text-lg">
                    Connect your Prometheus monitoring stack to ResolveHub and
                    automatically create incidents when your application
                    triggers an alert.
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3 rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] px-4 py-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                    <Clock3 className="h-5 w-5 text-[#4B3932]" />
                  </div>

                  <div>
                    <p className="text-xs font-medium text-stone-400">
                      Setup time
                    </p>

                    <p className="text-sm font-semibold text-slate-900">
                      10–15 minutes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-[#E7DDD3] px-6 py-6 lg:px-10 lg:py-8">
            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-stone-400">
                  Setup progress
                </p>

                <p className="text-sm font-semibold text-[#4B3932]">
                  Step {activeStepIndex + 1} of {setupSteps.length}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                {setupSteps.map((step, index) => (
                  <div
                    key={step.id}
                    className="flex flex-1 items-center gap-1.5"
                  >
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition-all ${
                        index < activeStepIndex
                          ? "bg-[#4B3932] text-white"
                          : index === activeStepIndex
                            ? "bg-[#4B3932] text-white ring-4 ring-[#F1E9E0]"
                            : "border border-[#E7DDD3] bg-white text-stone-400"
                      }`}
                    >
                      {index < activeStepIndex ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        step.number
                      )}
                    </div>

                    {index < setupSteps.length - 1 && (
                      <div
                        className={`h-1 flex-1 rounded-full transition-all ${
                          index < activeStepIndex
                            ? "bg-[#4B3932]"
                            : "bg-[#E7DDD3]"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <main className="min-h-[500px]">{renderStep()}</main>

            <div className="mt-10 flex items-center justify-between border-t border-[#E7DDD3] pt-6">
              <button
                type="button"
                onClick={goToPreviousStep}
                disabled={isFirstStep}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#E7DDD3] bg-white px-5 py-3 text-sm font-semibold text-[#4B3932] transition hover:bg-[#FAF6F0] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>

              {!isLastStep && (
                <button
                  type="button"
                  onClick={goToNextStep}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#4B3932] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-[#3B2E29] hover:shadow-lg"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              )}
            </div>

            {isLastStep && (
              <div className="mt-8 rounded-[28px] border border-[#4B3932] bg-[#4B3932] p-7 text-white lg:p-9">
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>

                      <p className="text-lg font-bold">
                        You're ready to monitor your project
                      </p>
                    </div>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
                      Once the test incident reaches ResolveHub successfully,
                      your Prometheus monitoring pipeline is ready for real
                      application alerts.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleBackToProject}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#4B3932] transition hover:bg-[#FAF6F0]"
                  >
                    Setup Complete
                    <Check className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}