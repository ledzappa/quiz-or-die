export type Direction = 1 | -1;
export interface Player {
  name: string;
  description: string;
  perks: {
    freedomOfChoice: number;
    doubleUp: number;
    landmine: number;
  };
  isPlayersTurn: boolean;
  isMiniGameWinner: boolean;
  isEliminated: boolean;
  reactionTime: number;
  points: number;
}

export interface Category {
  id: number;
  identifier: string;
  name: string;
  questions: number;
  disabled?: boolean;
}

export interface Perk {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Question {
  id: number | null;
  question: string;
  categoryId: number;
  answer: string;
  tags?: string;
  img?: string;
  category?: string;
  createdAt?: string;
}

export interface Settings {
  pointsToWin: number;
  probRoundAndRound: number;
  probPerk: number;
  probPlayerPerk: number;
  imgBaseUrl: 'https://leds3aws.s3.eu-north-1.amazonaws.com/images/';
}

export interface RoundAndRoundTheme {
  description: string;
  randomizeLetter: boolean;
}
