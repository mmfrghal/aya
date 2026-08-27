import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock } from 'lucide-react';
import { vintageAudio } from '../utils/audioSynth';
import { PasscodeModal } from './PasscodeModal';

interface EnvelopeProps {
  onOpened: () => void;
  wifeName: string;
  husbandName: string;
}

export const Envelope: React.FC<EnvelopeProps> = ({ onOpened, wifeName, husbandName }) => {
  const [stage, setStage] = useState<'closed' | 'cracking' | 'opening' | 'sliding' | 'revealed'>('closed');
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);

  const handleEnvelopeClick = () => {
    if (stage !== 'closed') return;
    vintageAudio.playKeyClick();
    setShowPasscodeModal(true);
  };

  const handlePasscodeSuccess = () => {
    setShowPasscodeModal(false);
    startOpenSequence();
  };

  const startOpenSequence = () => {
    // Haptic feedback if available on device
    if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
      try {
        navigator.vibrate([25, 45, 25]);
      } catch {
        // safe
      }
    }

    // Automatically start romantic background music on open
    vintageAudio.play();

    // Step 1: Wax seal crack
    setStage('cracking');
    vintageAudio.playWaxSealCrack();

    setTimeout(() => {
      // Step 2: Envelope flap opens
      setStage('opening');
      vintageAudio.playPaperRustle();
    }, 600);

    setTimeout(() => {
      // Step 3: Letter slides out
      setStage('sliding');
    }, 1400);

    setTimeout(() => {
      // Step 4: Full reveal and transition to scrollable letter
      setStage('revealed');
      onOpened();
    }, 2500);
  };

  return (
    <div 
      id="antique-envelope-screen" 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 wood-desk-texture select-none overflow-hidden"
    >
      {/* Passcode Modal (Secret PIN 2020) */}
      <PasscodeModal
        isOpen={showPasscodeModal}
        onClose={() => setShowPasscodeModal(false)}
        onSuccess={handlePasscodeSuccess}
        wifeName={wifeName}
      />

      {/* Soft atmospheric candlelight aura */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#f4a242]/10 blur-3xl pointer-events-none candle-glow" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ 
          opacity: 1, 
          scale: stage === 'sliding' || stage === 'revealed' ? 1.06 : 1, 
          y: 0 
        }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex flex-col items-center max-w-md w-full"
      >
        {/* Envelope Container */}
        <div 
          id="envelope-card"
          onClick={handleEnvelopeClick}
          className="relative w-full max-w-[390px] sm:max-w-[430px] aspect-[1.48/1] cursor-pointer group rounded-xl shadow-[20px_20px_60px_rgba(0,0,0,0.85)] border border-[#4a3f35]/50 transition-transform duration-500 hover:scale-[1.015]"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleEnvelopeClick();
            }
          }}
          aria-label="افتحي جواب الحب من محمود"
        >
          {/* Envelope Back Base (Aged handmade craft envelope paper) */}
          <div className="absolute inset-0 bg-[#e7d8be] rounded-xl overflow-hidden shadow-inner border border-[#d4c5a9]">
            {/* Paper Texture lines & aging marks */}
            <div 
              className="absolute inset-0 opacity-25"
              style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(74, 63, 53, 0.25) 0%, transparent 80%)',
              }}
            />
          </div>

          {/* Secret Security Badge on Top Corner */}
          <div className="absolute top-2.5 right-2.5 z-35 flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1a1612]/75 text-[#d4c5a9] border border-[#d4c5a9]/30 text-[10px] font-amiri shadow-md">
            <Lock className="w-3 h-3 text-[#f4ead5]" />
            <span>محمي برقم سري</span>
          </div>

          {/* Letter Peeking out during sliding */}
          <motion.div
            initial={{ y: 0, opacity: 0 }}
            animate={{
              y: stage === 'sliding' || stage === 'revealed' ? -90 : 0,
              opacity: stage === 'sliding' || stage === 'revealed' ? 1 : 0,
            }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-4 top-3 h-[85%] bg-[#f4ead5] rounded-t-lg shadow-xl border border-[#d4c5a9] p-5 flex flex-col items-center justify-start text-center z-10 pointer-events-none"
          >
            <div className="w-12 h-0.5 bg-[#4a3f35]/30 mb-3" />
            <p className="font-ruqaa text-xl text-[#2b1d12]">إلى {wifeName}… زوجتي وحبيبتي</p>
            <p className="font-amiri text-xs text-[#574336] mt-1">حكاية بدأت بنظرة… وأصبحت عمرًا</p>
          </motion.div>

          {/* Envelope Fold Lines (Bottom Flap & Side Flaps) */}
          <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden rounded-xl">
            {/* Left Triangle */}
            <div 
              className="absolute left-0 bottom-0 top-0 w-1/2 bg-[#ded0b8] border-r border-[#4a3f35]/30 shadow-sm"
              style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
            />
            {/* Right Triangle */}
            <div 
              className="absolute right-0 bottom-0 top-0 w-1/2 bg-[#ded0b8] border-l border-[#4a3f35]/30 shadow-sm"
              style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}
            />
            {/* Bottom Triangle */}
            <div 
              className="absolute bottom-0 inset-x-0 h-[62%] bg-[#dfd2b9] border-t border-[#4a3f35]/40 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]"
              style={{ clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}
            />
          </div>

          {/* Top Flap (Animated opening) */}
          <motion.div
            initial={{ rotateX: 0 }}
            animate={{
              rotateX: stage === 'opening' || stage === 'sliding' || stage === 'revealed' ? 180 : 0,
              zIndex: stage === 'opening' || stage === 'sliding' || stage === 'revealed' ? 5 : 30,
            }}
            transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
            style={{ transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
            className="absolute top-0 inset-x-0 h-[56%] bg-[#ebdcc2] border-b border-[#4a3f35]/40 shadow-md rounded-t-xl"
          >
            <div 
              className="w-full h-full bg-[#ebdcc2]"
              style={{ clipPath: 'polygon(0 0, 50% 100%, 100% 0)' }}
            />
          </motion.div>

          {/* Envelope Front Typography & Details */}
          <div className="absolute inset-0 z-25 flex flex-col items-center justify-between p-6 pointer-events-none">
            {/* Vintage Postmark Stamp Top-Left */}
            <div className="self-start flex items-center gap-2 opacity-85">
              <div className="w-14 h-14 border border-dashed border-[#4a3f35]/60 rounded-full flex flex-col items-center justify-center p-1 text-center rotate-[-8deg]">
                <span className="font-mono text-[8px] text-[#2b1d12] tracking-widest leading-none">13.06.2020</span>
                <span className="font-amiri text-[9px] text-[#2b1d12] font-bold">بريد القلب</span>
                <span className="font-cinzel text-[7px] text-[#574336] tracking-tight">CAIRO • EGYPT</span>
              </div>
            </div>

            {/* Main Handwritten Address on Envelope */}
            <div className="text-center my-auto px-4 drop-shadow-sm">
              <h2 className="font-ruqaa text-2xl sm:text-3xl text-[#2b1d12] font-bold tracking-wide">
                لحبيبتي ومراتي آية
              </h2>
              <p className="font-amiri text-sm sm:text-base text-[#574336] mt-1.5 font-medium">
                من محمود… للإنسانة اللي بقت دنيتي كلها.
              </p>
            </div>

            {/* Bottom Sub-flourish */}
            <div className="w-16 h-0.5 bg-[#4a3f35]/20 rounded-full" />
          </div>

          {/* Realistic Burgundy Wax Seal in Center */}
          <AnimatePresence>
            {stage !== 'revealed' && (
              <motion.div
                id="burgundy-wax-seal"
                initial={{ scale: 1, opacity: 1 }}
                animate={{
                  scale: stage === 'cracking' ? [1, 1.15, 0.95] : 1,
                  rotate: stage === 'cracking' ? [0, -3, 3, 0] : 0,
                  opacity: stage === 'opening' || stage === 'sliding' ? 0 : 1,
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.5 }}
                className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 z-40 w-16 h-16 sm:w-20 sm:h-20 rounded-full wax-seal flex items-center justify-center cursor-pointer border-4 border-[#7a1616]"
              >
                {/* Wax Seal Rim & Texture */}
                <div className="w-12 h-12 sm:w-15 sm:h-15 rounded-full border border-[#f4ead5]/40 flex flex-col items-center justify-center text-center shadow-inner">
                  {/* Monogram Seal "م & آ" */}
                  <span className="font-ruqaa text-lg sm:text-xl text-[#f4ead5] font-bold tracking-widest drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    م & آ
                  </span>
                  <span className="font-cinzel text-[7px] sm:text-[8px] text-[#d4c5a9]/90 tracking-widest leading-none mt-0.5">
                    ETERNAL
                  </span>
                </div>

                {/* Crack lines overlay when cracking */}
                {stage === 'cracking' && (
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox="0 0 100 100"
                  >
                    <path
                      d="M 50 10 L 48 38 L 56 60 L 42 88"
                      stroke="#f4ead5"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 48 38 L 32 45"
                      stroke="#f4ead5"
                      strokeWidth="1.8"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </motion.svg>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Action Prompt Below Envelope */}
        <motion.div
          animate={{
            y: [0, -3, 0],
            opacity: stage === 'closed' ? [0.85, 1, 0.85] : 0,
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="mt-8 text-center"
        >
          <button
            onClick={handleEnvelopeClick}
            className="group inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#2c241c] hover:bg-[#3d3227] text-[#f4ead5] border border-[#4a3f35] hover:border-[#d4c5a9] transition-all duration-300 shadow-xl cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#8b1a1a] group-hover:animate-ping" />
            <span className="font-ruqaa text-xl sm:text-2xl text-[#f4ead5] tracking-wide">
              افتحي جوابي يا آية...
            </span>
          </button>
          <p className="font-amiri text-xs text-[#d4c5a9] opacity-80 mt-2.5">
            المسي الظرف لفتح الرسالة
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
