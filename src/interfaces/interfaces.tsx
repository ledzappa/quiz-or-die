export interface Player {
  name: string;
  description: string;
  perks: {
    freedomOfChoice: number;
    doubleUp: number;
  };
  isPlayersTurn: boolean;
  points: number;
}

export interface Category {
  id: number;
  identifier: string;
  name: string;
}

export interface Perk {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Question {
  question: string;
  answer: string;
  tags: string;
  category?: string;
}

export interface RoundAndRoundTheme {
  description: string;
  randomizeLetter: boolean;
}
