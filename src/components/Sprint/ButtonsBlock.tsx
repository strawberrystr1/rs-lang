import { Button } from '@mui/material';
import React, { ReactElement } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ISprintAnswerButtons } from '../../interfaces/interfaces';
import { checkCurrentLevelAnswers, setCurrentGameLevel, upgradeScore } from '../../utils/gameUtils';

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
  } = props;

  console.log(answer);

  const handleWrongBtn = () => {
    if (!answer) {
      setCorrectAnswersInARow(correctAnswerInARow + 1);
      setCorrectAnswerCounter();
      setState('correctAnswers', word.id);
      setScore(upgradeScore(correctAnswerInARow));
    } else {
      setCorrectAnswersInARow(0);
      setCurrentGameLevel(0, setCurrentLevel);
      setCurrentLevelAnswerCount(0);
      setState('wrongAnswers', word.id);
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
      setCorrectAnswersInARow(correctAnswerInARow + 1);
      setCorrectAnswerCounter();
      setState('correctAnswers', word.id);
      setScore(upgradeScore(correctAnswerInARow));
    } else {
      setCorrectAnswersInARow(0);
      setCurrentGameLevel(0, setCurrentLevel);
      setCurrentLevelAnswerCount(0);
      setState('wrongAnswers', word.id);
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
          onClick={handleWrongBtn}
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
          onClick={handleRightBtn}
        >
          Верно
        </Button>
      </div>
      <div className="sprint__arrows">
        <Button disableRipple>
          <ArrowBackIcon fontSize="large" />
        </Button>
        <Button disableRipple>
          <ArrowForwardIcon fontSize="large" />
        </Button>
      </div>
    </>
  );
}
