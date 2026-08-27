import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Atmosphere } from './components/Atmosphere';
import { VintageAudioPlayer } from './components/VintageAudioPlayer';
import { Envelope } from './components/Envelope';
import { LetterHeader } from './components/LetterHeader';
import { MainPhotoSection } from './components/MainPhotoSection';
import { TimelineSection } from './components/TimelineSection';
import { CentralLetter } from './components/CentralLetter';
import { YearsTogetherSection } from './components/YearsTogetherSection';
import { MemoriesGrid } from './components/MemoriesGrid';
import { TuckedNote } from './components/TuckedNote';
import { SecretWaxNote } from './components/SecretWaxNote';
import { FinalMoment } from './components/FinalMoment';
import { storyData } from './data/storyData';

export default function App() {
  const [isLetterOpened, setIsLetterOpened] = useState(false);

  return (
    <div 
      className="relative min-h-screen bg-[#1a1612] text-[#2b1d12] overflow-x-hidden selection:bg-[#8b1a1a]/20 selection:text-[#5e0e0e]"
      style={{
        backgroundImage: 'radial-gradient(circle at center, #2c241c 0%, #1a1612 100%)',
      }}
    >
      {/* Noise Texture Overlay */}
      <div 
        className="fixed inset-0 opacity-[0.07] pointer-events-none z-0" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }} 
      />

      {/* Visual Ambiance: Candlelight & floating particles */}
      <Atmosphere />

      {/* Background Audio Player: "اسمعي الجواب" */}
      <VintageAudioPlayer customAudioUrl={storyData.audioUrl} />

      {/* Screen 1: The Antique Closed Envelope with Wax Seal */}
      <AnimatePresence>
        {!isLetterOpened && (
          <Envelope
            onOpened={() => setIsLetterOpened(true)}
            wifeName={storyData.wifeName}
            husbandName={storyData.husbandName}
          />
        )}
      </AnimatePresence>

      {/* The Physical Love Letter Manuscript (Fades in seamlessly after opening) */}
      <main
        id="love-letter-manuscript"
        className={`relative z-10 transition-opacity duration-1000 ${
          isLetterOpened ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none h-0 overflow-hidden'
        }`}
      >
        <div className="max-w-4xl mx-auto px-3 sm:px-6 py-6 sm:py-12">
          {/* Parchment Sheet Layer with Editorial aesthetic shadow & border */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={isLetterOpened ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="parchment-sheet rounded-xl sm:rounded-2xl overflow-hidden border border-[#d4c5a9] shadow-[20px_20px_60px_rgba(0,0,0,0.85)]"
          >
            {/* Screen 2: The First Line & Antique Date-Stamp */}
            <LetterHeader
              wifeName={storyData.wifeName}
              husbandName={storyData.husbandName}
              firstLookDate={storyData.firstLookDate}
            />

            {/* Screen 3: The First Photograph & 2,266 Days Calculation */}
            <MainPhotoSection
              wifeName={storyData.wifeName}
              totalDays={storyData.durations.firstLookToCurrent.days}
              imageSrc={storyData.firstLookImage}
            />

            {/* Screen 4: Our Story (Vertical Antique Timeline) */}
            <TimelineSection />

            {/* Screen 5: The Central Love Letter */}
            <CentralLetter />

            {/* Screen 6: Years Together (Old Diary Page) */}
            <YearsTogetherSection />

            {/* Screen 7: Four Memories (Scattered Desk Photographs) */}
            <MemoriesGrid />

            {/* Screen 8: A Small Message for Aya (Tucked Note) */}
            <TuckedNote wifeName={storyData.wifeName} />

            {/* Screen 9: The Secret Note (Interactive Wax Button) */}
            <SecretWaxNote
              husbandName={storyData.husbandName}
              firstLookDate={storyData.firstLookDate}
            />

            {/* Screen 10: Final Moment & Intimate Closing Seal */}
            <FinalMoment
              wifeName={storyData.wifeName}
              husbandName={storyData.husbandName}
              firstLookDate={storyData.firstLookDate}
              weddingDate={storyData.weddingDate}
              currentDate={storyData.currentDate}
            />
          </motion.div>
        </div>
      </main>

      {/* Editorial Bottom Record ID Stamp */}
      <div className="fixed bottom-3 right-6 text-[#d4c5a9] text-[9px] font-mono opacity-30 select-none pointer-events-none z-20 hidden sm:block">
        RECORD ID: 130620-120221-270826
      </div>
    </div>
  );
}
