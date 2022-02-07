export interface IScoreProps {
  score: number;
  isSoundOn: boolean;
  setIsSoundOn: () => void;
}

export interface ICircularTimerProps {
  setIsTimeEnd: () => void;
}

export interface ICirclesBlockProps {
  currentLevelAnswerCount: number;
  currentLevel: number;
}

export interface ISprinGameWord {
  correctAnswerInARow?: number;
  word: string;
  wordTranslate: string;
}

export interface IAfterGameCircle {
  value: number;
}

export interface IAfterGameWordsStat {
  inARow: number;
  right: number;
  wrong: number;
}
