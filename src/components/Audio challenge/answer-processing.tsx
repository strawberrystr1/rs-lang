export default function AnswerProcessing(button: HTMLButtonElement, rightAnswer: string) {
  const parent = button.closest('div') as HTMLDivElement;
  const buttons = parent.childNodes as unknown as Array<HTMLButtonElement>;
  if (button.textContent !== rightAnswer) {
    button.classList.add('wrong');
  } else {
    button.classList.add('right');
  }
  for (let index = 0; index < buttons.length; index += 1) {
    if (buttons[index].classList.contains('wrong') || buttons[index].classList.contains('right')) {
      buttons[index].disabled = true;
    }
    if (!buttons[index].classList.contains('wrong') && !buttons[index].classList.contains('right')) {
      buttons[index].disabled = true;
      buttons[index].classList.add('disabled');
    }
  }
}
