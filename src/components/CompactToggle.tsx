"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

interface CompactToggleProps {
  isActive: boolean;
  onToggle: (value: boolean) => void;
  ariaLabel?: string;
}

export default function CompactToggle({
  isActive,
  onToggle,
  ariaLabel = "Alternar vista",
}: CompactToggleProps) {
  return (
    <button
      onClick={() => onToggle(!isActive)}
      role="switch"
      aria-checked={isActive}
      aria-label={ariaLabel}
      suppressHydrationWarning
      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm shadow-sm transition-all duration-300 group"
    >
      {isActive && (
        <motion.div
          animate={{ x: [0, -3, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronLeft size={14} className="text-white" />
        </motion.div>
      )}
      <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-white uppercase mt-[1px]">
        {isActive ? "Ver Trayectoria" : "Ver Confianza"}
      </span>
      {!isActive && (
        <motion.div
          animate={{ x: [0, 3, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          <ChevronRight size={14} className="text-white" />
        </motion.div>
      )}
    </button>
  );
}
