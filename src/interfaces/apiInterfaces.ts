import { IWordData } from './interfaces';

export interface IUserRegistration {
  email: string;
  password: string;
  name: string;
}

export interface IUserRegistrationResponse {
  id: string;
  name: string;
  email: string;
}

export interface IUserSignInParams {
  email: string;
  password: string;
}

export interface IUserLogInSuccess {
  message: string;
  token: string;
  refreshToken: string;
  userId: string;
  name: string;
}

export interface ICurrentUserState {
  id: string;
  name: string;
  token: string;
  refreshToken: string;
  error: null | string;
  loading: boolean;
}

export interface IUserStatistic {
  learnedWords: number;
  id?: string;
  optional: IUserOwnStats;
}

export interface IUserOwnStats {
  short: {
    lastDate: number;
    sprint?: ISprintStats;
  }
}

export interface ISprintStats {
  newWords: number;
  inARow: number;
  percents: number;
  correctAnswers: number;
  allAnswers: number;
}

export interface IUserWord {
  difficulty: string;
  optional: IUserWordOptional;
  id?: string;
  wordId?: string;
}

export interface IUserWordOptional {
  learned: boolean;
  progress: number;
  new: boolean;
  wordId: string;
  wordDate: number;
  learnDate: number;
}
export interface IUserState {
  user: ICurrentUserState;
  userStatistic: IUserStatistic;
  userWords: IUserWord[];
}

export interface IUserStatsRequestOptions {
  userId: string;
  token: string;
  optional?: IUserStatistic;
}

export interface IUserCreateWordRequest {
  user: Partial<ICurrentUserState>;
  word: IWordData;
  wordOptions: IUserWord;
}
export interface IUserUpdateWordRequest {
  word: IAggregatedWord;
  user: Partial<ICurrentUserState>;
}
export interface IAggregatedWord extends IWordData{
  userWord: IUserWord;
  _id: string;
}
export interface ITodayWordsResponse {
  paginatedResults: IAggregatedWord[];
  totalCount: [{
    count: number;
  }];
}

export interface IQueryParamsForWords {
  filter?: string;
  group?: string;
  page?: string;
  wordsPerPage?: string;
}

export type DispatchCBCheckWord= (value: IUserCreateWordRequest) => void;
export type DispatchCBUpdateWord= (value: IUserUpdateWordRequest) => void;
