import { motion } from "framer-motion";

interface PageLoaderProps {
  message?: string;
}

export default function PageLoader({
  message = "Loading...",
}: PageLoaderProps) {
  return (
    <div className="flex w-full items-center justify-center py-20">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            mx-auto
            h-10
            w-10
            rounded-full
            border-[3px]
            border-[#E7DDD3]
            border-t-[#4B3932]
          "
        />

        <p className="mt-5 text-sm font-medium text-stone-500">
          {message}
        </p>
      </div>
    </div>
  );
}