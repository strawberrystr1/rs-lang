/* eslint-disable react/destructuring-assignment */
/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { IUserCreateWordRequest, IUserUpdateWordRequest } from '../../interfaces/apiInterfaces';
import { RootState } from '../../redux/store';
import { getStatistic, updateStatistic } from '../../redux/userState/statisticSlice';
import { addUserWord, updateUserWord } from '../../redux/userState/wordsSlice';
import { checkWord, compareStatistic, updateWord } from '../../utils/gameUtils';
import { SinglWord } from '../interfaces/textbookI';
import EndGameView from '../Sprint/EndGameView';
import AnswerProcessing from './answer-processing';
import GameAudio from './audio';
import BoxAfterAnswer from './box-after-answer';
import Circular from './circular-progress';
import FillAnswerButtons from './fill-answer-buttons';
import { gameData } from './game-page';

const style = {
  color: '#1976d2',
  width: '60px',
  height: '60px',
  '&:hover': {
    backgroundColor: 'darkgrey',
  },
};

function AudioUrl(data: Array<SinglWord>, count: number) {
  if (data.length !== 0) {
    if (data[Math.ceil(count / (100 / data.length))].audio !== undefined) {
      return data[Math.ceil(count / (100 / data.length))].audio;
    }
  }
}

function Word(data: Array<SinglWord>, count: number) {
  if (data.length !== 0) {
    // eslint-disable-next-line max-len
    return `${data[Math.ceil(count / (100 / data.length))].word} [${data[Math.ceil(count / (100 / data.length))].wordTranslate}]`;
  }
}

export function ResetData() {
  gameData.answer = false;
  gameData.correctAnswerCounter = 0;
  gameData.correctAnswerInARow = 0;
  gameData.gameState.correctWords = [];
  gameData.gameState.wrongWords = [];
  gameData.gameState.bestInARow = 0;
  gameData.words = [];
}

