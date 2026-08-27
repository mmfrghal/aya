import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Disc } from 'lucide-react';
import { vintageAudio } from '../utils/audioSynth';

interface VintageAudioPlayerProps {
  customAudioUrl?: string;
}

export const VintageAudioPlayer: React.FC<VintageAudioPlayerProps> = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    vintageAudio.onStateChange((playing) => {
      setIsPlaying(playing);
    });

    // Auto-play listener on first user touch anywhere if not started yet
    const autoPlayOnFirstTouch = () => {
      if (!vintageAudio.getIsPlaying()) {
        vintageAudio.play();
      }
      window.removeEventListener('click', autoPlayOnFirstTouch);
      window.removeEventListener('touchstart', autoPlayOnFirstTouch);
    };

    window.addEventListener('click', autoPlayOnFirstTouch, { once: true });
    window.addEventListener('touchstart', autoPlayOnFirstTouch, { once: true });

    return () => {
      window.removeEventListener('click', autoPlayOnFirstTouch);
      window.removeEventListener('touchstart', autoPlayOnFirstTouch);
      vintageAudio.pause();
    };
  }, []);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = vintageAudio.toggle();
    setIsPlaying(nextState);
  };

  return (
    <div 
      id="vintage-audio-player" 
      className="fixed bottom-5 left-5 z-40 flex items-center gap-2 transition-all duration-500"
    >
      <button
        id="audio-toggle-button"
        onClick={handleToggle}
        className={`group relative flex items-center gap-2.5 p-2.5 sm:px-3.5 sm:py-2 rounded-full border transition-all duration-500 shadow-xl backdrop-blur-md cursor-pointer select-none ${
          isPlaying
            ? 'bg-[#2c241c]/95 text-[#f4ead5] border-[#d4c5a9]/60 shadow-[#d4c5a9]/10'
            : 'bg-[#1a1612]/90 text-[#d4c5a9] border-[#4a3f35]/50 hover:border-[#d4c5a9]'
        }`}
        aria-label={isPlaying ? 'كتم الموسيقى' : 'تشغيل الموسيقى'}
        title={isPlaying ? 'كتم الموسيقى' : 'تشغيل الموسيقى'}
      >
        {/* Animated antique vinyl / disc */}
        <div className="relative w-6 h-6 flex items-center justify-center">
          <Disc 
            className={`w-5 h-5 text-[#d4c5a9] transition-transform duration-1000 ${
              isPlaying ? 'animate-spin' : 'opacity-80'
            }`} 
            style={{ animationDuration: '4s' }}
          />
          {isPlaying && (
            <span className="absolute w-1.5 h-1.5 rounded-full bg-[#8b1a1a] animate-ping" />
          )}
        </div>

        {/* Sound wave / bars icon when playing */}
        <div className="flex items-center gap-0.5 h-4 px-1">
          <span 
            className={`w-0.5 bg-[#d4c5a9] rounded-full transition-all duration-300 ${
              isPlaying ? 'h-3.5 animate-pulse' : 'h-1.5 opacity-40'
            }`} 
          />
          <span 
            className={`w-0.5 bg-[#d4c5a9] rounded-full transition-all duration-300 ${
              isPlaying ? 'h-4 animate-pulse' : 'h-2 opacity-40'
            }`}
            style={{ animationDelay: '150ms' }}
          />
          <span 
            className={`w-0.5 bg-[#d4c5a9] rounded-full transition-all duration-300 ${
              isPlaying ? 'h-2.5 animate-pulse' : 'h-1 opacity-40'
            }`}
            style={{ animationDelay: '300ms' }}
          />
        </div>

        {/* Mute/unmute indicator */}
        <span className="text-[#d4c5a9] text-xs">
          {isPlaying ? (
            <Volume2 className="w-3.5 h-3.5 opacity-85" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 opacity-50" />
          )}
        </span>

        {/* Subtle glowing ring on play */}
        {isPlaying && (
          <span className="absolute -inset-0.5 rounded-full border border-[#d4c5a9]/30 blur-[1px] pointer-events-none" />
        )}
      </button>
    </div>
  );
};
