import { motion } from "framer-motion";

interface FullScreenLoaderProps {
  title?: string;
  description?: string;
}

export default function FullScreenLoader({
  title = "Loading...",
  description = "Please wait while we prepare your workspace.",
}: FullScreenLoaderProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF6F0] px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-xl">

        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            mx-auto
            h-14
            w-14
            rounded-full
            border-4
            border-[#E7DDD3]
            border-t-[#4B3932]
          "
        />

        <h2 className="mt-8 text-2xl font-bold text-[#4B3932]">
          {title}
        </h2>

        <p className="mt-3 leading-7 text-stone-500">
          {description}
        </p>

      </div>
    </main>
  );
}