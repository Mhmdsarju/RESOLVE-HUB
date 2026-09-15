import { Check } from "lucide-react";
import { Link } from "react-router-dom";

import { pricingPlans } from "../constants/pricing";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="bg-[#F0E7D5] py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#4B3932]">
            Pricing
          </span>

          <h2 className="mt-6 text-4xl font-bold text-[#4B3932]">
            Simple Pricing
          </h2>

          <p className="mt-5 text-lg text-stone-600">
            Start for free and upgrade as your organization grows.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-10 shadow-xl ${
                plan.popular
                  ? "border-2 border-[#4B3932] bg-white"
                  : "border border-stone-200 bg-white"
              }`}
            >
              {plan.popular && (
                <span className="absolute right-8 top-8 rounded-full bg-[#4B3932] px-4 py-2 text-xs font-bold text-white">
                  MOST POPULAR
                </span>
              )}

              <h3 className="text-3xl font-bold text-[#4B3932]">
                {plan.name}
              </h3>

              <div className="mt-6 flex items-end gap-2">
                <span className="text-5xl font-extrabold text-[#4B3932]">
                  {plan.price}
                </span>

                <span className="pb-2 text-stone-500">
                  / {plan.duration}
                </span>
              </div>

              <div className="mt-10 space-y-4">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center gap-3"
                  >
                    <Check
                      className="text-green-600"
                      size={18}
                    />

                    <span className="text-stone-600">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/organization/register"
                className={`mt-10 flex w-full justify-center rounded-xl px-6 py-4 font-semibold transition ${
                  plan.popular
                    ? "bg-[#4B3932] text-white hover:bg-[#392b26]"
                    : "border border-stone-300 hover:bg-stone-100"
                }`}
              >
                {plan.buttonText}
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}