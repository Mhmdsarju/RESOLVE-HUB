import { RefreshCw, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface OrganizationLoadErrorProps {
  onRetry?: () => void;
}

export default function OrganizationLoadError({ onRetry }: OrganizationLoadErrorProps) {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#EDEAE3] px-4">
      <div
        className="
          w-full
          max-w-md
          rounded-3xl
          border
          border-[#E7DDD3]
          bg-white
          p-8
          text-center
          shadow-xl
        "
      >
        <div
          className="
            mx-auto
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-2xl
            bg-[#F0E7D5]
            text-[#4B3932]
          "
        >
          <RefreshCw size={28} />
        </div>

        <h2 className="mt-5 text-xl font-bold text-[#4B3932]">Unable to load organization</h2>

        <p className="mt-2 text-sm leading-6 text-stone-500">
          We couldn't load your organization details. Please try again in a moment.
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-[#4B3932]
                px-6
                py-3
                text-sm
                font-semibold
                text-white
                transition
                hover:-translate-y-0.5
                hover:bg-[#3B2E29]
                hover:shadow-lg
              "
            >
              <RefreshCw size={17} />
              Try Again
            </button>
          )}

          <button
            type="button"
            onClick={() => navigate("/", { replace: true })}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-xl
              border
              border-[#E7DDD3]
              bg-white
              px-6
              py-3
              text-sm
              font-semibold
              text-[#4B3932]
              transition
              hover:-translate-y-0.5
              hover:bg-[#FAF6F0]
              hover:shadow-sm
            "
          >
            <Home size={17} />
            Back to Home
          </button>
        </div>
      </div>
    </main>
  );
}
