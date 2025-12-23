
import React, { useState, useEffect, useRef } from 'react';
import { Music, Music2 } from 'lucide-react';

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
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={togglePlay}
        className={`p-4 rounded-full shadow-lg transition-all duration-300 ${isPlaying ? 'bg-red-600 text-white scale-110' : 'bg-white/20 text-white backdrop-blur-md'
          }`}
      >
        {isPlaying ? <Music className="w-6 h-6 animate-pulse" /> : <Music2 className="w-6 h-6" />}
      </button>
      <audio
        ref={audioRef}
        loop
        src="/assets/music.mp3"
      />
    </div>
  );
};

export default AudioPlayer;
