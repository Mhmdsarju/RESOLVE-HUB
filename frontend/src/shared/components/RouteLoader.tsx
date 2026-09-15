import { motion } from "framer-motion";

export default function RouteLoader() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#FAF6F0]">
      <div className="text-center">
        <div className="relative mx-auto h-14 w-14">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              ease: "linear",
            }}
            className="
              absolute
              inset-0
              rounded-full
              border-4
              border-[#E7DDD3]
              border-t-[#4B3932]
            "
          />

          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#F7F2E9] to-[#EFE5D7]" />
        </div>

        <h2 className="mt-6 text-lg font-semibold text-[#4B3932]">
          ResolveHub
        </h2>

        <p className="mt-1 text-sm text-stone-500">
          Loading ...
        </p>
      </div>
    </div>
  );
}