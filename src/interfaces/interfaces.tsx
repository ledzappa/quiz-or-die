export interface Player {
  name: String;
  description: String;
  perks: {
    doubleUp: number;
  };
  isPlayersTurn: boolean;
  points: number;
}

export interface Category {
  id: number;
  identifier: string;
  name: String;
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
}

export interface RoundAndRoundTheme {
  description: string;
  randomizeLetter: boolean;
}
