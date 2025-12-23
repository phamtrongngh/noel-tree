
import React, { useState, useEffect, useRef } from 'react';
import { Music } from 'lucide-react';

const AudioPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Attempt to auto-play on mount
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => {
          console.log("Auto-play blocked by browser. User interaction required.", e);
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play blocked", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <button
        onClick={togglePlay}
        className={`group p-5 rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)] transition-all duration-500 overflow-hidden relative ${isPlaying
          ? 'bg-gradient-to-br from-red-500 to-red-600 text-white scale-110'
          : 'bg-white/10 text-white backdrop-blur-xl border border-white/20'
          }`}
      >
        {/* Glow effect */}
        <div className={`absolute inset-0 bg-white/20 blur-md transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`} />

        <div className="relative z-10 flex items-center justify-center">
          {isPlaying ? (
            <Music className="w-6 h-6 animate-[bounce_2s_infinite]" />
          ) : (
            <div className="relative">
              <Music className="w-6 h-6 opacity-60" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[2px] bg-white/80 rotate-45 rounded-full" />
            </div>
          )}
        </div>
      </button>
      <audio
        ref={audioRef}
        loop
        src="assets/music.mp3"
      />
    </div>
  );
};

export default AudioPlayer;
