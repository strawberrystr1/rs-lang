import { Button } from '@mui/material';
import React, { ReactElement, useRef } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ISprintAnswerButtons } from '../../interfaces/interfaces';
import { checkCurrentLevelAnswers, setCurrentGameLevel, upgradeScore } from '../../utils/gameUtils';
import correctSound from '../../assets/correct.mp3';
import incorrectSound from '../../assets/incorrect.mp3';

export default function ButtonsBlock(props: ISprintAnswerButtons): ReactElement {
  const {
    setCorrectAnswersInARow,
    setCorrectAnswerCounter,
    setCurrentLevelAnswerCount,
    answer,
    correctAnswerInARow,
    currentLevel,
    setCurrentLevel,
    setScore,
    setState,
    word,
    setWords,
    wordIndex,
    isTimePaused,
    isSoundOn,
  } = props;

  const soundRight = useRef<HTMLAudioElement>(null);
  const soundWrong = useRef<HTMLAudioElement>(null);

  console.log(word);

  const resetSound = () => {
    (soundWrong.current as HTMLAudioElement).pause();
    (soundWrong.current as HTMLAudioElement).currentTime = 0;
    (soundRight.current as HTMLAudioElement).pause();
    (soundRight.current as HTMLAudioElement).currentTime = 0;
  };

  const handleCorrectAnswer = () => {
    setCorrectAnswersInARow(correctAnswerInARow + 1);
    setCorrectAnswerCounter();
    setState('correctWords', word);
    setScore(upgradeScore(correctAnswerInARow));
    resetSound();
    if (isSoundOn) (soundRight.current as HTMLAudioElement).play();
  };

  const handleWrongAnswer = () => {
    setCorrectAnswersInARow(0);
    setCurrentGameLevel(0, setCurrentLevel);
    setCurrentLevelAnswerCount(0);
    setState('wrongWords', word);
    resetSound();
    if (isSoundOn) (soundWrong.current as HTMLAudioElement).play();
  };

  const handleWrongBtn = () => {
    if (!answer) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
    if (currentLevel < 4) setCurrentGameLevel(correctAnswerInARow, setCurrentLevel);
    const answerCounter = checkCurrentLevelAnswers(correctAnswerInARow);
    if (answerCounter && currentLevel < 4) {
      setCurrentLevelAnswerCount(answerCounter);
    }
    setWords(wordIndex);
  };

  const handleRightBtn = () => {
    if (answer) {
      handleCorrectAnswer();
    } else {
      handleWrongAnswer();
    }
    if (currentLevel < 4) setCurrentGameLevel(correctAnswerInARow, setCurrentLevel);
    const answerCounter = checkCurrentLevelAnswers(correctAnswerInARow);
    if (answerCounter && currentLevel < 4) {
      setCurrentLevelAnswerCount(answerCounter);
    }
    setWords(wordIndex);
  };

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
          onClick={() => { if (!isTimePaused) handleRightBtn(); }}
        >
          Верно
        </Button>
      </div>
      <div className="sprint__arrows">
        <Button disableRipple>
          <ArrowBackIcon fontSize="large" onClick={() => { if (!isTimePaused) handleWrongBtn(); }} />
        </Button>
        <Button disableRipple>
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
