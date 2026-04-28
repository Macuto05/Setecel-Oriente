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
      <span className="flex flex-col items-center justify-center text-[10px] sm:text-[11px] font-bold tracking-widest text-white uppercase leading-[1.1] mt-[1px]">
        <span className="text-[7.5px] sm:text-[8.5px] text-white/70 tracking-[0.2em] mb-[1px]">Ver</span>
        <span>{isActive ? "Trayectoria" : "Confianza"}</span>
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
