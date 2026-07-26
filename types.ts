export interface MemoryPhoto {
  id: string;
  url: string;
  title: string;
  date: string;
  caption: string;
  category: 'Special Dates' | 'Cute Moments' | 'Trips & Adventures' | 'Favorites';
  isFavorite?: boolean;
}

export interface LoveNote {
  id: string;
  title: string;
  message: string;
  date?: string;
  icon?: string;
  read?: boolean;
}

export interface QuoteItem {
  id: string;
  quote: string;
  author: string;
  theme: string;
}

export interface ProposalQuestion {
  id: string;
  question: string;
  subtitle: string;
  agreeMessage: string;
}

export interface TrailHeart {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  opacity: number;
  vx: number;
  vy: number;
}
