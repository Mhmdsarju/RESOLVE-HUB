import { motion } from "framer-motion";

interface ButtonLoaderProps {
  text?: string;
}

export default function ButtonLoader({
  text = "Loading...",
}: ButtonLoaderProps) {
  return (
    <span className="flex items-center justify-center gap-3">
      <motion.span
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          h-5
          w-5
          rounded-full
          border-2
          border-white/40
          border-t-white
        "
      />

      <span>{text}</span>
    </span>
  );
}