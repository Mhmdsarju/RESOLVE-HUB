import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";

import DashboardPreview from "./DashboardPreview";

export default function HeroSection() {
  return (
    <section className="overflow-hidden bg-[#F0E7D5]">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 pb-20 pt-20 lg:px-8">

        {/* Badge */}

        <div className="mb-6 rounded-full border border-[#4B3932]/20 bg-white px-5 py-2">
          <span className="text-sm font-semibold text-[#4B3932]">
            Respond Faster. Resolve Smarter.
          </span>
        </div>

        {/* Heading */}

        <h1 className="max-w-5xl text-center text-5xl font-extrabold leading-tight tracking-tight text-[#4B3932] md:text-6xl lg:text-7xl">
          Incidents Happen.
          <br />
          <span className="text-stone-900">
            Resolve Them In Real-Time.
          </span>
        </h1>

        {/* Description */}

        <p className="mt-8 max-w-3xl text-center text-lg leading-8 text-stone-600">
          ResolveHub is a premium enterprise incident management platform
          built for engineering teams. Coordinate war rooms, assign tasks,
          generate automated timelines, and restore production faster.
        </p>

        {/* Buttons */}

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          <Link
            to="/organization/register"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#4B3932] px-8 py-4 font-semibold text-white transition hover:bg-[#3B2D28]"
          >
            Start Free Trial

            <ArrowRight className="h-5 w-5" />
          </Link>

          <Link
            to="/user/login"
            className="flex items-center justify-center gap-2 rounded-xl border border-stone-300 bg-white px-8 py-4 font-semibold text-[#4B3932] transition hover:bg-stone-100"
          >
            <Play className="h-5 w-5 fill-current" />

            Access Dashboard
          </Link>

        </div>


        {/* Dashboard */}

        <div className="mt-20 w-full">
          <DashboardPreview />
        </div>

      </div>
    </section>
  );
}