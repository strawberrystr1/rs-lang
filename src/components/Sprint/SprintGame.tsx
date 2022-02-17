import {
  Container, Card, Button, CircularProgress,
} from '@mui/material';
import React, {
  ReactElement, useEffect, useRef, useState,
} from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CircularTimer from './CircularTimer';
import ScoreBlock from './ScoreBlock';
import CirclesBlock from './CirclesBlock';
import ButtonsBlock from './ButtonsBlock';
import BirdsAndWordBlock from './BirdsAndWordBlock';
import EndGameView from './EndGameView';
import {
  checkWord,
  compareStatistic, getRandomSetOfWords, getWordForGame, updateWord,
} from '../../utils/gameUtils';
import { ICurrentGameBlockState } from '../../interfaces/interfaces';
import { RootState } from '../../redux/store';
import { getStatistic, updateStatistic } from '../../redux/userState/statisticSlice';
import {
  addUserWord, getAllWords, updateUserWord,
} from '../../redux/userState/wordsSlice';
import { ILongStatsItem, IUserCreateWordRequest, IUserUpdateWordRequest } from '../../interfaces/apiInterfaces';

export default function SprintGame(): ReactElement {
  const [isWordPlaying, setIsWordPlaying] = useState(false);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isTimeEnd, setIsTimeEnd] = useState(false);
  const [isTimePaused, setIsTimePaused] = useState(false);
  const [pageDown, setPageDown] = useState(0);
  const wordSound = useRef<HTMLAudioElement>(null);
  const [singleWord, setSingleWord] = useState<string>('');
  const [wordTranslate, setWordTranslate] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  const [buttonState, setButtonState] = useState<ICurrentGameBlockState>({
    correctAnswerInARow: 0,
    currentLevel: 0,
    answer: false,
    word: null,
    wordIndex: 0,
    currentLevelAnswerCount: 0,
    score: 0,
    correctAnswerCounter: 0,
    gameState: {
      correctWords: [],
      wrongWords: [],
      bestInARow: 0,
    },
    words: [],
  });

  const params = useParams();
  const group: number = +(params.group as string);
  const page: number = +(params.page as string);

  const { user, userStatistic } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.name) {
      dispatch(getStatistic({ userId: user.id, token: user.token }));
      dispatch(getAllWords(user));
      const lastDate = new Date(userStatistic.optional.short.lastDate).getDate();
      const todayDate = (new Date()).getDate();

      if ((lastDate !== todayDate)) {
        const date = `${(new Date()).getDate()}.${(new Date()).getMonth() + 1}`;
        const newWords = (userStatistic.optional.short.sprint?.newWords || 0)
          + (userStatistic.optional.short.audio?.newWords || 0);
        const longAddition: ILongStatsItem = {
          date,
          newWords,
          learnedWords: 0,
        };
        dispatch(updateStatistic({
          userId: user.id,
          token: user.token,
          optional: {
            learnedWords: 0,
            optional: {
              short: {
                lastDate: Date.now(),
                sprint: {
                  newWords: 0,
                  inARow: 0,
                  percents: 0,
                  correctAnswers: 0,
                  allAnswers: 0,
                },
              },
              long: {
                stat: [...userStatistic.optional.long.stat, longAddition],
              },
            },
          },
        }));
      }
    }
  }, []);

  useEffect(() => {
    if (page - pageDown < -1) {
      setIsTimeEnd(true);
    }
    if (!isTimeEnd) {
      if (buttonState.words.length === 0) {
        setIsLoading(true);
        setPageDown((prev) => prev + 1);
        getRandomSetOfWords(group, (data) => {
          setButtonState((prev) => ({
            ...prev,
            words: data,
          }));
          setIsLoading(false);
        }, page - pageDown);
      }
      const variables = getWordForGame(buttonState.words);
      const [wordFF, wordTranslateFF, answerFF, wordIndexFF] = variables;
      setSingleWord(wordFF);
      setWordTranslate(wordTranslateFF);
      setButtonState((prev) => ({
        ...prev,
        word: buttonState.words[wordIndexFF],
        answer: answerFF,
        wordIndex: wordIndexFF,
      }));
    }
  }, [buttonState.words]);

  const addNewWords = () => {
    checkWord(
      buttonState.gameState.correctWords,
      user,
      (value: IUserCreateWordRequest) => dispatch(addUserWord(value)),
    );
    checkWord(
      buttonState.gameState.wrongWords,
      user,
      (value: IUserCreateWordRequest) => dispatch(addUserWord(value)),
    );
    updateWord(
      buttonState.gameState.correctWords,
      'correct',
      (value: IUserUpdateWordRequest) => dispatch(updateUserWord(value)),
      user,
    );
    updateWord(
      buttonState.gameState.wrongWords,
      'wrong',
      (value: IUserUpdateWordRequest) => dispatch(updateUserWord(value)),
      user,
    );
  };

  useEffect(() => {
    if (isTimeEnd) {
      if (user.name) {
        addNewWords();
        const newOrNot = userStatistic.optional.short.sprint?.allAnswers === 0;
        compareStatistic(userStatistic, buttonState, user, newOrNot, 'sprint')
          .then((result) => {
            dispatch(updateStatistic({
              userId: user.id,
              token: user.token,
              optional: {
                ...result,
              },
            }));
          })
          .catch((err) => console.log(err));
      }
    }
  }, [isTimeEnd]);

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
        {
          (!isLoading || buttonState.score > 0)
           && (
           <CircularTimer
             setIsTimeEnd={() => setIsTimeEnd(true)}
             isTimePaused={isTimePaused}
             setIsTimePaused={() => setIsTimePaused((prev) => !prev)}
             isTimeEnd={isTimeEnd}
           />
           )
        }
        <ScoreBlock
          score={buttonState.score}
          isSoundOn={isSoundOn}
          setIsSoundOn={() => setIsSoundOn((prev) => !prev)}
        />
        <Card
          className="sprint__card"
          elevation={12}
          sx={{
            maxWidth: 600,
            width: '40%',
            height: '60%',
            padding: '20px',
            background: 'rgba(90, 206, 109, 1)',
            borderRadius: '10px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
          tabIndex={0}
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

            { buttonState.words?.[buttonState.wordIndex]?.audio && (
            <audio ref={wordSound} src={`https://react-rslang-str.herokuapp.com/${buttonState.words[buttonState.wordIndex].audio}`}>
              <track kind="captions" />
            </audio>
            )}
          </Button>
          <CirclesBlock
            currentLevelAnswerCount={buttonState.currentLevelAnswerCount}
            currentLevel={buttonState.currentLevel}
            correctAnswerInARow={buttonState.correctAnswerInARow}
          />
          {
            isLoading
              ? <CircularProgress />
              : (
                <BirdsAndWordBlock
                  correctAnswerInARow={buttonState.correctAnswerInARow}
                  word={singleWord}
                  wordTranslate={wordTranslate}
                />
              )
          }
          <ButtonsBlock
            buttonState={buttonState}
            setButtonState={(newState) => setButtonState((prev) => ({
              ...prev,
              ...newState,
            }))}
            isTimePaused={isTimePaused}
            isSoundOn={isSoundOn}
            setIsWordPlaying={() => setIsWordPlaying(false)}
            isTimeEnd={isTimeEnd}
          />
        </Card>
      </Container>
      {
        isTimeEnd
          && (
          <EndGameView
            state={buttonState.gameState}
            wrong={buttonState.gameState.wrongWords.length}
            right={buttonState.correctAnswerCounter}
            inARow={buttonState.gameState.bestInARow}
            words={buttonState.words}
          />
          )
      }
    </Container>

  );
}
