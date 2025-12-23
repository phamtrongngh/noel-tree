
export interface ChristmasWish {
  id: number;
  from: string;
  to: string;
  message: string;
  color: string;
}

export interface CardProps {
  wish: ChristmasWish;
  position: [number, number, number];
  rotation: [number, number, number];
  onClick: (wish: ChristmasWish) => void;
}
