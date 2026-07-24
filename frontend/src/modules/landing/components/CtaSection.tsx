import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="bg-[#4B3932] py-24">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">
        <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-stone-200">
          Ready to Get Started?
        </span>

        <h2 className="mt-6 text-5xl font-bold leading-tight text-white">
          Upgrade Your Incident
          <br />
          Response Today.
        </h2>

        <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-stone-300">
          Bring your engineering teams together, reduce downtime and
          resolve production incidents faster with ResolveHub.
        </p>

        <div className="mt-10 flex flex-col justify-center gap-5 sm:flex-row">
          <Link
            to="/organization/register"
            className="flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-4 font-semibold text-[#4B3932] transition hover:bg-stone-200"
          >
            Start Free Trial

            <ArrowRight size={20} />
          </Link>

          <Link
            to="/organization/login"
            className="rounded-xl border border-white px-8 py-4 font-semibold text-white transition hover:bg-white hover:text-[#4B3932]"
          >
            Sign In
          </Link>
        </div>
      </div>
    </section>
  );
}