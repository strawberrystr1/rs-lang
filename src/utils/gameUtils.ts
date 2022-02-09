import axios from 'axios';
import { BASE_URL } from '../constants/apiConstants';
import { IWordData, SetGameLevelCB, SetWordsCBType } from '../interfaces/interfaces';

export function convertTimeToPercent(value: number) {
  const fullPercents = 100;
  const secondsInMinute = 60;
  return Math.round(value * (fullPercents / secondsInMinute));
}

export function getRandomSetOfWords(
  group: number,
  setWordsCallback: SetWordsCBType,
  page: number,
) {
  axios.get<IWordData[]>(`${BASE_URL}words`, {
    params: {
      group,
      page,
    },
  }).then((response) => response.data)
    .then((data) => setWordsCallback(data));
}

function trueOrFalse() {
  if (Math.random() > 0.5) {
    return true;
  }
  return false;
}

export function getWordForGame(wordsArr: string[], translateArr: string[]): [string, string, boolean, number] {
  const randomWord = Math.floor(Math.random() * wordsArr.length);
  const answer = trueOrFalse();
  if (answer) {
    return [wordsArr[randomWord], translateArr[randomWord], answer, randomWord];
  }
  const randomTranslate = Math.floor(Math.random() * translateArr.length);
  return [wordsArr[randomWord], translateArr[randomTranslate], answer, randomWord];
}

export function setCurrentGameLevel(correctAnswerInARow: number, setCurrentLevel: SetGameLevelCB) {
  if (correctAnswerInARow >= 11) {
    setCurrentLevel(4);
  } else if (correctAnswerInARow >= 7) {
    setCurrentLevel(3);
  } else if (correctAnswerInARow >= 3) {
    setCurrentLevel(2);
  } else {
    setCurrentLevel(1);
  }
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
