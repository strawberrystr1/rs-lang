import { Button } from '@mui/material';
import React, { ReactElement, useEffect, useRef } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ISprintAnswerButtons } from '../../interfaces/interfaces';
import {
  checkCurrentLevelAnswers, checkState, setCurrentGameLevel, spliceWords, upgradeScore,
} from '../../utils/gameUtils';
import correctSound from '../../assets/correct.mp3';
import incorrectSound from '../../assets/incorrect.mp3';

export default function ButtonsBlock(props: ISprintAnswerButtons): ReactElement {
  const {
    isTimePaused,
    isSoundOn,
    buttonState,
    setButtonState,
  } = props;

  const soundRight = useRef<HTMLAudioElement>(null);
  const soundWrong = useRef<HTMLAudioElement>(null);

  let {
    correctAnswerInARow,
    currentLevel,
    correctAnswerCounter,
    score,
    currentLevelAnswerCount,
    words,
  } = buttonState;

  let {
    bestInARow,
  } = buttonState.gameState;

  const {
    correctWords,
    wrongWords,
  } = buttonState.gameState;

  const {
    answer,
    wordIndex,
  } = buttonState;

  const resetSound = () => {
    (soundWrong.current as HTMLAudioElement).pause();
    (soundWrong.current as HTMLAudioElement).currentTime = 0;
    (soundRight.current as HTMLAudioElement).pause();
    (soundRight.current as HTMLAudioElement).currentTime = 0;
  };

  const handleCorrectAnswer = () => {
    correctAnswerInARow += 1;
    correctAnswerCounter += 1;
    if (checkState('correctWords', words[wordIndex], correctWords)) {
      correctWords.push(words[wordIndex]);
    }
    score += upgradeScore(correctAnswerInARow);
    resetSound();
    if (isSoundOn) (soundRight.current as HTMLAudioElement).play();
  };

  const handleWrongAnswer = () => {
    correctAnswerInARow = 0;
    currentLevel = setCurrentGameLevel(0);
    currentLevelAnswerCount = 0;
    if (checkState('wrongWords', words[wordIndex], wrongWords)) {
      wrongWords.push(words[wordIndex]);
    }
    resetSound();
    if (isSoundOn) (soundWrong.current as HTMLAudioElement).play();
  };

  const handleWrongBtn = () => {
    if (!answer) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
    if (currentLevel < 4) currentLevel = setCurrentGameLevel(correctAnswerInARow);
    const answerCounter = checkCurrentLevelAnswers(correctAnswerInARow);
    if (answerCounter && currentLevel < 4) {
      currentLevelAnswerCount = answerCounter;
    }
    if (words.length === 0) {
      return;
    }
    words = spliceWords(wordIndex, words);
    bestInARow = correctAnswerInARow > bestInARow
      ? correctAnswerInARow
      : bestInARow;
    setButtonState({
      correctAnswerInARow,
      currentLevel,
      currentLevelAnswerCount,
      score,
      correctAnswerCounter,
      words,
      gameState: {
        correctWords,
        wrongWords,
        bestInARow,
      },
    });
  };

  const handleRightBtn = () => {
    if (answer) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
    if (currentLevel < 4) currentLevel = setCurrentGameLevel(correctAnswerInARow);
    const answerCounter = checkCurrentLevelAnswers(correctAnswerInARow);
    if (answerCounter && currentLevel < 4) {
      currentLevelAnswerCount = answerCounter;
    }
    if (words.length === 0) {
      return;
    }
    words = spliceWords(wordIndex, words);
    bestInARow = correctAnswerInARow > bestInARow
      ? correctAnswerInARow
      : bestInARow;
    setButtonState({
      correctAnswerInARow,
      currentLevel,
      currentLevelAnswerCount,
      score,
      correctAnswerCounter,
      words,
      gameState: {
        correctWords,
        wrongWords,
        bestInARow,
      },
    });
  };

  const handleArrow = (e: KeyboardEvent) => {
    if (!words[wordIndex]) return;
    if (e.code === 'ArrowRight') {
      if (!isTimePaused) handleRightBtn();
    } else if (e.code === 'ArrowLeft') {
      if (!isTimePaused) handleWrongBtn();
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleArrow);
    return () => window.removeEventListener('keyup', handleArrow);
  }, [answer, wordIndex]);

  return (
    <>
      <div className="sprint__buttons">
        <Button
          variant="contained"
          color="error"
          sx={{
            width: '180px',
            color: 'white',
            height: '50px',
            fontSize: '18px',
          }}
          disabled={isTimePaused}
          onClick={() => { if (!isTimePaused) handleWrongBtn(); }}
        >
          Не верно
        </Button>
        <Button
          variant="contained"
          color="success"
          sx={{
            width: '180px',
            color: 'white',
            height: '50px',
            fontSize: '18px',
          }}
          disabled={isTimePaused}
          onClick={() => { if (!isTimePaused) handleRightBtn(); }}
        >
          Верно
        </Button>
      </div>
      <div className="sprint__arrows">
        <Button disableRipple disabled={isTimePaused}>
          <ArrowBackIcon fontSize="large" onClick={() => { if (!isTimePaused) handleWrongBtn(); }} />
        </Button>
        <Button disableRipple disabled={isTimePaused}>
          <ArrowForwardIcon fontSize="large" onClick={() => { if (!isTimePaused) handleRightBtn(); }} />
        </Button>
      </div>
      <audio ref={soundRight} src={correctSound}>
        <track kind="captions" />
      </audio>
      <audio ref={soundWrong} src={incorrectSound}>
        <track kind="captions" />
      </audio>
    </>
  );
}
