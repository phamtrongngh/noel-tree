
import React from 'react';
import { ChristmasWish } from '../types';

interface WishModalProps {
  wish: ChristmasWish | null;
  onClose: () => void;
}

const WishModal: React.FC<WishModalProps> = ({ wish, onClose }) => {
  if (!wish) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300 cursor-pointer"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#a81616] rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-[#d4af37]/30 transform animate-in zoom-in slide-in-from-bottom-10 duration-500 flex flex-col items-center p-6 md:p-8 text-white group cursor-default"
      >
        {/* Gold Border Accent */}
        <div className="absolute inset-2 border border-[#d4af37]/20 rounded-[1.5rem] pointer-events-none" />

        {/* Illustrations from assets (assuming 2x2 grid) */}
        <div className="absolute top-4 left-4 w-20 h-20 overflow-hidden rounded-full border-2 border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-500">
          <img
            src="/assets/christmas_assets.png"
            className="w-[200%] max-w-none absolute"
            style={{ left: '0%', top: '0%' }}
          />
        </div>

        <div className="absolute top-4 right-4 w-20 h-20 overflow-hidden rounded-full border-2 border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-500">
          <img
            src="/assets/christmas_assets.png"
            className="w-[200%] max-w-none absolute"
            style={{ left: '-100%', top: '0%' }}
          />
        </div>

        <div className="absolute bottom-4 left-4 w-20 h-20 overflow-hidden rounded-full border-2 border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-500">
          <img
            src="/assets/christmas_assets.png"
            className="w-[200%] max-w-none absolute"
            style={{ left: '0%', top: '-100%' }}
          />
        </div>

        <div className="absolute bottom-4 right-4 w-20 h-20 overflow-hidden rounded-full border-2 border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-500">
          <img
            src="/assets/christmas_assets.png"
            className="w-[200%] max-w-none absolute"
            style={{ left: '-100%', top: '-100%' }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center">
          <p className="text-[#d4af37] font-medium tracking-widest uppercase text-xs md:text-sm mb-2 opacity-80">We wish you a</p>
          <h2 className="text-4xl md:text-6xl font-merry text-[#f8e4a0] mb-6 md:mb-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] leading-tight">Merry Christmas</h2>

          <div className="w-16 h-1 w-[#d4af37]/40 mb-8 rounded-full" />

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/10 max-w-sm mb-8 relative">
            <span className="text-4xl absolute -top-4 -left-2 text-[#d4af37] font-serif">"</span>
            <p className="text-xl font-serif-body italic leading-relaxed text-center px-4">
              {wish.message}
            </p>
            <span className="text-4xl absolute -bottom-8 -right-2 text-[#d4af37] font-serif">"</span>
          </div>

          <div className="text-center mb-10">
            <p className="text-[#d4af37] font-medium tracking-wide mb-1 opacity-70">Thân gửi đến</p>
            <h3 className="text-3xl font-christmas text-[#f8e4a0]">{wish.to}</h3>
          </div>

          <button
            onClick={onClose}
            className="group relative px-10 py-3 bg-[#d4af37] hover:bg-[#f8e4a0] text-[#701010] font-bold rounded-full transition-all duration-300 shadow-[0_5px_15px_rgba(0,0,0,0.3)] active:scale-95"
          >
            Đóng
            <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping opacity-0 group-hover:opacity-100" />
          </button>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 -rotate-45 translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 -rotate-45 -translate-x-16 translate-y-16" />
      </div>
    </div>
  );
};

export default WishModal;
