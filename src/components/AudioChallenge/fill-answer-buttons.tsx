import getRandom from './random';
import { SinglWord } from '../interfaces/textbookI';

export default function FillAnswerButtons(data: Array<SinglWord>, count: number) {
  const answers: Array<string> = [];
  const rightAnswerPosition = getRandom(0, 3);
  const buttons = document.querySelectorAll<HTMLButtonElement>('.variant');
  if (buttons.length === 0) return;
  if (count === 100) return;
  for (let index = 0; index < buttons.length; index += 1) {
    buttons[index].classList.remove('wrong');
    buttons[index].classList.remove('right');
    buttons[index].classList.remove('disabled');
    buttons[index].disabled = false;
  }
  while (answers.length <= 4) {
    const random = getRandom(0, 19);
    if (answers.length === rightAnswerPosition) {
      answers.push(data[count / 5].wordTranslate);
    }
    if (!answers.includes(data[random].wordTranslate)) {
      answers.push(data[random].wordTranslate);
    }
  }
  for (let index = 0; index < buttons.length; index += 1) {
    buttons[index].innerHTML = `${(index + 1).toString()}. ${answers[index]}`;
  }
}
