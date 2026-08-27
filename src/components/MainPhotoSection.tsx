import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';

interface MainPhotoSectionProps {
  wifeName: string;
  totalDays: string;
  imageSrc?: string;
}

export const MainPhotoSection: React.FC<MainPhotoSectionProps> = ({
  wifeName,
  totalDays,
  imageSrc,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHeartToast, setShowHeartToast] = useState(false);

  const handlePhotoClick = () => {
    setIsFlipped(!isFlipped);
    setShowHeartToast(true);
    setTimeout(() => setShowHeartToast(false), 2000);
  };

  return (
    <section id="screen-first-photo" className="py-12 px-6 sm:px-12 flex flex-col items-center">
      {/* Photograph Frame with Washi Tape */}
      <div className="relative group max-w-sm w-full flex flex-col items-center">
        {/* Vintage washi tape holding photo */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-white/25 backdrop-blur-xs z-20 rotate-[-2deg] rounded-xs shadow-xs pointer-events-none" />

        {/* The Card */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePhotoClick}
          className="relative w-full bg-[#d4c5a9] p-3 rounded-md cursor-pointer border border-[#4a3f35]/30 shadow-[10px_10px_30px_rgba(0,0,0,0.3)] border-b-8 border-white/40 overflow-hidden transition-all duration-300"
          role="button"
          tabIndex={0}
          aria-label="المسي الصورة لرؤية الكلمات السرية"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handlePhotoClick();
            }
          }}
        >
          {/* Photo Graphic / Art container */}
          <div className="relative aspect-[4/3.2] w-full rounded-xs bg-[#2c241c] overflow-hidden flex flex-col items-center justify-center text-center">
            {imageSrc ? (
              <div className="relative w-full h-full">
                <img
                  src={imageSrc}
                  alt={`${wifeName} - أول نظرة`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xs transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // fallback to placeholder if blocked
                    (e.currentTarget as HTMLElement).style.display = 'none';
                  }}
                />
                {/* Subtle vintage photo grain & warm vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/15 pointer-events-none" />
                
                {/* Vintage Date Stamp on Corner of Photograph */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 backdrop-blur-xs text-[#f4ead5] font-mono text-[9px] tracking-wider z-10 border border-white/10">
                  13.06.2020 • أول نظرة
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-6 grayscale contrast-125 sepia-[0.3]">
                <div className="relative z-10 w-22 h-22 rounded-full border border-[#d4c5a9]/50 p-1 flex items-center justify-center bg-[#1a1612]/60 shadow-inner">
                  <div className="w-full h-full rounded-full border border-dashed border-[#d4c5a9]/60 flex flex-col items-center justify-center text-center">
                    <span className="font-ruqaa text-3xl text-[#f4ead5] font-bold">آية</span>
                    <span className="font-mono text-[7px] text-[#d4c5a9] tracking-widest mt-0.5">MOMENT OF DESTINY</span>
                  </div>
                </div>

                <div className="relative z-10 mt-3">
                  <span className="font-cinzel text-xs text-[#f4ead5] tracking-[0.2em] font-semibold block">
                    [ WIFE_PHOTO ]
                  </span>
                  <span className="font-mono text-[10px] text-[#d4c5a9] mt-0.5 block opacity-90">
                    13.06.2020 • أول نظرة
                  </span>
                </div>
              </div>
            )}

            {/* Interactive hint tag */}
            <div className="absolute top-2 left-2 z-10 flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#1a1612]/85 text-[#f4ead5] text-[10px] font-amiri shadow-md">
              <Sparkles className="w-2.5 h-2.5 text-[#d4c5a9]" />
              <span>المسي الصورة</span>
            </div>
          </div>

          {/* Under-photo handwritten caption label */}
          <div className="mt-3 pt-2 border-t border-[#4a3f35]/20 flex items-center justify-between">
            <span className="font-ruqaa text-lg sm:text-xl text-[#2b1d12]">
              {wifeName}… النظرة اللي غيرت كل حاجة
            </span>
            <span className="font-mono text-[10px] text-[#4a3f35] font-semibold">
              RECORD I
            </span>
          </div>

          {/* Hidden inscription revealed on tap */}
          <AnimatePresence>
            {isFlipped && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.35 }}
                className="mt-3 p-3 rounded-md bg-[#2c241c] text-[#f4ead5] border border-[#4a3f35]/50 text-center"
              >
                <p className="font-ruqaa text-base sm:text-lg text-[#f4ead5] font-bold leading-snug">
                  «أحلى صورة في الدنيا مش صورة بشوفها… دي اللحظة اللي بشوفك فيها.»
                </p>
                <span className="font-mono text-[10px] text-[#d4c5a9] mt-1 block">
                  — بخط إيد محمود
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Floating subtle heart on tap */}
      <AnimatePresence>
        {showHeartToast && (
          <motion.div
            initial={{ opacity: 0, y: 0, scale: 0.8 }}
            animate={{ opacity: 1, y: -20, scale: 1.1 }}
            exit={{ opacity: 0, y: -40 }}
            className="fixed bottom-20 z-50 px-4 py-2 rounded-full bg-[#8b1a1a] text-[#f4ead5] border border-[#7a1616] text-xs font-ruqaa flex items-center gap-2 shadow-2xl"
          >
            <Heart className="w-3.5 h-3.5 fill-[#d4c5a9] text-[#d4c5a9]" />
            <span>نظرة واحدة عملت عُمر بحاله</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Text Under the Photograph */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-8 text-center max-w-xl px-2"
      >
        <p className="font-amiri text-lg sm:text-xl text-[#2b1d12] leading-relaxed">
          «من يومها ومكنتش متخيل إن أول نظرة دي هتاخدني لأحلى سنين عمري.»
        </p>

        {/* Editorial Stat Callout Box: 2,266 يوماً */}
        <div className="my-6 py-5 px-8 rounded-lg bg-[#2c241c] text-[#f4ead5] border border-[#4a3f35]/50 shadow-xl inline-block text-center">
          <p className="text-[#d4c5a9] text-xs uppercase tracking-[0.2em] opacity-70 mb-1 font-mono">
            حساب الأيام
          </p>
          <div className="font-mono text-3xl sm:text-4xl md:text-5xl text-[#f4ead5] font-bold tracking-tight">
            {totalDays}
          </div>
          <p className="font-ruqaa text-lg sm:text-xl text-[#d4c5a9] mt-1.5 font-bold">
            من أول ما عيني شافتك.. ولحد النهارده.
          </p>
        </div>

        <p className="font-amiri text-base sm:text-lg text-[#574336] italic leading-relaxed">
          «ومع كل الأيام دي، لسه بحس كأني بشوفك لأول مرة.»
        </p>
      </motion.div>
    </section>
  );
};
