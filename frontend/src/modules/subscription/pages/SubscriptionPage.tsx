import { CreditCard } from "lucide-react";
import { toast } from "react-hot-toast";

import CurrentSubscription from "../components/CurrentSubscription";
import SubscriptionPlans from "../components/SubscriptionPlans";

import { usePlans } from "@/modules/plan/hooks/usePlans";
import { useSubscription } from "../hooks/useSubscription";
import { useCreatePayment } from "@/modules/payment/hooks/useCreatePayment";
import { useProcessPayment } from "@/modules/payment/hooks/useProcessPayment";
import { loadRazorpayScript } from "@/core/payment/razorpay";
import type { Plan } from "@/modules/plan/types/plan.types";

export default function SubscriptionPage() {
  const { data: subscription, isLoading: isSubscriptionLoading } = useSubscription();
  const { data: plans, isLoading: isPlansLoading } = usePlans();

  const { mutateAsync: createPayment } = useCreatePayment();
  const { mutateAsync: processPayment } = useProcessPayment();

  if (isSubscriptionLoading || isPlansLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-sm font-medium text-stone-500">Loading subscription...</div>
      </div>
    );
  }

  if (!subscription) {
    return (
      <div className="rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
        <CreditCard className="mx-auto text-stone-400" size={32} />

        <h2 className="mt-4 text-lg font-semibold text-[#4B3932]">No Subscription Found</h2>

        <p className="mt-1 text-sm text-stone-500">
          Your subscription details are currently unavailable.
        </p>
      </div>
    );
  }

  const currentPlan = plans?.find((plan) => plan.id === subscription.planId);

  const handleUpgrade = async (plan: Plan) => {
    if (!plan.id) {
      toast.error("Invalid plan");
      return;
    }

    const isLoaded = await loadRazorpayScript();

    if (!isLoaded) {
      toast.error("Failed to load Razorpay");
      return;
    }

    try {
      const payment = await createPayment({
        subscriptionId: subscription.id!,
        planId: plan.id,
        amount: plan.price,
        currency: "INR",
      });

      const razorpay = new window.Razorpay({
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: Math.round(payment.amount * 100),
        currency: payment.currency,
        name: "ResolveHub",
        description: `${plan.name} Subscription`,
        order_id: payment.razorpayOrderId,
        handler: async (response) => {
          await processPayment({
            id: payment.id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
          });
        },
        theme: {
          color: "#4B3932",
        },
      });

      razorpay.open();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#4B3932]">Subscription</h1>

        <p className="mt-1 text-sm text-stone-500">
          Manage your subscription and choose the plan that works for your organization.
        </p>
      </div>

      <CurrentSubscription subscription={subscription} plan={currentPlan} />

      <SubscriptionPlans
        plans={plans ?? []}
        currentPlanId={subscription.status === "ACTIVE" ? subscription.planId : ""}
        isExpired={subscription.status === "EXPIRED"}
        onUpgrade={handleUpgrade}
      />
    </div>
  );
}
