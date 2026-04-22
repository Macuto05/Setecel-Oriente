"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CompactToggleProps {
  isActive: boolean;
  onToggle: (value: boolean) => void;
  ariaLabel?: string;
}

export default function CompactToggle({
  isActive,
  onToggle,
  ariaLabel = "Toggle view",
}: CompactToggleProps) {
  return (
    <button
      onClick={() => onToggle(!isActive)}
      role="switch"
      aria-checked={isActive}
      aria-label={ariaLabel}
      suppressHydrationWarning
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 group"
    >
      <motion.div
        animate={{ x: isActive ? 4 : -4 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="flex items-center gap-1"
      >
        {isActive ? (
          <ChevronRight size={16} className="text-white" />
        ) : (
          <ChevronLeft size={16} className="text-white" />
        )}
      </motion.div>
      <span className="text-xs font-semibold text-white/80 group-hover:text-white transition-colors">
        {isActive ? "Por qué" : "Quiénes"}
      </span>
    </button>
  );
}
