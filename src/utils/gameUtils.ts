import axios from 'axios';
import { BASE_URL } from '../constants/apiConstants';
import {
  DispatchCBCheckWord,
  DispatchCBUpdateWord,
  IAggregatedWord,
  ICurrentUserState, IQueryParamsForWords, ISprintStats, ITodayStats, ITodayWordsResponse, IUserStatistic,
} from '../interfaces/apiInterfaces';
import {
  ICurrentGameBlockState,
  IWordData,
  // SetGameLevelCB,
  SetWordsCBType,
} from '../interfaces/interfaces';

export function convertTimeToPercent(value: number) {
  const fullPercents = 100;
  const secondsInMinute = 60;
  return Math.round(value * (fullPercents / secondsInMinute));
}

export async function getRandomSetOfWords(
  group: number,
  setWordsCallback: SetWordsCBType,
  page: number,
) {
  const response = await axios.get<IWordData[]>(`${BASE_URL}words`, {
    params: {
      group,
      page,
    },
  });
  setWordsCallback(response.data);
}

function trueOrFalse() {
  if (Math.random() > 0.5) {
    return true;
  }
  return false;
}

export function getWordForGame(words: IWordData[]): [string, string, boolean, number] {
  if (words.length === 0) return ['', '', false, 0];
  const randomWord = Math.floor(Math.random() * words.length);
  const answer = trueOrFalse();
  if (answer) {
    return [words[randomWord].word, words[randomWord].wordTranslate, answer, randomWord];
  }
  let randomTranslate = Math.floor(Math.random() * words.length);
  if (randomWord === randomTranslate) {
    randomTranslate = Math.floor(Math.random() * words.length);
  }
  return [words[randomWord].word, words[randomTranslate].wordTranslate, answer, randomWord];
}

export function setCurrentGameLevel(
  correctAnswerInARow: number,
) {
  if (correctAnswerInARow >= 11) {
    return 4;
  }
  if (correctAnswerInARow >= 7) {
    return 3;
  }
  if (correctAnswerInARow >= 3) {
    return 2;
  }
  return 1;
}

export function checkCurrentLevelAnswers(count: number) {
  if (count < 4) {
    switch (count) {
      case 1: {
        return 1;
      }
      case 2: {
        return 2;
      }
      case 3: {
        return 3;
      }
      default: {
        return 0;
      }
    }
  } else {
    switch (count % 4) {
      case 1: {
        return 1;
      }
      case 2: {
        return 2;
      }
      case 3: {
        return 3;
      }
      case 0: {
        return 1;
      }
      default: {
        return null;
      }
    }
  }
}

export function upgradeScore(correctAnswerInARow: number) {
  if (correctAnswerInARow <= 4) {
    return 10;
  } if (correctAnswerInARow > 4 && correctAnswerInARow <= 8) {
    return 20;
  } if (correctAnswerInARow > 8 && correctAnswerInARow <= 12) {
    return 40;
  }
  return 80;
}

export function howMuchCirclesFilled(
  correctAnswerInARow: number,
  currentLevel: number,
  currentLevelAnswerCount: number,
): string[] {
  if (correctAnswerInARow >= 12) {
    return ['filled', 'filled', 'filled'];
  }
  if (correctAnswerInARow % 4 === 0) {
    return ['', '', ''];
  }
  if (currentLevel === 4 || currentLevelAnswerCount === 3) {
    return ['filled', 'filled', 'filled'];
  }
  if (currentLevelAnswerCount === 1) {
    return ['filled', '', ''];
  }
  return ['filled', 'filled', ''];
}

export function checkState(key: string, value: IWordData, array: IWordData[]) {
  if (key === 'wrongWords') {
    const idx = array.some((item) => item.id === value.id);
    if (!idx) {
      return true;
    }
  } else {
    const idx = array.some((item) => item.id === value.id);
    if (!idx) {
      return true;
    }
  }
  return false;
}

export function spliceWords(idx: number, array: IWordData[]) {
  const newArr = array.slice();
  newArr.splice(idx, 1);
  return newArr;
}

export async function getAllAggregatedWords(user: Partial<ICurrentUserState>, query: IQueryParamsForWords) {
  const response = await axios.get<ITodayWordsResponse[]>(
    `https://react-rslang-str.herokuapp.com/users/${user.id}/aggregatedWords`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
      params: {
        ...query,
      },
    },
  );
  return response.data;
}

