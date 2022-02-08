import axios from 'axios';
import { BASE_URL } from '../constants/apiConstants';
import { IWordData, SetWordsCBType } from '../interfaces/interfaces';

export function convertTimeToPercent(value: number) {
  const fullPercents = 100;
  const secondsInMinute = 60;
  return Math.round(value * (fullPercents / secondsInMinute));
}

export function getRandomSetOfWords(group: number, setWordsCallback: SetWordsCBType) {
  const randomPage = Math.floor(Math.random() * 30);
  axios.get<IWordData[]>(`${BASE_URL}words`, {
    params: {
      group,
      page: randomPage,
    },
  }).then((response) => response.data)
    .then((data) => setWordsCallback(data));
}
