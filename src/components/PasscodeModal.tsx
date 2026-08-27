import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, Delete, X, Heart, Sparkles } from 'lucide-react';
import { vintageAudio } from '../utils/audioSynth';

interface PasscodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  wifeName: string;
}

export const PasscodeModal: React.FC<PasscodeModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  wifeName,
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const CORRECT_PIN = '2020';

  const triggerHaptic = (pattern: number[] = [20, 30]) => {
    if (typeof window !== 'undefined' && 'navigator' in window && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // safe
      }
    }
  };

  const handleDigit = (digit: string) => {
    if (isUnlocked || pin.length >= 4) return;

    vintageAudio.playKeyClick();
    triggerHaptic([15]);
    const newPin = pin + digit;
    setPin(newPin);
    setError(false);

    if (newPin.length === 4) {
      validatePin(newPin);
    }
  };

  const handleDelete = () => {
    if (isUnlocked || pin.length === 0) return;
    vintageAudio.playKeyClick();
    triggerHaptic([10]);
    setPin((prev) => prev.slice(0, -1));
    setError(false);
  };

  const handleClear = () => {
    if (isUnlocked) return;
    vintageAudio.playKeyClick();
    setPin('');
    setError(false);
  };

  const validatePin = (code: string) => {
    if (code === CORRECT_PIN) {
      setIsUnlocked(true);
      vintageAudio.playUnlockSuccess();
      triggerHaptic([30, 60, 40]);

      setTimeout(() => {
        onSuccess();
      }, 700);
    } else {
      setError(true);
      vintageAudio.playLockError();
      triggerHaptic([50, 40, 50]);

      setTimeout(() => {
        setPin('');
        setError(false);
      }, 900);
    }
  };

  // Listen to physical keyboard events
  useEffect(() => {
    if (!isOpen) {
      setPin('');
      setError(false);
      setIsUnlocked(false);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isUnlocked) return;

      if (e.key >= '0' && e.key <= '9') {
        e.preventDefault();
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        e.preventDefault();
        handleDelete();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, pin, isUnlocked]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-sm w-full bg-[#f4ead5] border-2 border-[#b89f80] rounded-2xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.85)] text-center overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3.5 left-3.5 p-1.5 rounded-full text-[#574336] hover:text-[#2b1d12] hover:bg-[#d4c5a9]/50 transition-colors"
            aria-label="إلغاء"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Icon / Lock */}
          <div className="flex flex-col items-center justify-center mt-1">
            <motion.div
              animate={
                isUnlocked
                  ? { scale: [1, 1.25, 1], rotate: [0, -10, 10, 0] }
                  : error
                  ? { x: [-8, 8, -6, 6, -3, 3, 0] }
                  : {}
              }
              className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-colors duration-300 ${
                isUnlocked
                  ? 'bg-[#2e7d32] border-[#1b5e20] text-[#f4ead5] shadow-[0_0_20px_rgba(46,125,50,0.6)]'
                  : error
                  ? 'bg-[#8b1a1a] border-[#7a1616] text-[#f4ead5]'
                  : 'bg-[#2c241c] border-[#8b1a1a] text-[#d4c5a9]'
              }`}
            >
              {isUnlocked ? (
                <Unlock className="w-7 h-7" />
              ) : (
                <Lock className="w-7 h-7" />
              )}
            </motion.div>

            <h3 className="font-ruqaa text-2xl sm:text-3xl text-[#2b1d12] font-bold mt-3">
              {isUnlocked ? 'تم فتح القفل بنجاح' : 'الجواب مقفول برقم سري'}
            </h3>
            <p className="font-amiri text-xs sm:text-sm text-[#574336] mt-0.5">
              {isUnlocked
                ? 'جاري فتح الرسالة لحبيبتي آية…'
                : 'أدخلي الرقم السري لفتح الرسالة (4 أرقام)'}
            </p>
          </div>

          {/* PIN Display Boxes */}
          <motion.div
            animate={error ? { x: [-12, 12, -8, 8, -4, 4, 0] } : {}}
            transition={{ duration: 0.4 }}
            className="flex items-center justify-center gap-3 my-5"
          >
            {[0, 1, 2, 3].map((index) => {
              const filled = pin.length > index;
              const digit = pin[index];

              return (
                <div
                  key={index}
                  className={`w-12 h-13 sm:w-13 sm:h-14 rounded-xl flex items-center justify-center text-2xl font-bold border-2 transition-all duration-200 ${
                    isUnlocked
                      ? 'border-[#2e7d32] bg-[#2e7d32]/15 text-[#1b5e20]'
                      : error
                      ? 'border-[#8b1a1a] bg-[#8b1a1a]/15 text-[#8b1a1a]'
                      : filled
                      ? 'border-[#8b1a1a] bg-[#2c241c] text-[#f4ead5] shadow-md scale-105'
                      : 'border-[#b89f80] bg-[#e7d8be]/80 text-transparent'
                  }`}
                >
                  {filled ? digit : ''}
                </div>
              );
            })}
          </motion.div>

          {/* Hint / Error message */}
          <div className="h-6 mb-2 flex items-center justify-center">
            {error ? (
              <span className="font-amiri text-xs text-[#8b1a1a] font-bold animate-pulse">
                الرقم السري غير صحيح.. فكري في سنة بداية حكايتنا ❤️
              </span>
            ) : isUnlocked ? (
              <span className="font-amiri text-xs text-[#2e7d32] font-bold inline-flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                سنة 2020.. سنة البداية واللقاء الأول
              </span>
            ) : (
              <span className="font-amiri text-[11px] text-[#574336]/80">
                سنة اليوم اللي بدأت فيه حكايتنا سوا
              </span>
            )}
          </div>

          {/* Antique Numeric Keypad */}
          <div className="grid grid-cols-3 gap-2.5 max-w-[260px] mx-auto">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => handleDigit(num)}
                disabled={isUnlocked}
                className="h-12 rounded-xl bg-[#2c241c] hover:bg-[#3d3227] active:bg-[#1a1612] text-[#f4ead5] font-mono text-xl font-bold border border-[#4a3f35] shadow-sm hover:shadow transition-all duration-150 active:scale-95 disabled:opacity-60 cursor-pointer"
              >
                {num}
              </button>
            ))}

            {/* Clear button */}
            <button
              type="button"
              onClick={handleClear}
              disabled={isUnlocked || pin.length === 0}
              className="h-12 rounded-xl bg-[#dfd2b9] hover:bg-[#d4c5a9] active:bg-[#c9b89c] text-[#2b1d12] font-amiri text-sm font-bold border border-[#b89f80] transition-all duration-150 active:scale-95 disabled:opacity-40 cursor-pointer"
            >
              مسح
            </button>

            {/* 0 button */}
            <button
              type="button"
              onClick={() => handleDigit('0')}
              disabled={isUnlocked}
              className="h-12 rounded-xl bg-[#2c241c] hover:bg-[#3d3227] active:bg-[#1a1612] text-[#f4ead5] font-mono text-xl font-bold border border-[#4a3f35] shadow-sm hover:shadow transition-all duration-150 active:scale-95 disabled:opacity-60 cursor-pointer"
            >
              0
            </button>

            {/* Backspace button */}
            <button
              type="button"
              onClick={handleDelete}
              disabled={isUnlocked || pin.length === 0}
              aria-label="مسح رقم"
              className="h-12 rounded-xl bg-[#dfd2b9] hover:bg-[#d4c5a9] active:bg-[#c9b89c] text-[#2b1d12] flex items-center justify-center border border-[#b89f80] transition-all duration-150 active:scale-95 disabled:opacity-40 cursor-pointer"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
