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

export interface ISprintAnswerButtons {
  setCorrectAnswerCounter: () => void;
  setCorrectAnswersInARow: (count: number) => void;
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