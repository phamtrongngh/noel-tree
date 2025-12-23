
export interface ChristmasWish {
  id: number;
  to: string;
  message: string;
  color: string;
  isRead?: boolean;
}

export interface CardProps {
  wish: ChristmasWish;
  position: [number, number, number];
  rotation: [number, number, number];
  onClick: (wish: ChristmasWish) => void;
  isRead?: boolean;
}
