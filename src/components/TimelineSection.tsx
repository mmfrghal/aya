import React from 'react';
import { motion } from 'motion/react';
import { timelineEvents } from '../data/storyData';

export const TimelineSection: React.FC = () => {
  return (
    <section id="screen-our-story" className="py-14 px-4 sm:px-10 border-t border-b border-[#d4c5a9]/50 bg-[#ede1cb]/30">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#2c241c] border border-[#4a3f35] text-[#d4c5a9] text-xs font-mono tracking-[0.2em] uppercase mb-3"
        >
          <span>THE CHRONICLES OF US</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-ruqaa text-3xl sm:text-4xl md:text-5xl text-[#2b1d12] font-bold"
        >
          4 تواريخ… بنوا حكايتنا.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-amiri text-sm sm:text-base text-[#574336] mt-2"
        >
          أيام محفورة في قلبي قبل أي ورق
        </motion.p>
      </div>

      {/* Vertical Timeline Tree */}
      <div className="relative max-w-2xl mx-auto flex flex-col items-center">
        {/* Central Vertical Spine / Vintage thread line */}
        <div className="absolute top-4 bottom-8 w-0.5 bg-gradient-to-b from-[#4a3f35]/20 via-[#4a3f35]/50 to-[#4a3f35]/20 right-1/2 translate-x-1/2 pointer-events-none" />

        {timelineEvents.map((event, index) => {
          const isEven = index % 2 === 0;

          return (
            <div key={event.id} className="relative w-full my-4 flex flex-col items-center">
              {/* Pinned Card Container */}
              <motion.div
                initial={{ opacity: 0, y: 24, rotate: isEven ? -1.5 : 1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: isEven ? -0.8 : 0.8 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: index * 0.15 }}
                whileHover={{ scale: 1.02, rotate: 0 }}
                className="relative w-full max-w-lg bg-[#f4ead5] p-5 sm:p-6 rounded-lg shadow-md border border-[#d4c5a9] transition-all duration-300 z-10"
              >
                {/* Editorial Pin */}
                <div className="absolute -top-3 right-1/2 translate-x-1/2 w-6 h-6 rounded-full bg-[#8b1a1a] flex items-center justify-center z-20 border-2 border-[#7a1616] shadow-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#f4ead5] opacity-90" />
                </div>

                {/* Card Content */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#4a3f35]/20 pb-2.5 mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-ruqaa text-2xl sm:text-3xl text-[#8b1a1a] font-bold">
                      {event.title}
                    </span>
                    {event.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-[#2c241c] text-[#f4ead5] text-[10px] font-mono">
                        {event.badge}
                      </span>
                    )}
                  </div>

                  <span className="font-mono text-xs sm:text-sm text-[#2b1d12] font-bold tracking-wide">
                    {event.date}
                  </span>
                </div>

                <p className="font-amiri text-base sm:text-lg text-[#2b1d12] leading-relaxed">
                  {event.subtitle}
                </p>

                {/* Worn edge accent */}
                <div className="mt-3 flex items-center justify-between text-[11px] font-amiri text-[#574336] pt-2 border-t border-dashed border-[#d4c5a9]">
                  <span>تاريخ مسجل في الذاكرة</span>
                  <span className="font-mono text-[10px] text-[#4a3f35]">JOURNEY 2020–2026</span>
                </div>
              </motion.div>

              {/* Interval Badge Between Cards */}
              {index < timelineEvents.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="my-3 z-20"
                >
                  <div className="px-4 py-1 rounded-full bg-[#2c241c] border border-[#4a3f35] shadow-xs text-center">
                    <span className="font-ruqaa text-base sm:text-lg text-[#d4c5a9] font-bold block">
                      {event.daysIntervalText}
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Special Badge after Wedding */}
              {index === timelineEvents.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="mt-6 z-20 text-center"
                >
                  <div className="inline-flex flex-col items-center px-6 py-2.5 rounded-xl bg-[#8b1a1a] text-[#f4ead5] border border-[#7a1616] shadow-xl">
                    <span className="font-ruqaa text-2xl sm:text-3xl font-bold text-[#f4ead5]">
                      2,022 يوم جواز
                    </span>
                    <span className="font-amiri text-xs text-[#f4ead5]/80 mt-0.5">
                      ولسه اللي جاي أحلى سوا
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
