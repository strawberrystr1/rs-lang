import {
  Container, Card, Button,
} from '@mui/material';
import React, {
  ReactElement, useEffect, useRef, useState,
} from 'react';
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
    wrongWords: [],
    correctWords: [],
    bestInARow: 0,
  });
  const [isTimePaused, setIsTimePaused] = useState(false);
  const [pageDown, setPageDown] = useState(0);
  const wordSound = useRef<HTMLAudioElement>(null);
  const [word, setWord] = useState<string>('');
  const [wordTranslate, setWordTranslate] = useState<string>('');
  const [answer, setAnswer] = useState<boolean>(false);
  const [wordIndex, setWordIndex] = useState<number>(0);

  const params = useParams();
  const group: number = +(params.group as string);
  const page: number = +(params.page as string);

  useEffect(() => {
    if (page - pageDown < -1) {
      setIsTimeEnd(true);
    }
    if (!isTimeEnd) {
      if (words.length === 0) {
        setPageDown((prev) => prev + 1);
        getRandomSetOfWords(group, (data) => setWords(data), page - pageDown);
      }
      const wordsArray: string[] = words.map((wordItem) => wordItem.word);
      const translateArray: string[] = words.map((wordItem) => wordItem.wordTranslate);
      const variables = getWordForGame(wordsArray, translateArray);
      const [wordFF, wordTranslateFF, answerFF, wordIndexFF] = variables;
      setWord(wordFF);
      setWordTranslate(wordTranslateFF);
      setAnswer(answerFF);
      setWordIndex(wordIndexFF);
    }
  }, [words]);

  const toggleSound = () => {
    if (!isWordPlaying) {
      (wordSound.current as HTMLAudioElement).play();
      setIsWordPlaying(true);
      (wordSound.current as HTMLAudioElement).onended = () => {
        setIsWordPlaying(false);
      };
    } else {
      (wordSound.current as HTMLAudioElement).pause();
      (wordSound.current as HTMLAudioElement).currentTime = 0;
      setIsWordPlaying(false);
    }
  };

  const changeState = (key: string, value: IWordData) => setState((prev) => {
    const bestRow = correctAnswerInARow > prev.bestInARow ? correctAnswerInARow : prev.bestInARow;
    if (key === 'wrongWords') {
      const idx = state.wrongWords.some((item) => item.id === value.id);
      if (!idx) {
        return {
          wrongWords: [...prev.wrongWords, value],
          correctWords: [...prev.correctWords],
          bestInARow: bestRow,
        };
      }
    } else {
      const idx = state.correctWords.some((item) => item.id === value.id);
      if (!idx) {
        return {
          wrongWords: [...prev.wrongWords],
          correctWords: [...prev.correctWords, value],
          bestInARow: bestRow,
        };
      }
    }
    return prev;
  });

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
        <CircularTimer
          setIsTimeEnd={() => setIsTimeEnd(true)}
          isTimePaused={isTimePaused}
          setIsTimePaused={() => setIsTimePaused((prev) => !prev)}
        />
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
            onClick={() => {
              setIsWordPlaying((prev) => !prev);
              toggleSound();
            }}
          >
            { isWordPlaying
              ? <PauseCircleOutlineIcon fontSize="large" />
              : <PlayCircleOutlineIcon fontSize="large" />}

            { words?.[wordIndex]?.audio && (
            <audio ref={wordSound} src={`https://react-rslang-str.herokuapp.com/${words[wordIndex].audio}`}>
              <track kind="captions" />
            </audio>
            )}
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
              setIsWordPlaying(false);
              return newArr;
            })}
            isTimePaused={isTimePaused}
            wordIndex={wordIndex}
            setState={changeState}
            word={words[wordIndex]}
            currentLevel={currentLevel}
            setCurrentLevelAnswerCount={(count: number) => setCurrentLevelAnswerCount(count)}
            setCurrentLevel={setCurrentLevel}
            correctAnswerInARow={correctAnswerInARow}
            answer={answer}
            isSoundOn={isSoundOn}
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
            wrong={state.wrongWords.length}
            right={correctAnswerCounter}
            inARow={state.bestInARow}
            words={words}
          />
          )
      }
    </Container>

  );
}
