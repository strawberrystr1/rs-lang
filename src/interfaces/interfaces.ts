export interface IScoreProps {
  score: number;
  isSoundOn: boolean;
  setIsSoundOn: () => void;
}

export interface ICircularTimerProps {
  setIsTimeEnd: () => void;
  isTimePaused: boolean;
  setIsTimePaused: () => void;
}

export interface ICirclesBlockProps {
  currentLevelAnswerCount: number;
  currentLevel: number;
  correctAnswerInARow: number;
}

export interface IGameStatistic {
  wrongWords: IWordData[];
  correctWords: IWordData[];
  bestInARow: number;
}

export interface ISprintAnswerButtons {
  setCorrectAnswerCounter: () => void;
  setCorrectAnswersInARow: (count: number) => void;
  setCurrentLevel: (level: number) => void;
  setCurrentLevelAnswerCount: (count: number) => void;
  answer: boolean;
  correctAnswerInARow: number;
  currentLevel: number;
  setScore: (add: number) => void;
  setState: (key: string, value: IWordData) => void;
  word: IWordData;
  setWords: (idx: number) => void;
  wordIndex: number;
  isSoundOn: boolean;
  isTimePaused: boolean;
}

export interface ISprinGameWord {
  correctAnswerInARow?: number;
  word: string;
  wordTranslate: string;
  audio?: string; 
}

export interface IAfterGameCircle {
  value: number;
}

export interface IAfterGameWordsStat {
  inARow: number;
  right: number;
  wrong: number;
  state: IGameStatistic;
  words: IWordData[];
}

export interface IWordData {
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  id: string;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
}

export interface ISprintStartGame {
  group: number;
}

export type SetWordsCBType = (data: IWordData[]) => void;
export type SetGameLevelCB = (level: number) => void;
