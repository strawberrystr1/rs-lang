import { SinglWord } from '../interfaces/textbookI';
import { gameData } from './game-page';
import correctSound from '../../assets/correct.mp3';
import incorrectSound from '../../assets/incorrect.mp3';

function soundForAnswer(audio: string, mute: boolean) {
  if (mute) return;
  const audioN: HTMLAudioElement = new Audio();
  audioN.src = `${audio}`;
  setTimeout(() => {
    audioN.autoplay = true;
    audioN.load();
  }, 300);
}

function designButtons(button: HTMLButtonElement) {
  const parent = button.closest('div') as HTMLDivElement;
  const buttons = parent.childNodes as unknown as Array<HTMLButtonElement>;
  for (let index = 0; index < buttons.length; index += 1) {
    buttons[index].classList.remove('button-background');
    if (buttons[index].classList.contains('wrong') || buttons[index].classList.contains('right')) {
      buttons[index].disabled = true;
    }
    if (!buttons[index].classList.contains('wrong') && !buttons[index].classList.contains('right')) {
      buttons[index].disabled = true;
      buttons[index].classList.add('disabled');
    }
  }
}

// eslint-disable-next-line max-len
export default function AnswerProcessing(button: HTMLButtonElement, rightAnswer: string, word: SinglWord, mute: boolean) {
  if ((button.textContent as string).substr(3, (button.textContent as string).length - 3) !== rightAnswer) {
    button.classList.add('wrong');
    gameData.gameState.wrongWords.push(word);
    gameData.words.push(word);
    designButtons(button);
    soundForAnswer(incorrectSound, mute);
    return false;
  }
  button.classList.add('right');
  gameData.correctAnswerCounter += 1;
  gameData.gameState.correctWords.push(word);
  gameData.words.push(word);
  designButtons(button);
  soundForAnswer(correctSound, mute);
  return true;
}
