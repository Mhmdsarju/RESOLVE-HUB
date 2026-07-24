import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF6F0] px-6">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-lg rounded-3xl bg-white p-10 text-center shadow-xl"
      >
        {/* 404 */}

        <h1 className="text-7xl font-extrabold tracking-tight text-[#4B3932]">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-[#4B3932]">
          Page Not Found
        </h2>

        <p className="mt-4 text-base leading-7 text-stone-500">
          Sorry, the page you're looking for doesn't exist,
          has been moved, or the URL may be incorrect.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <button
            onClick={() => navigate("/")}
            className="
              flex-1
              rounded-xl
              bg-[#4B3932]
              px-6
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
              <Home size={18} />
              Go Home
            </span>
          </button>

          <button
            onClick={() => navigate(-1)}
            className="
              flex-1
              rounded-xl
              border
              border-[#4B3932]
              px-6
              py-3
              font-semibold
              text-[#4B3932]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#F5EFE7]
            "
          >
            <span className="flex items-center justify-center gap-2">
              <ArrowLeft size={18} />
              Go Back
            </span>
          </button>
        </div>
      </motion.div>
    </main>
  );
}