import { motion } from "framer-motion";
import { ArrowLeft, ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF6F0] px-6">
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-xl"
      >
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#4B3932]/10">
          <ShieldAlert
            size={40}
            className="text-[#4B3932]"
          />
        </div>

        <h1 className="mt-6 text-5xl font-bold text-[#4B3932]">
          403
        </h1>

        <h2 className="mt-3 text-2xl font-bold text-[#4B3932]">
          Access Forbidden
        </h2>

        <p className="mt-4 leading-7 text-stone-500">
          You don't have permission to access
          this page. Please contact your
          administrator if you believe this is
          a mistake.
        </p>

        <button
          onClick={() => navigate(-1)}
          className="
            mt-10
            w-full
            rounded-xl
            bg-[#4B3932]
            py-3
            font-semibold
            text-white
            transition-all
            duration-300
            hover:-translate-y-1
            hover:bg-[#3B2E29]
            hover:shadow-lg
          "
        >
          <span className="flex items-center justify-center gap-2">
            <ArrowLeft size={18} />
            Go Back
          </span>
        </button>
      </motion.div>
    </main>
  );
}