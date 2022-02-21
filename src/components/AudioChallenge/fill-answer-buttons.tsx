import getRandom from './random';
import { SinglWord } from '../interfaces/textbookI';

export default function FillAnswerButtons(data: Array<SinglWord>, count: number) {
  const answers: Array<string> = [];
  let rightAnswerPosition = getRandom(0, 3);
  if (data.length <= 4) {
    rightAnswerPosition = getRandom(0, data.length - 1);
  }
  const buttons = document.querySelectorAll<HTMLButtonElement>('.variant');
  if (buttons.length === 0) return;
  if (count === data.length) return;
  for (let index = 0; index < buttons.length; index += 1) {
    buttons[index].classList.remove('wrong');
    buttons[index].classList.remove('right');
    buttons[index].classList.remove('disabled');
    buttons[index].classList.add('button-background');
    buttons[index].disabled = false;
  }
  while (answers.length <= 4) {
    const random = getRandom(0, data.length - 1);
    if (answers.length === rightAnswerPosition) {
      answers.push(data[count].wordTranslate);
    }
    if (!answers.includes(data[random].wordTranslate)) {
      answers.push(data[random].wordTranslate);
    }
  }
  for (let index = 0; index < buttons.length; index += 1) {
    buttons[index].innerHTML = `${(index + 1).toString()}. ${answers[index]}`;
  }
}
