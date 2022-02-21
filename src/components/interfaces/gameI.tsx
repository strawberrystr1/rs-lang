import { IGameStatistic, IWordData } from '../../interfaces/interfaces';

export interface GameInterface {
    correctAnswerInARow: number;
    answer: boolean;
    correctAnswerCounter: number;
    words: IWordData[];
    gameState: IGameStatistic;
  }
