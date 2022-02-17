import { ILongStatsItem } from './apiInterfaces';
import { IAggregatedWord, ICurrentUserState } from './apiInterfaces';

export interface IScoreProps {
  score: number;
  isSoundOn: boolean;
  setIsSoundOn: () => void;
}

export interface ICircularTimerProps {
  setIsTimeEnd: () => void;
  isTimePaused: boolean;
  setIsTimePaused: () => void;
  isTimeEnd: boolean;
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
  isSoundOn: boolean;
  isTimeEnd: boolean;
  isTimePaused: boolean;
  setIsWordPlaying: () => void;
  buttonState: ICurrentGameBlockState;
  setButtonState: (newState: Partial<ICurrentGameBlockState>) => void;
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

export interface ICurrentGameBlockState {
  correctAnswerInARow: number;
  currentLevel: number;
  answer: boolean;
  word: IWordData | null;
  wordIndex: number;
  currentLevelAnswerCount: number;
  score: number;
  correctAnswerCounter: number;
  gameState: IGameStatistic;
  words: IWordData[];
}

export interface ILongStatProps {
  data: ILongStatsItem[];
}
export interface ICardItemDifProps {
  wordItem: IAggregatedWord;
  user: ICurrentUserState;
  dispatch: (word: IAggregatedWord) => void;
}

export interface ICardItemDifPropsWithDelete extends ICardItemDifProps {
  deleteDispatch: (word: IAggregatedWord) => void;
}

export type SetWordsCBType = (data: IWordData[]) => void;
export type SetGameLevelCB = (level: number) => void;
