import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface TuckedNoteProps {
  wifeName: string;
}

export const TuckedNote: React.FC<TuckedNoteProps> = ({ wifeName }) => {
  return (
    <section id="screen-tucked-note" className="py-14 px-4 sm:px-10 flex justify-center">
      {/* Small folded parchment note tucked into page */}
      <motion.div
        initial={{ opacity: 0, y: 20, rotate: -1.2 }}
        whileInView={{ opacity: 1, y: 0, rotate: -0.6 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative max-w-lg w-full bg-[#f4ead5] rounded-md shadow-md border border-[#d4c5a9] p-6 sm:p-10 text-center"
      >
        {/* Vintage Folded Corner Accent */}
        <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl from-[#d4c5a9] to-transparent pointer-events-none rounded-tr-md" />

        {/* Small top label */}
        <div className="flex items-center justify-center gap-1.5 text-[#574336] mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#8b1a1a]" />
          <span className="font-mono text-[11px] tracking-[0.2em] uppercase">
            A WHISPERED THOUGHT
          </span>
        </div>

        {/* Question Title */}
        <h3 className="font-ruqaa text-2xl sm:text-3xl text-[#2b1d12] font-bold leading-normal">
          «يا {wifeName}، لو سألتيني إيه أحلى حاجة حصلتلي...»
        </h3>

        {/* The first half */}
        <div className="my-5">
          <p className="font-amiri text-xl sm:text-2xl text-[#8b1a1a] font-bold">
            «مش هقولك يوم واحد بعينه.»
          </p>
        </div>

        {/* Visual Pause: Subtle Divider with rhythmic dots */}
        <div className="flex items-center justify-center gap-2 my-6 opacity-60">
          <span className="w-8 h-px bg-[#4a3f35]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#8b1a1a]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#4a3f35]" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#8b1a1a]" />
          <span className="w-8 h-px bg-[#4a3f35]" />
        </div>

        {/* The second emotional answer */}
        <motion.p
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-ruqaa text-2xl sm:text-3xl md:text-4xl text-[#2b1d12] font-bold leading-snug"
        >
          «هقولك: كل الأيام اللي إنتي فيها معايا.»
        </motion.p>
      </motion.div>
    </section>
  );
};
