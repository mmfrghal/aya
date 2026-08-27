import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { vintageAudio } from '../utils/audioSynth';

interface FinalMomentProps {
  wifeName: string;
  husbandName: string;
  firstLookDate: string;
  weddingDate: string;
  currentDate: string;
}

export const FinalMoment: React.FC<FinalMomentProps> = ({
  wifeName,
  husbandName,
  firstLookDate,
  weddingDate,
  currentDate,
}) => {
  const [finalSecretRevealed, setFinalSecretRevealed] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const triggerHaptic = (pattern: number[] = [20, 45, 20]) => {
    if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Safe fallback for devices without vibration support
      }
    }
  };

  const handleOpenFinalSeal = () => {
    triggerHaptic([30, 50, 30]);
    vintageAudio.playWaxSealCrack();
    setFinalSecretRevealed(true);
  };

  const handleSealTap = () => {
    triggerHaptic([15, 30, 15]);
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 600);
    if (!finalSecretRevealed) {
      handleOpenFinalSeal();
    }
  };

  return (
    <footer id="screen-final-moment" className="relative pt-20 pb-28 px-6 sm:px-12 bg-[#1a1612] text-[#f4ead5] border-t border-[#4a3f35] overflow-hidden">
      {/* Background radial candle warmth */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(circle at 50% 30%, rgba(212, 197, 169, 0.15) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-2xl mx-auto flex flex-col items-center text-center z-10">
        {/* Three Pillar Dates Recap */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 pb-12 border-b border-[#4a3f35]/60 mb-12">
          {/* Pillar 1: First Look */}
          <div className="flex flex-col items-center p-3 rounded-lg bg-[#2c241c] border border-[#4a3f35]/50">
            <span className="font-mono text-base text-[#f4ead5] font-bold">
              {firstLookDate}
            </span>
            <span className="font-amiri text-xs text-[#d4c5a9] mt-1">
              أول مرة شوفتك فيها.
            </span>
          </div>

          {/* Pillar 2: Wedding */}
          <div className="flex flex-col items-center p-3 rounded-lg bg-[#2c241c] border border-[#4a3f35]/50">
            <span className="font-mono text-base text-[#f4ead5] font-bold">
              {weddingDate}
            </span>
            <span className="font-amiri text-xs text-[#d4c5a9] mt-1">
              اليوم اللي بدأ فيه بيتنا وعمرنا سوا.
            </span>
          </div>

          {/* Pillar 3: Present Day */}
          <div className="flex flex-col items-center p-3 rounded-lg bg-[#2c241c] border border-[#4a3f35]/50">
            <span className="font-mono text-base text-[#f4ead5] font-bold">
              {currentDate}
            </span>
            <span className="font-amiri text-xs text-[#d4c5a9] mt-1">
              ولسه الحكاية مكملة بإذن الله.
            </span>
          </div>
        </div>

        {/* Final Sentence in Grand Classical Arabic Typography */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-amiri text-2xl sm:text-3xl md:text-4xl text-[#f4ead5] leading-relaxed sm:leading-[2.2] font-bold px-2"
        >
          «من أول يوم شوفتك فيه، وأنا مش بدور على نهاية للحكاية… أنا بدور على بقية عمري كله معاكي يا {wifeName}.»
        </motion.p>

        {/* Handwritten Signature */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex flex-col items-center"
        >
          <span className="font-ruqaa text-5xl sm:text-6xl text-[#d4c5a9] font-bold tracking-wider rotate-[-2deg] drop-shadow-md">
            {husbandName}
          </span>
          <span className="font-amiri text-sm sm:text-base text-[#d4c5a9]/80 mt-1">
            جوزك، وحبيبك، وصاحب أول نظرة.
          </span>
        </motion.div>

        {/* Small Antique Wax Seal: "إلى الأبد" (Clickable with Haptic Vibration) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onClick={handleSealTap}
          role="button"
          tabIndex={0}
          aria-label="ختم الحب إلى الأبد"
          className="mt-8 relative cursor-pointer group select-none"
        >
          <div className="w-20 h-20 rounded-full bg-[#8b1a1a] hover:bg-[#9e1f1f] border-2 border-[#7a1616] flex flex-col items-center justify-center p-2 shadow-[0_8px_25px_rgba(139,26,26,0.5)] transition-all duration-300">
            <span className="font-ruqaa text-xl text-[#f4ead5] font-bold drop-shadow-sm">
              إلى الأبد
            </span>
            <span className="font-mono text-[7px] text-[#f4ead5]/80 tracking-widest mt-0.5">
              FOREVER
            </span>
          </div>
          {/* Subtle touch indicator */}
          <span className="font-amiri text-[11px] text-[#d4c5a9]/70 mt-1.5 block group-hover:text-[#f4ead5] transition-colors">
            المسي الختم
          </span>
        </motion.div>

        {/* FINAL SECRET SECTION (Subtle and intimate) */}
        <div className="mt-14 pt-8 border-t border-[#4a3f35]/50 w-full max-w-sm flex flex-col items-center">
          {!finalSecretRevealed ? (
            <button
              onClick={handleOpenFinalSeal}
              className="group text-[#d4c5a9] hover:text-[#f4ead5] transition-colors duration-300 font-ruqaa text-xl cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-full hover:bg-[#2c241c] border border-transparent hover:border-[#4a3f35]"
              aria-label="آية… افتحي الختم"
            >
              <span className="w-2 h-2 rounded-full bg-[#8b1a1a] group-hover:scale-125 transition-transform" />
              <span>{wifeName}… افتحي الختم.</span>
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="p-5 rounded-xl bg-[#2c241c] border border-[#4a3f35] text-center w-full shadow-2xl"
            >
              <p className="font-ruqaa text-2xl sm:text-3xl text-[#f4ead5] font-bold leading-normal">
                «لسه عندي عمر كامل عايز أعيشه معاكي.»
              </p>
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="font-ruqaa text-2xl text-[#d4c5a9] font-bold">
                  {husbandName}
                </span>
                <Heart className="w-4 h-4 text-[#8b1a1a] fill-[#8b1a1a]" />
              </div>
            </motion.div>
          )}
        </div>

        {/* Ultimate Core Motto */}
        <div className="mt-12 text-[11px] font-mono tracking-[0.2em] text-[#d4c5a9]/60 uppercase">
          FROM FIRST GLANCE TO A LIFETIME • 2020 – 2026
        </div>
      </div>
    </footer>
  );
};
