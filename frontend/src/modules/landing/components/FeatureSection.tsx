import { features } from "../constants/features";

export default function FeatureSection() {
  return (
    <section
      id="features"
      className="border-y border-stone-200 bg-stone-50 py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full bg-[#4B3932]/10 px-4 py-2 text-sm font-semibold text-[#4B3932]">
            Features
          </span>

          <h2 className="mt-6 text-4xl font-bold text-[#4B3932]">
            Engineered For Modern Incident Response
          </h2>

          <p className="mt-5 text-lg leading-8 text-stone-600">
            Everything your engineering team needs to detect,
            coordinate, investigate and resolve production incidents
            faster.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className="group rounded-3xl border border-stone-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#4B3932] hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4B3932]/10 text-[#4B3932] transition group-hover:bg-[#4B3932] group-hover:text-white">
                  <Icon size={30} />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-[#4B3932]">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-stone-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}