export default function AnswerVariant(data: Array<SinglWord>) {
  const [isMute, setIsMute] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [buttonName, setbuttonName] = React.useState('Я не знаю');
  const [component, setComponent] = React.useState<ReactElement>();
  const [endGame, setEndGame] = React.useState(false);
  const [inArrow, setinArrow] = React.useState(0);
  const [isRightAnswer, setrightAnswer] = React.useState(true);
  const { ...allWords } = data;
  const { user, userStatistic } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  function KeyboardEvent(button: HTMLButtonElement) {
    if (Math.ceil(progress / (100 / (data.length))) === data.length - 1) {
      setbuttonName('Конец');
    } else setbuttonName('Следующее слово');
    const rightAnswer = allWords[Math.ceil(progress / (100 / (data.length)))].wordTranslate;
    const arrow = AnswerProcessing(button, rightAnswer, allWords[Math.ceil(progress / (100 / (data.length)))], isMute);
    setrightAnswer(arrow);
    if (arrow && arrow === isRightAnswer)setinArrow(inArrow + 1);
    gameData.correctAnswerInARow = inArrow;
    setComponent(BoxAfterAnswer(allWords[Math.ceil(progress / (100 / (data.length)))].image));
  }

  function EnterKey(button: HTMLButtonElement) {
    dispatch(getStatistic({ userId: user.id, token: user.token }));
    if (button.textContent === 'Я не знаю') {
      gameData.gameState.wrongWords.push(allWords[Math.ceil(progress / (100 / (data.length)))]);
      gameData.words.push(allWords[Math.ceil(progress / (100 / (data.length)))]);
      setComponent(BoxAfterAnswer(allWords[Math.ceil(progress / (100 / (data.length)))].image));
      if (Math.ceil(progress / (100 / (data.length))) === data.length - 1) {
        console.log('ss');
        setbuttonName('Конец');
        return;
      }
      setbuttonName('Следующее слово');
      return;
    }
    setbuttonName('Я не знаю');
    if (Math.ceil(progress / (100 / (data.length))) === data.length - 1) {
      setEndGame(true);
      return;
    }
    setProgress(progress + (100 / (data.length)));
    FillAnswerButtons(data, Math.ceil(progress / (100 / (data.length))) + 1);
    setComponent(undefined);
    document.querySelector('.game-box-text')?.classList.add('hidden');
  }

  function keyHandler(event: KeyboardEvent) {
    const buttons = document.querySelectorAll<HTMLButtonElement>('.variant');
    const nextButton = document.querySelector('.next-button') as HTMLButtonElement;
    nextButton.addEventListener('keyup', (e) => {
      e.preventDefault();
    });
    if (event.key === '1') {
      if (buttons[0].disabled === true) return;
      KeyboardEvent(buttons[0]);
    }
    if (event.key === '2') {
      if (buttons[0].disabled === true) return;
      KeyboardEvent(buttons[1]);
    }
    if (event.key === '3') {
      if (buttons[0].disabled === true) return;
      KeyboardEvent(buttons[2]);
    }
    if (event.key === '4') {
      if (buttons[0].disabled === true) return;
      KeyboardEvent(buttons[3]);
    }
    if (event.key === 'Enter') {
      EnterKey(nextButton);
    }
  }
  useEffect(() => {
    window.addEventListener('keydown', (e) => {
      e.preventDefault();
    });
    window.addEventListener('keyup', keyHandler);
    return () => window.removeEventListener('keyup', keyHandler);
  }, [allWords]);

  useEffect(() => {
    if (endGame) {
      gameData.correctAnswerInARow = inArrow;
      gameData.gameState.bestInARow = inArrow;
      const addNewWords = () => {
        checkWord(
          gameData.gameState.correctWords,
          user,
          (value: IUserCreateWordRequest) => dispatch(addUserWord(value)),
        );
        checkWord(
          gameData.gameState.wrongWords,
          user,
          (value: IUserCreateWordRequest) => dispatch(addUserWord(value)),
        );
        updateWord(
          gameData.gameState.correctWords,
          'correct',
          (value: IUserUpdateWordRequest) => dispatch(updateUserWord(value)),
          user,
        );
        updateWord(
          gameData.gameState.wrongWords,
          'wrong',
          (value: IUserUpdateWordRequest) => dispatch(updateUserWord(value)),
          user,
        );
      };
      if (user.name) {
        addNewWords();
        const newOrNot = userStatistic.optional.short.audio?.allAnswers === 0;
        compareStatistic(userStatistic, gameData, user, newOrNot, 'audio')
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
  }, [endGame]);
  if (allWords.length === 0) {
    return (
      <div className="hidden" />
    );
  }
  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {Circular(progress, data.length)}
        <VolumeOffIcon
          sx={{
            marginTop: '64px', marginRight: '45px', borderRadius: '50%', fontSize: '30px', opacity: '0.5',
          }}
          onClick={((e) => {
            const icon = e.target as HTMLElement;
            const svg = icon.closest('svg') as SVGElement;
            svg.classList.toggle('mute');
            if (svg.classList.contains('mute')) setIsMute(true);
            else setIsMute(false);
          })}
        />
      </Box>
      <Box
        sx={{
          margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}
      >
        <Box className="game-box" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {component}
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '40px' }}>
            {GameAudio(AudioUrl(data, progress) as string, '60px', style)}
            <Typography variant="h4" className="game-box-text hidden">
              {Word(data, progress)}
            </Typography>
          </Box>
        </Box>
        <Stack
          spacing={2}
          direction="row"
          sx={{ marginTop: '80px', marginBottom: '40px' }}
          onClick={((event) => {
            const button = event.target as HTMLButtonElement;
            if (button.childNodes.length === 4) return;
            KeyboardEvent(button);
          })}
        >
          <Button variant="outlined" className="variant button-background">Outlined</Button>
          <Button variant="outlined" className="variant button-background">Outlined</Button>
          <Button variant="outlined" className="variant button-background">Outlined</Button>
          <Button variant="outlined" className="variant button-background">Outlined</Button>
        </Stack>
        <Button
          className="next-button"
          variant="contained"
          sx={{ marginBottom: '20px' }}
          onClick={((event) => {
            const button = event.target as HTMLButtonElement;
            EnterKey(button);
          })}
        >
          {buttonName}
        </Button>
        {
        endGame
          && (
          <EndGameView
            state={gameData.gameState}
            wrong={gameData.gameState.wrongWords.length}
            right={gameData.correctAnswerCounter}
            inARow={inArrow}
            words={gameData.words}
            audioGame="/game/audio"
          />
          )
      }
      </Box>
    </>
  );
}
