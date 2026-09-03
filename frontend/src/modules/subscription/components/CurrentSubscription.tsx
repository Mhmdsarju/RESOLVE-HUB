import { useEffect, useState } from "react";
import { CalendarDays, CreditCard, Crown, FolderKanban } from "lucide-react";

import type { Plan } from "@/modules/plan/types/plan.types";
import type { Subscription } from "../types/subscription.types";

interface CurrentSubscriptionProps {
  subscription: Subscription;
  plan?: Plan;
}

export default function CurrentSubscription({ subscription, plan }: CurrentSubscriptionProps) {
  const [currentTime, setCurrentTime] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
        setCurrentTime(Date.now());
    }, 3 * 60 * 60 * 1000);

    return () => clearInterval(interval);
}, []);

  const remainingDays = subscription.endDate
    ? Math.max(
        0,
        Math.ceil((new Date(subscription.endDate).getTime() - currentTime) / (1000 * 60 * 60 * 24)),
      )
    : null;

  const isPremium = plan?.name === "PREMIUM";

  return (
    <div className="rounded-3xl border border-stone-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F0E7D5] text-[#4B3932]">
            {isPremium ? <Crown size={25} /> : <CreditCard size={25} />}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-[#4B3932]">
                {isPremium ? "Premium Member" : "Free Trial"}
              </h2>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                {subscription.status}
              </span>
            </div>

            <p className="mt-1 text-sm text-stone-500">
              {isPremium
                ? "Your organization is currently on the Premium plan."
                : "You are currently using the Free Trial plan."}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <div className="flex items-center gap-2 text-stone-500">
              <CalendarDays size={16} />
              <span className="text-xs font-medium">Remaining</span>
            </div>

            <p className="mt-1 text-lg font-bold text-[#4B3932]">
              {remainingDays !== null ? `${remainingDays} days` : "Unlimited"}
            </p>
          </div>

          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <div className="flex items-center gap-2 text-stone-500">
              <FolderKanban size={16} />
              <span className="text-xs font-medium">Projects</span>
            </div>

            <p className="mt-1 text-lg font-bold text-[#4B3932]">
              {plan?.maxProjects ?? "Unlimited"}
            </p>
          </div>

          <div className="rounded-2xl bg-stone-50 px-4 py-3">
            <span className="text-xs font-medium text-stone-500">Plan</span>

            <p className="mt-1 text-lg font-bold text-[#4B3932]">{plan?.name ?? "Unknown"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
