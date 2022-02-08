import { Container, Card, Button } from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import CircularTimer from './CircularTimer';
import ScoreBlock from './ScoreBlock';
import CirclesBlock from './CirclesBlock';
import ButtonsBlock from './ButtonsBlock';
import BirdsAndWordBlock from './BirdsAndWordBlock';
import EndGameView from './EndGameView';
import { getRandomSetOfWords } from '../../utils/gameUtils';
import { ISprintStartGame, IWordData } from '../../interfaces/interfaces';

export default function SprintGame(props: ISprintStartGame): ReactElement {
  const [correctAnswerInARow, setCorrectAnswersInARow] = useState(0);
  const [currentLevelAnswerCount, setCurrentLevelAnswerCount] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isWordPlaying, setIsWordPlaying] = useState(false);
  const [score, setStore] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [correctAnswerCounter, setCorrectAnswerCounter] = useState(0);
  const [isTimeEnd, setIsTimeEnd] = useState(false);
  const [words, setWords] = useState<IWordData[]>([]);

  const { group } = props;

  useEffect(() => {
    if (!isTimeEnd) {
      getRandomSetOfWords(group, (data) => setWords(data));
    }
    return () => {
      setIsTimeEnd(true);
    };
  }, []);

  console.log(
    setCorrectAnswersInARow,
    setCurrentLevel,
    setCurrentLevelAnswerCount,
    setStore,
    correctAnswerCounter,
    setCorrectAnswerCounter,
    isTimeEnd,
    words,
    setWords,
  );

  const wordsArray = words.map((word) => word.word);
  const translateArray = words.map((word) => word.wordTranslate);
  console.log('wordsArray: ', wordsArray, translateArray);

  const { word, wordTranslate } = {
    word: 'alcohol',
    wordTranslate: 'алкоголь',
  };

  return (
    <Container
      className="spring-bg"
      maxWidth={false}
      sx={{
        width: '100%',
        height: 'calc(100vh - 120px)',
      }}
    >
      <Container
        maxWidth="xl"
        className="main sprint"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <CircularTimer setIsTimeEnd={() => setIsTimeEnd(true)} />
        <ScoreBlock
          score={score}
          isSoundOn={isSoundOn}
          setIsSoundOn={() => setIsSoundOn((prev) => !prev)}
        />
        <Card
          className="sprint__card"
          elevation={12}
          sx={{
            maxWidth: 600,
            background: 'rgba(90, 206, 109, 1)',
            borderRadius: '10px',
            position: 'relative',
          }}
        >
          <Button
            size="small"
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              borderRadius: '50%',
              minWidth: '40px',
              maxWidth: '40px',
              height: '40px',
            }}
            onClick={() => setIsWordPlaying((prev) => !prev)}
          >
            { isWordPlaying
              ? <PauseCircleOutlineIcon fontSize="large" />
              : <PlayCircleOutlineIcon fontSize="large" />}
          </Button>
          <CirclesBlock currentLevelAnswerCount={currentLevelAnswerCount} currentLevel={currentLevel} />
          <BirdsAndWordBlock
            correctAnswerInARow={correctAnswerInARow}
            word={word}
            wordTranslate={wordTranslate}
          />
          <ButtonsBlock
            setCorrectAnswerCounter={() => setCorrectAnswerCounter((prev) => prev + 1)}
            setCorrectAnswersInARow={(count: number) => setCorrectAnswersInARow(count)}
          />
        </Card>
      </Container>
      {
        isTimeEnd
          && <EndGameView wrong={5} right={24} inARow={12} />
      }
    </Container>
  );
}