import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {
  Button, CardMedia, Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import DeleteIcon from '@mui/icons-material/Delete';
import { SinglWord } from '../interfaces/textbookI';
import CorrectText from './right-card-text';
import CardAudio from './card-audio';
import { IAggregatedWord, ICurrentUserState } from '../../interfaces/apiInterfaces';
import { LearnDispatchCB, AddWordDispatchCB } from '../../interfaces/interfaces';
import { checkUserWordExists } from '../../utils/gameUtils';
import CircularProgressLabel from './circular-progress';

const Style = styled(Typography)`
    text-align: end;
    margin-top: -18px;
    margin-bottom: -20px;
`;

export default function SingleCard(
  wordCard: SinglWord | IAggregatedWord,
  user: ICurrentUserState,
  learnToggleDispatch: LearnDispatchCB,
  addWordDispatch: AddWordDispatchCB,
  deleteDispatch: AddWordDispatchCB,
  difficultyDispatch: LearnDispatchCB,
) {
  const {
    word, transcription, wordTranslate, image, textMeaning,
    textMeaningTranslate, textExample, textExampleTranslate, audio,
    audioMeaning, audioExample,
  } = wordCard;

  const isLearned = (wordCard as IAggregatedWord).userWord?.optional.learned;
  const isProgressFull = (wordCard as IAggregatedWord).userWord?.optional.progress >= 4;
  const isDifficult = (wordCard as IAggregatedWord).userWord?.difficulty === 'hard';
  const progress = (wordCard as IAggregatedWord).userWord?.optional.progress || 0;

  const wrongProgress = (wordCard as IAggregatedWord).userWord?.optional.backProgress || 0;
  const correctProgress = (wordCard as IAggregatedWord).userWord?.optional.directProgress || 0;

  let cardClass = 'card-content';
  if (isLearned) cardClass += ' learned';
  if (isDifficult) cardClass += ' difficult';

  let btnClass = 'diff-btn';
  if (isLearned) btnClass += ' disabled';

  const { name } = user;
  const toggleLearnWord = (e: React.MouseEvent) => {
    if (name) {
      // eslint-disable-next-line
      checkUserWordExists((wordCard as IAggregatedWord)._id, user.id, user.token)
        .then((res) => {
          const wordDate = (new Date()).getDate() * ((new Date()).getMonth() + 1);
          const lastProgress = (wordCard as IAggregatedWord).userWord?.optional.progress || 0;
          const lastBackProgress = (wordCard as IAggregatedWord).userWord?.optional.backProgress || 0;
          const lastDirectProgress = (wordCard as IAggregatedWord).userWord?.optional.directProgress || 0;
          const aggregatedWord: IAggregatedWord = {
            ...(wordCard as IAggregatedWord),
            userWord: {
              difficulty: 'simple',
              optional: {
                learned: false,
                progress: lastProgress,
                new: false,
                // eslint-disable-next-line
                wordId: (wordCard as IAggregatedWord)._id,
                wordDate,
                learnDate: 0,
                deleted: false,
                backProgress: lastBackProgress,
                directProgress: lastDirectProgress,
              },
            },
          };
          const card = ((e.target as HTMLElement).closest('.card-content') as HTMLElement);
          const difBtn = (card.querySelector('.diff-btn') as HTMLButtonElement);
          difBtn.classList.remove('disabled');
          if (card.classList.contains('learned')) difBtn.disabled = true;
          card.classList.toggle('learned');
          const type = card.classList.contains('learned') ? 'learnTrue' : 'learnFalse';
          if (type === 'learnFalse') {
            difBtn.disabled = false;
          } else {
            difBtn.disabled = true;
          }
          if (!res) {
            addWordDispatch(aggregatedWord);
            setTimeout(() => {
              learnToggleDispatch(aggregatedWord, type);
            }, 1000);
          } else {
            learnToggleDispatch(aggregatedWord, type);
          }
        });
    }
  };

  const toggleDifficulty = (e: React.MouseEvent) => {
    if (name) {
      // eslint-disable-next-line
      checkUserWordExists((wordCard as IAggregatedWord)._id, user.id, user.token)
        .then((res) => {
          const wordDate = (new Date()).getDate() * ((new Date()).getMonth() + 1);
          const lastProgress = (wordCard as IAggregatedWord).userWord?.optional.progress || 0;
          const lastBackProgress = (wordCard as IAggregatedWord).userWord?.optional.backProgress || 0;
          const lastDirectProgress = (wordCard as IAggregatedWord).userWord?.optional.directProgress || 0;
          const aggregatedWord: IAggregatedWord = {
            ...(wordCard as IAggregatedWord),
            userWord: {
              difficulty: 'simple',
              optional: {
                learned: false,
                progress: lastProgress,
                new: false,
                // eslint-disable-next-line
                wordId: (wordCard as IAggregatedWord)._id,
                wordDate,
                learnDate: 0,
                deleted: false,
                backProgress: lastBackProgress,
                directProgress: lastDirectProgress,
              },
            },
          };
          const card = ((e.target as HTMLElement).closest('.card-content') as HTMLElement);
          const type = card.classList.contains('difficult') ? 'removeDif' : 'addDif';
          card.classList.toggle('difficult');
          if (!res) {
            addWordDispatch(aggregatedWord);
            setTimeout(() => {
              difficultyDispatch(aggregatedWord, type);
            }, 1000);
          } else {
            difficultyDispatch(aggregatedWord, type);
          }
        });
    }
  };

  const deleteWord = (e: React.MouseEvent) => {
    // eslint-disable-next-line
    checkUserWordExists((wordCard as IAggregatedWord)._id, user.id, user.token)
      .then((res) => {
        const wordDate = (new Date()).getDate() * ((new Date()).getMonth() + 1);
        const aggregatedWord: IAggregatedWord = {
          ...(wordCard as IAggregatedWord),
          userWord: {
            difficulty: 'simple',
            optional: {
              learned: false,
              progress: 0,
              new: false,
              // eslint-disable-next-line
                wordId: (wordCard as IAggregatedWord)._id || wordCard.id,
              wordDate,
              learnDate: 0,
              deleted: true,
              backProgress: 0,
              directProgress: 0,
            },
          },
        };
        if (!res) {
          addWordDispatch(aggregatedWord);
          setTimeout(() => {
            deleteDispatch(aggregatedWord);
          }, 1000);
        } else {
          deleteDispatch(aggregatedWord);
        }
        ((e.target as HTMLElement).closest('.card-item') as HTMLElement).remove();
      });
  };

  return (
    <Card sx={{ width: 600, display: 'flex' }}>
      <CardMedia
        sx={{ maxWidth: 200 }}
        component="img"
        height="100%"
        image={`https://react-rslang-str.herokuapp.com/${image}`}
        alt="wordPicture"
      />
      <div className={cardClass}>
        <div className="progress-block">
          <div className="btn-wrapper">
            <Tooltip title="Количество правильных ответов за все время">
              <div className="correct-block">{correctProgress}</div>
            </Tooltip>
            <Tooltip title="Количество неправильных ответов за все время">
              <div className="incorrect-block">{wrongProgress}</div>
            </Tooltip>
          </div>
          <CircularProgressLabel value={progress} />
        </div>
        <div className="card-head">
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {word[0].toUpperCase()}
              {word.slice(1)}
              {' '}
              {` ${transcription}`}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: 16 }}>
              {wordTranslate}
            </Typography>
          </CardContent>
          {CardAudio(audio, '3rem')}
        </div>
        <div className="word-mean">
          <div className="word-mean-text">
            <CorrectText
              data={textMeaning}
              type={1}
            />
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {textMeaningTranslate}
              <br />
            </Typography>
          </div>
          <Style>{CardAudio(audioMeaning, '2rem')}</Style>
        </div>
        <br />
        <div className="word-translate">
          <div className="word-translate-text">
            <CorrectText
              data={textExample}
              type={1}
            />
            <Typography sx={{ fontSize: 14 }} color="text.secondary">
              {textExampleTranslate}
              <br />
            </Typography>
          </div>
          <Style>{CardAudio(audioExample, '2rem')}</Style>
        </div>
        {
          name
            && (
              <CardActions>
                <Button variant="contained" startIcon={<DeleteIcon />} onClick={deleteWord}>
                  Удалить
                </Button>
                <Button variant="contained" color="error" onClick={toggleDifficulty} className={btnClass}>
                  Сложное
                </Button>
                <Button variant="contained" color="success" onClick={toggleLearnWord} disabled={isProgressFull}>
                  Изучить
                </Button>
              </CardActions>
            )
        }
      </div>
    </Card>
  );
}
