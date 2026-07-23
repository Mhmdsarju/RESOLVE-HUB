import {
  ArrowRight,
  BellRing,
  ShieldCheck,
  Workflow,
} from "lucide-react";

const steps = [
  {
    id: 1,
    icon: BellRing,
    title: "Alert Detection",
    description:
      "Monitoring systems like Prometheus, Grafana and Datadog automatically trigger incidents.",
  },
  {
    id: 2,
    icon: Workflow,
    title: "War Room Activation",
    description:
      "ResolveHub instantly creates a war room, assigns engineers and starts collaboration.",
  },
  {
    id: 3,
    icon: ShieldCheck,
    title: "Resolution & Audit",
    description:
      "Track every action, build timelines automatically and generate postmortem reports.",
  },
];

export default function ArchitectureSection() {
  return (
    <section
      id="architecture"
      className="bg-[#F0E7D5] py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#4B3932]">
            Workflow
          </span>

          <h2 className="mt-6 text-4xl font-bold text-[#4B3932]">
            Automated Incident Response Pipeline
          </h2>

          <p className="mt-5 text-lg text-stone-600">
            ResolveHub automates the complete lifecycle from alert
            detection to incident resolution.
          </p>
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.id}
                className="relative rounded-3xl bg-white p-10 shadow-lg"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4B3932] text-white">
                  <Icon size={30} />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-[#4B3932]">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-stone-600">
                  {step.description}
                </p>

                <div className="mt-8 flex h-10 w-10 items-center justify-center rounded-full bg-[#4B3932] font-bold text-white">
                  {step.id}
                </div>

                {index !== steps.length - 1 && (
                  <div className="absolute -right-6 top-1/2 hidden -translate-y-1/2 lg:block">
                    <ArrowRight
                      className="text-[#4B3932]"
                      size={28}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-20 rounded-3xl bg-[#4B3932] p-10 text-center text-white">
          <h3 className="text-3xl font-bold">
            Built For Enterprise Reliability
          </h3>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-stone-300">
            Integrate with Prometheus, Grafana, AWS CloudWatch,
            Datadog, PagerDuty and more. ResolveHub becomes your
            central incident command center.
          </p>
        </div>
      </div>
    </section>
  );
}