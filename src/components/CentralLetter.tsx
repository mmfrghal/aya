import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Feather, Heart } from 'lucide-react';
import { storyData } from '../data/storyData';
import { vintageAudio } from '../utils/audioSynth';

export const CentralLetter: React.FC = () => {
  const { loveLetter } = storyData;
  const hasPlayedSoundRef = useRef(false);

  const handleEnterView = () => {
    if (!hasPlayedSoundRef.current) {
      hasPlayedSoundRef.current = true;
      vintageAudio.playPenWritingSound(2.5);
    }
  };

  return (
    <section id="screen-central-letter" className="py-16 px-4 sm:px-10 flex justify-center">
      {/* Antique Manuscript Page */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        onViewportEnter={handleEnterView}
        transition={{ duration: 0.9 }}
        className="relative max-w-3xl w-full bg-[#f4ead5] rounded-xl shadow-[10px_10px_40px_rgba(0,0,0,0.2)] border border-[#d4c5a9] p-8 sm:p-14 overflow-hidden"
      >
        {/* Parchment Edge Vignette & Corner Ornaments */}
        <div className="absolute top-0 right-0 w-24 h-24 pointer-events-none opacity-25 border-t-2 border-r-2 border-[#4a3f35] m-4 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-24 h-24 pointer-events-none opacity-25 border-b-2 border-l-2 border-[#4a3f35] m-4 rounded-bl-lg" />

        {/* Vintage Top Feather / Quill Icon */}
        <div className="flex items-center justify-between border-b border-[#4a3f35]/20 pb-5 mb-8">
          <div className="flex items-center gap-2 text-[#574336]">
            <Feather className="w-5 h-5 opacity-70" />
            <span className="font-mono text-xs tracking-[0.2em] uppercase">
              Manuscript of Eternal Love
            </span>
          </div>

          <div className="font-mono text-xs text-[#574336]">
            27.08.2026
          </div>
        </div>

        {/* Salutation */}
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="font-ruqaa text-3xl sm:text-4xl text-[#2b1d12] font-bold">
            {loveLetter.salutation}
          </h2>
          <p className="text-[#8b1a1a] text-sm italic font-semibold opacity-90 mt-1">
            حبيبتي ومراتي وأغلى ما عندي
          </p>
          <div className="w-24 h-0.5 bg-[#8b1a1a]/40 mt-2 rounded-full" />
        </motion.div>

        {/* Letter Paragraphs */}
        <div className="space-y-6 text-[#2b1d12] font-amiri text-lg sm:text-xl md:text-[22px] leading-[2.1] text-justify sm:text-right">
          {loveLetter.paragraphs.map((p, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: idx * 0.1 }}
              className="indent-6"
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Closing & Handwritten Signature */}
        <div className="mt-14 pt-8 border-t border-[#4a3f35]/20 flex flex-col items-end">
          <p className="font-ruqaa text-xl sm:text-2xl text-[#2b1d12] font-bold text-left sm:text-right">
            {loveLetter.closing}
          </p>

          {/* Mahmud Signature */}
          <div className="mt-6 flex flex-col items-center">
            {/* Calligraphic signature */}
            <span className="font-ruqaa text-5xl sm:text-6xl text-[#8b1a1a] font-bold tracking-wider drop-shadow-xs rotate-[-2deg]">
              {loveLetter.signatureName}
            </span>
            <span className="font-amiri text-sm text-[#574336] mt-1 font-semibold">
              {loveLetter.signatureRole}
            </span>
          </div>

          {/* Small decorative wax stamp */}
          <div className="mt-6 self-center sm:self-start opacity-90">
            <div className="w-12 h-12 rounded-full bg-[#8b1a1a] border-2 border-[#7a1616] flex items-center justify-center text-[#f4ead5] shadow-md">
              <span className="font-ruqaa text-lg font-bold">M</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
