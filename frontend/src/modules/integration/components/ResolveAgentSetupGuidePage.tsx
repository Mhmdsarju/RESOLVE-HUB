import {
  AlertCircle,
  ArrowLeft,
  Check,
  CheckCircle2,
  ChevronRight,

  Clock3,
  Copy,
  FileCode2,
  Info,
  Play,
  Server,
  ShieldCheck,
  Terminal,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

const setupSteps = [
  {
    id: "prerequisites",
    number: "01",
    title: "Prerequisites",
    description: "Make sure Docker is installed and your server is ready.",
  },
  {
    id: "connect",
    number: "02",
    title: "Connect Resolve Agent",
    description: "Run the Resolve Agent using the generated connection command.",
  },
  {
    id: "how-it-works",
    number: "03",
    title: "How the Agent Works",
    description: "Understand how the Agent collects logs and detects incidents.",
  },
  {
    id: "incident-detection",
    number: "04",
    title: "Test Incident Detection",
    description: "Trigger a test log and verify that ResolveHub creates an incident.",
  },
  {
    id: "recovery",
    number: "05",
    title: "Incident Recovery",
    description: "Understand duplicate prevention and automatic incident recovery.",
  },
  {
    id: "troubleshooting",
    number: "06",
    title: "Troubleshooting",
    description: "Common Agent connection and monitoring issues.",
  },
];

function CodeBlock({
  code,
  language = "bash",
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

export default function ResolveAgentSetupGuidePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();

  const integrationId = searchParams.get("integrationId");

  const [activeStep, setActiveStep] = useState("prerequisites");

  const activeStepIndex = setupSteps.findIndex(
    (step) => step.id === activeStep
  );

  const isFirstStep = activeStepIndex === 0;
  const isLastStep = activeStepIndex === setupSteps.length - 1;

//   const resolveHubUrl = ;

  const agentCommand = `docker run --rm \\
  --name resolvehub-agent \\
  -v /var/run/docker.sock:/var/run/docker.sock:ro \\
  -e RESOLVEHUB_URL="http://host.docker.internal:5555" \\
  -e INTEGRATION_ID="${integrationId ?? "YOUR_INTEGRATION_ID"}" \\
  mhmdsarju/resolvehub-agent:latest`;

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
                  Resolve Agent is designed to monitor Docker-based
                  applications without requiring changes to your application
                  code.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {[
                    {
                      icon: Server,
                      title: "Docker",
                      description:
                        "Docker should be installed and running on the machine you want to monitor.",
                    },
                    {
                      icon: Terminal,
                      title: "Terminal Access",
                      description:
                        "You need terminal access to run the Resolve Agent Docker command.",
                    },
                    {
                      icon: ShieldCheck,
                      title: "ResolveHub Project",
                      description:
                        "This Resolve Agent integration must belong to the ResolveHub monitoring project you want to monitor.",
                    },
                    {
                      icon: CheckCircle2,
                      title: "No Application Changes",
                      description:
                        "Docker applications do not require SDKs, code changes, or additional application configuration.",
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
                    The Resolve Agent runs locally on your server. It collects
                    Docker logs locally and sends only meaningful monitoring
                    alerts to ResolveHub.
                  </p>
                </div>
              </div>
            </div>
          </section>
        );

      case "connect":
        return (
          <section>
            <div className="flex gap-4">
              <StepBadge number="02" />

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-slate-950">
                  Connect Resolve Agent
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Run the following Docker command on the machine where your
                  application containers are running.
                </p>

                <div className="mt-6 rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5">
                  <div className="flex items-start gap-3">
                    <Terminal className="mt-0.5 h-5 w-5 shrink-0 text-[#4B3932]" />

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Start the Resolve Agent
                      </p>

                      <p className="mt-1.5 text-sm leading-6 text-slate-500">
                        The integration ID below connects this Agent to the
                        current ResolveHub monitoring project.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5">
                    <CodeBlock code={agentCommand} />
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                  <div className="flex gap-3">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                    <div>
                      <p className="text-sm font-bold text-blue-900">
                        What you need to do
                      </p>

                      <div className="mt-3 space-y-2">
                        {[
                          "Copy the command above.",
                          "Open a terminal on your Docker server.",
                          "Paste and run the command.",
                          "Keep the Agent running while you want the server monitored.",
                        ].map((item, index) => (
                          <div
                            key={item}
                            className="flex items-center gap-3"
                          >
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white text-xs font-bold text-blue-700">
                              {index + 1}
                            </div>

                            <span className="text-sm text-blue-800">
                              {item}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                  <div className="flex gap-3">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />

                    <p className="text-sm leading-6 text-amber-800">
                      The Agent needs access to the Docker socket so it can
                      discover containers and collect their stdout and stderr
                      logs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case "how-it-works":
        return (
          <section>
            <div className="flex gap-4">
              <StepBadge number="03" />

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-slate-950">
                  How the Agent Works
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Once started, Resolve Agent automatically monitors the
                  Docker environment and processes application logs locally.
                </p>

                <div className="mt-6 space-y-3">
                  {[
                    {
                      title: "Discovers Docker Containers",
                      description:
                        "The Agent automatically discovers running Docker containers on the server.",
                    },
                    {
                      title: "Collects Application Logs",
                      description:
                        "It collects stdout and stderr logs from monitored containers.",
                    },
                    {
                      title: "Parses Logs",
                      description:
                        "Incoming Docker log streams are parsed into structured log entries.",
                    },
                    {
                      title: "Detects Errors and Patterns",
                      description:
                        "Predefined monitoring rules detect errors, service failures, connection problems, slow responses, and other meaningful patterns.",
                    },
                    {
                      title: "Prevents Duplicate Incidents",
                      description:
                        "Repeated occurrences of the same alert for the same service are grouped instead of creating duplicate incidents.",
                    },
                    {
                      title: "Sends Alerts to ResolveHub",
                      description:
                        "Only meaningful alerts are sent to the ResolveHub monitoring project.",
                    },
                  ].map((item, index) => (
                    <div
                      key={item.title}
                      className="flex items-start gap-4 rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-xs font-bold text-[#4B3932]">
                        {index + 1}
                      </div>

                      <div>
                        <p className="text-sm font-bold text-slate-900">
                          {item.title}
                        </p>

                        <p className="mt-1.5 text-sm leading-6 text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <CodeBlock
                    language="flow"
                    code={`Docker Application
        ↓
Resolve Agent
        ↓
Log Collection
        ↓
Log Parsing
        ↓
Pattern Detection
        ↓
Meaningful Alert
        ↓
ResolveHub
        ↓
Incident`}
                  />
                </div>
              </div>
            </div>
          </section>
        );

      case "incident-detection":
        return (
          <section>
            <div className="flex gap-4">
              <StepBadge number="04" />

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-slate-950">
                  Test Incident Detection
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  You can test the Agent by running a temporary Docker
                  container that produces a known alert pattern.
                </p>

                <div className="mt-6 rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                      <Play className="h-5 w-5 text-[#4B3932]" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Generate a test alert
                      </p>

                      <p className="text-sm text-slate-500">
                        Run this command while the Resolve Agent is running.
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <CodeBlock
                      language="bash"
                      code={`docker run --rm \\
  --name slow-api-test \\
  alpine sh -c 'echo "Response time exceeded 2000ms"; sleep 10'`}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <p className="text-sm font-bold text-slate-900">
                    What happens next
                  </p>

                  <div className="mt-3 space-y-3">
                    {[
                      "The Agent detects the Docker container.",
                      "The Agent reads the application log.",
                      "The Slow Response Time rule matches the log.",
                      "The Agent sends the alert to ResolveHub.",
                      "ResolveHub creates an incident in this monitoring project.",
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
                </div>

                <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />

                    <div>
                      <p className="text-sm font-bold text-emerald-900">
                        Expected result
                      </p>

                      <p className="mt-1.5 text-sm leading-6 text-emerald-800">
                        A Slow Response Time incident should appear in your
                        ResolveHub monitoring project.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case "recovery":
        return (
          <section>
            <div className="flex gap-4">
              <StepBadge number="05" />

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-slate-950">
                  Incident Recovery
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Resolve Agent prevents duplicate incidents and automatically
                  sends a recovery event when an alert stops occurring.
                </p>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {[
                    {
                      title: "1. Error Occurs",
                      description:
                        "A matching error pattern is detected and an incident is created.",
                    },
                    {
                      title: "2. Repeated Error",
                      description:
                        "The same alert continues to occur without creating duplicate incidents.",
                    },
                    {
                      title: "3. Error Stops",
                      description:
                        "After the recovery window, the Agent sends a resolved event to ResolveHub.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5"
                    >
                      <p className="text-sm font-bold text-slate-900">
                        {item.title}
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-2xl border border-[#E7DDD3] bg-[#FAF6F0] p-5">
                  <p className="text-sm font-bold text-slate-900">
                    Recovery flow
                  </p>

                  <div className="mt-4">
                    <CodeBlock
                      language="flow"
                      code={`Error detected
      ↓
Incident created
      ↓
Same error repeats
      ↓
No duplicate incident
      ↓
Error stops
      ↓
Recovery window expires
      ↓
Resolved event sent
      ↓
Incident resolved`}
                    />
                  </div>
                </div>

                <div className="mt-5 flex gap-3 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                  <Info className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />

                  <p className="text-sm leading-6 text-blue-800">
                    This keeps your incident list clean by grouping repeated
                    failures and automatically closing incidents after the
                    service recovers.
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
              <StepBadge number="06" />

              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-slate-950">
                  Troubleshooting
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  If the Agent is not detecting or sending alerts, check the
                  following common issues.
                </p>

                <div className="mt-6 overflow-hidden rounded-2xl border border-[#E7DDD3]">
                  {[
                    {
                      problem: "Resolve Agent does not start",
                      solution:
                        "Make sure Docker is running and the Docker command was copied correctly.",
                    },
                    {
                      problem: "No containers are detected",
                      solution:
                        "Make sure the Agent has access to /var/run/docker.sock and that the monitored applications are running as Docker containers.",
                    },
                    {
                      problem: "Logs are not detected",
                      solution:
                        "Check that the monitored container produces stdout or stderr logs.",
                    },
                    {
                      problem: "Alert is not created",
                      solution:
                        "Make sure the log matches one of the predefined Agent alert patterns and that the integration is active.",
                    },
                    {
                      problem: "ResolveHub does not receive the alert",
                      solution:
                        "Check the RESOLVEHUB_URL and INTEGRATION_ID values in the Agent command and make sure the ResolveHub API is reachable from the server.",
                    },
                    {
                      problem: "Duplicate incidents are appearing",
                      solution:
                        "Verify that the same service and alert rule are being monitored by only one Resolve Agent instance.",
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
            Resolve Agent Setup Guide
          </span>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-[#E7DDD3] bg-[#FFFCF8] shadow-sm">
          <div className="relative overflow-hidden px-7 py-10 lg:px-12 lg:py-12">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-[#F1E9E0] blur-3xl" />

            <div className="relative">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#E7DDD3] bg-[#FAF6F0] px-3.5 py-1.5 text-xs font-semibold text-[#4B3932]">
                <Terminal className="h-3.5 w-3.5" />
                Resolve Agent
              </div>

              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight text-slate-950 lg:text-4xl">
                    Resolve Agent Setup Guide
                  </h1>

                  <p className="mt-4 max-w-3xl text-base leading-7 text-slate-500 lg:text-lg">
                    Connect your Docker environment to ResolveHub and
                    automatically detect meaningful application failures,
                    service problems, and other monitoring events.
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
                      2–5 minutes
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
                        Resolve Agent is ready
                      </p>
                    </div>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
                      Once the Agent is running and the test incident reaches
                      ResolveHub successfully, your Docker environment is ready
                      for automatic monitoring.
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