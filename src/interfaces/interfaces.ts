export interface IScoreProps {
  score: number;
  isSoundOn: boolean;
  setIsSoundOn: () => void;
}

export interface ICircularTimerProps {
  value: number;
  realTime: number;
  isTimePaused: boolean;
  setIsTimePaused: () => void;
  timer: ReturnType<typeof setInterval> | undefined;
  setTimer: (id: ReturnType<typeof setInterval>) => void;
  setTimerLastTime: () => void;
  timerLastTime: number;
}

export interface ICirclesBlockProps {
  currentLevelAnswerCount: number;
  currentLevel: number;
}

export interface IBirdsBlockProps {
  correctAnswerInARow: number;
  word: string;
  wordTranslate: string;
}
