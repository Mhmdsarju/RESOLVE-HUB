import { Quote } from "lucide-react";

import { testimonials } from "../constants/testimonials";

export default function TestimonialSection() {
  return (
    <section className="bg-stone-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full bg-[#4B3932]/10 px-4 py-2 text-sm font-semibold text-[#4B3932]">
            Testimonials
          </span>

          <h2 className="mt-6 text-4xl font-bold text-[#4B3932]">
            Trusted By Engineering Teams
          </h2>

          <p className="mt-5 text-lg text-stone-600">
            Teams use ResolveHub to coordinate faster, reduce MTTR,
            and improve incident response.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-stone-200 bg-white p-10 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            >
              <Quote className="mb-6 text-[#4B3932]" size={36} />

              <p className="leading-8 text-stone-600">
                "{item.review}"
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#4B3932] font-bold text-white">
                  {item.initials}
                </div>

                <div>
                  <h4 className="font-semibold text-[#4B3932]">
                    {item.name}
                  </h4>

                  <p className="text-sm text-stone-500">
                    {item.designation}
                  </p>

                  <p className="text-sm text-stone-400">
                    {item.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}