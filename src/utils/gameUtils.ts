import axios from 'axios';
import { BASE_URL } from '../constants/apiConstants';
import {
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
  setTimeout(() => setWordsCallback(response.data), 3000);
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
  // setCurrentLevel: SetGameLevelCB
) {
  if (correctAnswerInARow >= 11) {
    // setCurrentLevel(4);
    return 4;
  }
  // else
  if (correctAnswerInARow >= 7) {
    // setCurrentLevel(3);
    return 3;
  }
  // else
  if (correctAnswerInARow >= 3) {
    // setCurrentLevel(2);
    return 2;
  }
  // else {
  // setCurrentLevel(1);
  return 1;
  // }
}

export function checkCurrentLevelAnswers(count: number) {
  if (count < 4) {
    switch (count) {
      case 0: {
        return 1;
      }
      case 1: {
        return 2;
      }
      case 2: {
        return 3;
      }
      default: {
        return 0;
      }
    }
  } else {
    switch (count % 4) {
      case 1: {
        return 2;
      }
      case 2: {
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
  if (correctAnswerInARow < 4) {
    return 10;
  } if (correctAnswerInARow >= 4 && correctAnswerInARow < 8) {
    return 20;
  } if (correctAnswerInARow >= 8 && correctAnswerInARow < 12) {
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
