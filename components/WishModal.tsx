
import React from 'react';
import { ChristmasWish } from '../types';
import { X, Gift } from 'lucide-react';

interface WishModalProps {
  wish: ChristmasWish | null;
  onClose: () => void;
}

const WishModal: React.FC<WishModalProps> = ({ wish, onClose }) => {
  if (!wish) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl transform animate-in zoom-in slide-in-from-bottom-10 duration-500"
        style={{ borderTop: `8px solid ${wish.color}` }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>

        <div className="p-8 flex flex-col items-center text-center">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
            style={{ backgroundColor: `${wish.color}20` }}
          >
            <Gift className="w-8 h-8" style={{ color: wish.color }} />
          </div>

          <h3 className="text-xl font-bold text-gray-800 mb-2">Lời chúc từ {wish.from}</h3>

          <div className="my-6 relative">
            <span className="text-5xl absolute -top-4 -left-6 opacity-20 text-gray-400">"</span>
            <p className="text-lg text-gray-700 italic font-christmas leading-relaxed px-4">
              {wish.message}
            </p>
            <span className="text-5xl absolute -bottom-8 -right-4 opacity-20 text-gray-400">"</span>
          </div>

          <button
            onClick={onClose}
            className="mt-8 px-8 py-3 rounded-full text-white font-semibold shadow-lg hover:brightness-110 active:scale-95 transition-all"
            style={{ backgroundColor: wish.color }}
          >
            Đóng
          </button>
        </div>

        <div className="h-2 w-full bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-30" />
      </div>
    </div>
  );
};

export default WishModal;