export async function getAggregatedWord(word: IWordData | IAggregatedWord, user: Partial<ICurrentUserState>) {
  const response = await axios.get<IAggregatedWord[]>(
    // eslint-disable-next-line
    `https://react-rslang-str.herokuapp.com/users/${user.id}/aggregatedWords/${word.id || (word as IAggregatedWord)._id}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  );
  return response.data;
}
// filter: `{"$or":[{"userWord.difficulty": "simple"}, {"userWord.difficulty":"hard"}]}`,

export async function compareStatistic(
  storageStats: IUserStatistic,
  currentStats: ICurrentGameBlockState,
  user: Partial<ICurrentUserState>,
  isNewUser: boolean,
  gameType: string,
) {
  const todayDate = (new Date()).getDate() * ((new Date()).getMonth() + 1);
  const bestInARow = (storageStats.optional.short[gameType as keyof ITodayStats] as ISprintStats).inARow > currentStats.gameState.bestInARow
    ? (storageStats.optional.short[gameType as keyof ITodayStats] as ISprintStats).inARow
    : currentStats.gameState.bestInARow;
  const correctAll = (storageStats.optional.short[gameType as keyof ITodayStats] as ISprintStats).correctAnswers
    + currentStats.gameState.correctWords.length;
  const allWords = (storageStats.optional.short[gameType as keyof ITodayStats] as ISprintStats).allAnswers
    + currentStats.gameState.correctWords.length
    + currentStats.gameState.wrongWords.length;

  const newWordsResponse = await getAllAggregatedWords(user, {
    filter: `{"$and":[{"userWord.optional.wordDate":${todayDate}}]}`,
  });
  let newWords = newWordsResponse[0].totalCount[0]?.count || 0;
  if (isNewUser) {
    newWords = currentStats.gameState.correctWords.length
      + currentStats.gameState.wrongWords.length;
  }
  const learnedWords = await getAllAggregatedWords(user, {
    filter: '{"$and":[{"userWord.optional.learned":true}]}',
  });

  const indOfLastLongStat = storageStats.optional.long.stat.findIndex((item) => item.date === `${(new Date()).getDate()}.${(new Date()).getMonth() + 1}`);
  const newLongStat = [...storageStats.optional.long.stat];
  if (indOfLastLongStat >= 0) {
    const newLongStats = {
      date: `${(new Date()).getDate()}.${(new Date()).getMonth() + 1}`,
      newWords,
      learnedWords: learnedWords[0].totalCount[0]?.count || 0,
    };
    newLongStat.splice(indOfLastLongStat, 1, newLongStats);
  }

  const newState: IUserStatistic = {
    learnedWords: learnedWords[0].totalCount[0]?.count || 0,
    optional: {
      short: {
        lastDate: Date.now(),
        sprint: {
          inARow: bestInARow,
          correctAnswers: correctAll,
          allAnswers: allWords,
          percents: Math.floor((correctAll * 100) / allWords) || 0,
          newWords,
        },
      },
      long: {
        stat: newLongStat,
      },
    },
  };
  return newState;
}

export async function checkUserWordExists(wordId: string, userId: string, token: string) {
  const response = await fetch(`https://react-rslang-str.herokuapp.com/users/${userId}/words/${wordId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  switch (response.status) {
    case 404:
      return false;
    default:
      return true;
  }
}

export async function checkWordProgress(word: IWordData, user: Partial<ICurrentUserState>) {
  const wordFromStorage = await getAggregatedWord(word, user);
  return wordFromStorage;
}

export function checkWord(array: IWordData[], user: Partial<ICurrentUserState>, dispatch: DispatchCBCheckWord) {
  array.forEach((word) => {
    checkUserWordExists(word.id, (user.id as string), (user.token as string))
      .then((result) => {
        if (!result) {
          const wordDate = (new Date()).getDate() * ((new Date()).getMonth() + 1);
          dispatch({
            user,
            word,
            wordOptions: {
              difficulty: 'simple',
              optional: {
                learned: false,
                progress: 0,
                new: false,
                wordId: word.id,
                wordDate,
                learnDate: 0,
                deleted: false,
              },
            },
          });
        }
      });
  });
}

export function updateWord(
  array: IWordData[],
  type: string,
  dispatch: DispatchCBUpdateWord,
  user: Partial<ICurrentUserState>,
) {
  array.forEach((word) => {
    checkWordProgress(word, user)
      .then((result) => {
        if (result[0].userWord) {
          if (type === 'correct') {
            dispatch({ word: result[0], user });
          } else {
            const resetProgress: IAggregatedWord = {
              ...result[0],
              userWord: {
                ...result[0].userWord,
                optional: {
                  ...result[0].userWord.optional,
                  progress: 0,
                  learned: false,
                  learnDate: 0,
                },
              },
            };
            dispatch({ word: resetProgress, user });
          }
        }
      });
  });
}
