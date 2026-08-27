import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { vintageAudio } from '../utils/audioSynth';

interface SecretWaxNoteProps {
  husbandName: string;
  firstLookDate: string;
}

export const SecretWaxNote: React.FC<SecretWaxNoteProps> = ({
  husbandName,
  firstLookDate,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    if (!isOpen) {
      vintageAudio.playWaxSealCrack();
      vintageAudio.playPaperRustle();
    }
    setIsOpen(!isOpen);
  };

  return (
    <section id="screen-secret-note" className="py-14 px-4 sm:px-10 flex flex-col items-center border-t border-[#d4c5a9]/50">
      {/* Antique Seal Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={handleToggle}
        className="group relative inline-flex items-center gap-3 px-7 py-3 rounded-full bg-[#8b1a1a] text-[#f4ead5] border border-[#7a1616] shadow-xl hover:bg-[#9c1e1e] transition-all duration-300 cursor-pointer"
        aria-expanded={isOpen}
        aria-label="افتحي الرسالة السرية"
      >
        {/* Wax Seal Emblem */}
        <span className="w-4 h-4 rounded-full bg-[#d4c5a9] flex items-center justify-center text-[9px] text-[#2c241c] font-bold">
          ✦
        </span>

        <span className="font-ruqaa text-2xl text-[#f4ead5] font-bold tracking-wide">
          {isOpen ? 'اقفلي السر...' : 'فيه سر صغير ليكي...'}
        </span>

        <span className="font-mono text-[10px] text-[#f4ead5]/80 uppercase tracking-wider">
          {isOpen ? 'CLOSE' : 'OPEN SECRET'}
        </span>
      </motion.button>

      {/* Secret Note Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, height: 'auto', scale: 1, y: 0 }}
            exit={{ opacity: 0, height: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl w-full overflow-hidden"
          >
            <div className="bg-[#f4ead5] rounded-xl border border-[#d4c5a9] p-8 sm:p-12 shadow-2xl relative text-center">
              {/* Top vintage stamp */}
              <div className="inline-block px-3 py-1 rounded-sm bg-[#2c241c] text-[#d4c5a9] font-mono text-[10px] tracking-[0.2em] uppercase mb-6 border border-[#4a3f35]">
                CONFIDENTIAL • TO AYA ALONE
              </div>

              {/* Secret Note Text */}
              <div className="space-y-3 font-ruqaa text-2xl sm:text-3xl text-[#2b1d12] font-bold leading-relaxed">
                <p>
                  «لو الزمن رجع بيا ليوم {firstLookDate}، وشوفتك تاني من غير ما أعرف أي حاجة عن المستقبل…»
                </p>
                <p className="text-[#8b1a1a] text-3xl sm:text-4xl my-2">
                  «هختارك إنتي برضه.»
                </p>
                <p className="text-2xl sm:text-3xl text-[#2b1d12]">
                  «وهفضل أختارك في كل مرة.»
                </p>
              </div>

              {/* Signature */}
              <div className="mt-8 pt-4 border-t border-[#4a3f35]/20 flex flex-col items-center">
                <span className="font-ruqaa text-4xl sm:text-5xl text-[#8b1a1a] font-bold">
                  — {husbandName}
                </span>
                <span className="font-amiri text-xs text-[#574336] mt-1">
                  كلام من القلب
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
