import React from 'react';
import { motion } from 'motion/react';

interface LetterHeaderProps {
  wifeName: string;
  husbandName: string;
  firstLookDate: string;
}

export const LetterHeader: React.FC<LetterHeaderProps> = ({
  wifeName,
  husbandName,
  firstLookDate,
}) => {
  return (
    <section 
      id="screen-first-line" 
      className="relative pt-8 pb-12 px-6 sm:px-12 text-center border-b border-[#d4c5a9]/50"
    >
      {/* Top Ornamental Stamp */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex justify-center mb-6"
      >
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#d4c5a9] bg-[#f4ead5]/90 shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#8b1a1a]" />
          <span className="font-cinzel text-xs text-[#574336] tracking-[0.2em] uppercase">
            A Vintage Love Manuscript
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#8b1a1a]" />
        </div>
      </motion.div>

      {/* Main Salutation */}
      <motion.h1
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.1 }}
        className="font-ruqaa text-4xl sm:text-5xl md:text-6xl text-[#2b1d12] font-bold tracking-wide drop-shadow-xs"
      >
        لحبيبتي {wifeName}...
      </motion.h1>

      {/* Poetic Opening Line */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.25 }}
        className="font-amiri text-xl sm:text-2xl md:text-3xl text-[#2b1d12] max-w-2xl mx-auto leading-relaxed sm:leading-loose font-bold mt-5 px-2"
      >
        «للبنت اللي بدأت حكايتي معاها بنظرة… وبقت هي حكايتي ودنيتي كلها.»
      </motion.p>

      {/* Antique Date-Stamp Seal Aesthetic */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-8 flex flex-col items-center justify-center"
      >
        <div className="relative inline-flex flex-col items-center px-6 py-3 rounded-lg border border-[#d4c5a9] bg-[#f4ead5] shadow-xs rotate-[-1deg]">
          {/* Top Stamp Label */}
          <span className="font-cinzel text-[10px] text-[#574336] tracking-[0.2em] font-semibold">
            DATE OF DESTINY
          </span>

          {/* Exact Date */}
          <span className="font-ruqaa text-2xl sm:text-3xl text-[#8b1a1a] font-bold my-0.5">
            {firstLookDate}
          </span>

          {/* Subtext */}
          <span className="font-amiri text-xs sm:text-sm text-[#574336]">
            اليوم اللي شوفتك فيه لأول مرة.. ومكنتش أعرف إن حياتي كلها هتبدأ من اللحظة دي.
          </span>

          {/* Small vintage ink corner accent */}
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#8b1a1a]" />
          <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#8b1a1a]" />
        </div>
      </motion.div>
    </section>
  );
};
