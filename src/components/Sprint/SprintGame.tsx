import { Container, Card, Button } from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { useParams } from 'react-router-dom';
import CircularTimer from './CircularTimer';
import ScoreBlock from './ScoreBlock';
import CirclesBlock from './CirclesBlock';
import ButtonsBlock from './ButtonsBlock';
import BirdsAndWordBlock from './BirdsAndWordBlock';
import EndGameView from './EndGameView';
import { getRandomSetOfWords, getWordForGame } from '../../utils/gameUtils';
import { IGameStatistic, IWordData } from '../../interfaces/interfaces';

export default function SprintGame(): ReactElement {
  const [correctAnswerInARow, setCorrectAnswersInARow] = useState(0);
  const [currentLevelAnswerCount, setCurrentLevelAnswerCount] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [isWordPlaying, setIsWordPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [correctAnswerCounter, setCorrectAnswerCounter] = useState(0);
  const [isTimeEnd, setIsTimeEnd] = useState(false);
  const [words, setWords] = useState<IWordData[]>([]);
  const [state, setState] = useState<IGameStatistic>({
    wrongAnswers: new Set<string>(),
    correctAnswers: new Set<string>(),
  });

  const params = useParams();
  const group: number = +(params.group as string);
  const page: number = +(params.page as string);

  useEffect(() => {
    if (!isTimeEnd) {
      getRandomSetOfWords(group, (data) => setWords(data), page);
    }
    return () => {
      setIsTimeEnd(true);
    };
  }, []);

  const [word, setWord] = useState<string>('');
  const [wordTranslate, setWordTranslate] = useState<string>('');
  const [answer, setAnswer] = useState<boolean>(false);
  const [wordIndex, setWordIndex] = useState<number>(0);

  useEffect(() => {
    const wordsArray: string[] = words.map((wordItem) => wordItem.word);
    const translateArray: string[] = words.map((wordItem) => wordItem.wordTranslate);
    const variables = getWordForGame(wordsArray, translateArray);
    const [wordFF, wordTranslateFF, answerFF, wordIndexFF] = variables;
    setWord(wordFF);
    setWordTranslate(wordTranslateFF);
    setAnswer(answerFF);
    setWordIndex(wordIndexFF);
  }, [words]);
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
          <CirclesBlock
            currentLevelAnswerCount={currentLevelAnswerCount}
            currentLevel={currentLevel}
            correctAnswerInARow={correctAnswerInARow}
          />
          <BirdsAndWordBlock
            correctAnswerInARow={correctAnswerInARow}
            word={word}
            wordTranslate={wordTranslate}
          />
          <ButtonsBlock
            setWords={(idx: number) => setWords((prev) => {
              const newArr = prev.slice();
              newArr.splice(idx, 1);
              return newArr;
            })}
            wordIndex={wordIndex}
            setState={(key: string, value: string) => setState((prev) => ({
              ...prev,
              [key]: prev[(key as keyof IGameStatistic)].add(value),
            }))}
            word={words[wordIndex]}
            currentLevel={currentLevel}
            setCurrentLevelAnswerCount={(count: number) => setCurrentLevelAnswerCount(count)}
            setCurrentLevel={setCurrentLevel}
            correctAnswerInARow={correctAnswerInARow}
            answer={answer}
            setScore={(add: number) => setScore((prev) => prev + add)}
            setCorrectAnswerCounter={() => setCorrectAnswerCounter((prev) => prev + 1)}
            setCorrectAnswersInARow={(count: number) => setCorrectAnswersInARow(count)}
          />
        </Card>
      </Container>
      {
        isTimeEnd
          && (
          <EndGameView
            state={state}
            wrong={state.wrongAnswers.size}
            right={correctAnswerCounter}
            inARow={correctAnswerInARow}
            words={words}
          />
          )
      }
    </Container>
  );
}
