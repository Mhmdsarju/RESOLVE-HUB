import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useAuthStore } from "@/modules/auth/store/authStore";

export default function SubscriptionExpiredPage() {

  const navigate = useNavigate();

  const role = useAuthStore((state) => state.user?.role);

  const isOrgAdmin = role === "ORG_ADMIN";

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center  px-6 py-10">
      <div className="w-full max-w-lg rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-xl shadow-stone-200/50 sm:p-10">

        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 ring-8 ring-red-50/60">
          <AlertTriangle className="text-red-500" size={38} strokeWidth={2.2} />
        </div>

        <div className="mt-7">
          <span className="inline-flex rounded-full bg-red-50 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-red-600">
            Subscription Expired
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-[#4B3932]">
            Your subscription has expired
          </h1>

          {isOrgAdmin ? (
            <>
              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-stone-500">
                Your organization's subscription has expired.
                Please choose a plan to renew your access and continue using ResolveHub.
              </p>

              <button
                type="button"
                onClick={() => navigate("/subscription")}
                className="mt-8 rounded-xl bg-[#4B3932] px-8 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#4B3932]/20 transition-all hover:-translate-y-0.5 hover:bg-[#3B2E29] hover:shadow-lg"
              >
                Renew Subscription
              </button>
            </>
          ) : (
            <>
              <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-stone-500">
                Your organization's subscription has expired.
                Please contact your organization admin to renew the subscription
                and regain access to ResolveHub.
              </p>

              <div className="mx-auto mt-8 max-w-md rounded-2xl border border-amber-100 bg-amber-50 px-5 py-4">
                <p className="text-sm font-medium leading-6 text-amber-800">
                  Access will be restored once your organization admin renews the subscription.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="mt-8 border-t border-stone-100 pt-5">
          <p className="text-xs text-stone-400">
            ResolveHub · Subscription Management
          </p>
        </div>

      </div>
    </div>
  );
}