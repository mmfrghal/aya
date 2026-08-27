import React from 'react';
import { motion } from 'motion/react';
import { Bookmark, Calendar, Clock } from 'lucide-react';
import { storyData } from '../data/storyData';

export const YearsTogetherSection: React.FC = () => {
  const { durations, weddingDate, currentDate } = storyData;

  return (
    <section id="screen-years-together" className="py-16 px-4 sm:px-10 flex justify-center bg-[#ede1cb]/30 border-t border-[#d4c5a9]/50">
      {/* Old Diary Book Page Layout */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-2xl w-full bg-[#f4ead5] rounded-lg shadow-lg border border-[#d4c5a9] p-8 sm:p-12 text-center"
      >
        {/* Diary Bookmark Ribbon Hanging from Top */}
        <div className="absolute -top-3 right-8 w-6 h-12 bg-[#8b1a1a] shadow-md flex items-end justify-center pb-1 rounded-t-sm" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)' }}>
          <Bookmark className="w-3 h-3 text-[#f4ead5] opacity-90" />
        </div>

        {/* Diary Header */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <Calendar className="w-4 h-4 text-[#574336]" />
          <span className="font-mono text-xs text-[#574336] tracking-[0.2em] uppercase">
            DIARY OF SHARED DAYS
          </span>
        </div>

        {/* Title */}
        <h2 className="font-ruqaa text-3xl sm:text-4xl text-[#2b1d12] font-bold">
          ومن يوم فرحنا…
        </h2>

        {/* Editorial Stat Box */}
        <div className="my-8 py-6 px-4 sm:px-8 rounded-xl bg-[#2c241c] text-[#f4ead5] border border-[#4a3f35]/50 shadow-xl">
          <div className="font-ruqaa text-3xl sm:text-4xl md:text-5xl text-[#f4ead5] font-bold tracking-tight">
            {durations.weddingToCurrent.text}
          </div>

          <div className="mt-3 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4 text-[#d4c5a9]" />
            <span className="font-mono text-2xl sm:text-3xl text-[#d4c5a9] font-bold">
              {durations.weddingToCurrent.days}
            </span>
          </div>

          <div className="font-amiri text-sm sm:text-base text-[#d4c5a9]/80 mt-3 border-t border-[#4a3f35]/50 pt-2">
            من {weddingDate} ولحد النهاردة.
          </div>
        </div>

        {/* Reflections */}
        <div className="space-y-4 max-w-xl mx-auto">
          <p className="font-amiri text-xl sm:text-2xl text-[#2b1d12] font-semibold leading-relaxed">
            «أيام كتير عدت… بس أحلى ما فيها إنك كنتي معايا.»
          </p>

          <p className="font-amiri text-lg sm:text-xl text-[#574336] leading-relaxed italic">
            «ومش فارق معايا أعد اللي فات… قد ما نفسي أعيش معاكي كل اللي جاي.»
          </p>
        </div>

        {/* Diary Footer Flourish */}
        <div className="mt-8 pt-4 border-t border-dashed border-[#d4c5a9] flex items-center justify-between text-xs font-amiri text-[#574336]">
          <span>صفحة من دفتر الحياة</span>
          <span className="font-mono text-[10px]">RECORD • 2022 / ∞</span>
        </div>
      </motion.div>
    </section>
  );
};
