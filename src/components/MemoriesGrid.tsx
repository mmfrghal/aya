import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Heart } from 'lucide-react';
import { memoryPhotos } from '../data/storyData';
import { MemoryPhoto } from '../types';

export const MemoriesGrid: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);

  return (
    <section id="screen-four-memories" className="py-16 px-4 sm:px-10 border-t border-[#d4c5a9]/50">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <span className="font-mono text-xs text-[#574336] tracking-[0.2em] uppercase block mb-1">
          MEMORIES IN PRINT
        </span>
        <h2 className="font-ruqaa text-3xl sm:text-4xl md:text-5xl text-[#2b1d12] font-bold">
          4 ذكريات في القلب
        </h2>
        <p className="font-amiri text-sm sm:text-base text-[#574336] mt-2">
          كل صورة فيهم وراها حكاية وإحساس مبيتنسيش
        </p>
      </div>

      {/* Scattered Photographs Grid */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6 justify-items-center">
        {memoryPhotos.map((photo, index) => {
          return (
            <motion.div
              key={photo.id}
              style={{ rotate: `${photo.rotation}deg` }}
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedPhoto(photo)}
              className="relative w-full max-w-[240px] bg-[#d4c5a9] p-3 rounded-xs cursor-pointer shadow-lg border border-[#4a3f35]/25 border-b-8 border-white/40 transition-all duration-300"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedPhoto(photo);
                }
              }}
              aria-label={`عرض ذكرى: ${photo.caption}`}
            >
              {/* Top tiny tape sticker */}
              <div 
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-4 bg-white/25 backdrop-blur-xs z-10"
                style={{ transform: `rotate(${index % 2 === 0 ? '-3deg' : '3deg'})` }}
              />

              {/* Photo Area */}
              <div className="aspect-[4/3.8] w-full bg-[#2c241c] rounded-xs border border-[#4a3f35]/40 overflow-hidden flex flex-col items-center justify-center relative text-center">
                {photo.imageSrc ? (
                  <div className="relative w-full h-full">
                    <img
                      src={photo.imageSrc}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-xs transition-transform duration-500 hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
                    <span className="absolute bottom-1.5 right-1.5 font-mono text-[8px] text-[#f4ead5] bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-xs">
                      {photo.date}
                    </span>
                  </div>
                ) : (
                  <div className="p-3 flex flex-col items-center justify-center grayscale contrast-125 sepia-[0.3]">
                    <div className="relative z-10 w-12 h-12 rounded-full border border-[#d4c5a9]/50 flex items-center justify-center bg-[#1a1612]/60 mb-2">
                      <span className="font-ruqaa text-xl text-[#f4ead5] font-bold">
                        {index + 1}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] text-[#f4ead5] font-bold tracking-wider z-10">
                      [{photo.placeholderType.toUpperCase()}]
                    </span>

                    <span className="font-mono text-[9px] text-[#d4c5a9] z-10 mt-0.5">
                      {photo.date}
                    </span>
                  </div>
                )}
              </div>

              {/* Handwritten Caption at Bottom of Photo */}
              <div className="mt-3 text-center border-t border-[#4a3f35]/20 pt-2">
                <p className="font-ruqaa text-xl text-[#8b1a1a] font-bold tracking-wide">
                  «{photo.caption}»
                </p>
                <span className="font-amiri text-[11px] text-[#2b1d12] block mt-0.5 font-semibold">
                  {photo.title}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Interactive Modal when Photo is Clicked */}
      <AnimatePresence>
        {selectedPhoto && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-md w-full bg-[#f4ead5] rounded-lg p-5 sm:p-7 border border-[#d4c5a9] shadow-[20px_20px_60px_rgba(0,0,0,0.85)] text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-3 left-3 p-1 rounded-full text-[#574336] hover:text-[#2b1d12] hover:bg-[#d4c5a9]/50 transition-colors z-20"
                aria-label="إغلاق الصورة"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Large Vintage Frame View */}
              <div className="aspect-[4/3] w-full bg-[#2c241c] rounded-xs border border-[#4a3f35]/50 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
                {selectedPhoto.imageSrc ? (
                  <div className="relative w-full h-full">
                    <img
                      src={selectedPhoto.imageSrc}
                      alt={selectedPhoto.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
                    <span className="absolute bottom-2.5 right-2.5 font-mono text-[10px] text-[#f4ead5] bg-black/70 px-2 py-0.5 rounded backdrop-blur-xs border border-white/10">
                      {selectedPhoto.date}
                    </span>
                  </div>
                ) : (
                  <div className="p-6 flex flex-col items-center justify-center grayscale contrast-125 sepia-[0.3]">
                    <div className="w-20 h-20 rounded-full border-2 border-[#d4c5a9]/60 flex flex-col items-center justify-center bg-[#1a1612]/60 mb-3">
                      <Heart className="w-6 h-6 text-[#8b1a1a]" />
                      <span className="font-ruqaa text-lg text-[#f4ead5] font-bold">آية & محمود</span>
                    </div>
                    <span className="font-mono text-sm text-[#f4ead5] font-bold">
                      [{selectedPhoto.placeholderType.toUpperCase()}]
                    </span>
                    <span className="font-mono text-xs text-[#d4c5a9] mt-1">
                      {selectedPhoto.date}
                    </span>
                  </div>
                )}
              </div>

              {/* Caption */}
              <div className="mt-4">
                <h3 className="font-ruqaa text-3xl text-[#8b1a1a] font-bold">
                  {selectedPhoto.caption}
                </h3>
                <p className="font-amiri text-base text-[#2b1d12] mt-1 font-semibold">
                  {selectedPhoto.title} — من أجمل لحظات عمرنا سوا.
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#4a3f35]/20">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-6 py-2 rounded-full bg-[#2c241c] text-[#f4ead5] font-ruqaa text-lg hover:bg-[#3d3227] transition-colors shadow-md border border-[#4a3f35]"
                >
                  اقفلي الصورة
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
