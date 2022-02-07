import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconButton, CardMedia } from '@mui/material';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import { SinglWord } from '../interfaces/textbookI';
import CorrectText from './right-card-text';

export default function SingleCard(wordCard: SinglWord) {
  let isPaused = true;
  console.log('aad');
  const {
    id, word, transcription, wordTranslate, image, textMeaning,
    textMeaningTranslate, textExample, textExampleTranslate, audio,
  } = wordCard;

  return (
    <CardContent key={id} sx={{ width: 300, dispaly: 'flex' }}>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        {word}
        {` ${transcription}`}
        <IconButton
          aria-label={isPaused ? 'play' : 'pause'}
          onClick={() => {
            isPaused = !isPaused;
            console.log(isPaused);
            const audioN: HTMLAudioElement = new Audio();
            audioN.src = `https://react-rslang-str.herokuapp.com/${audio}`;
            audioN.play();
          }}
        >
          {isPaused ? (
            <PlayArrowRounded
              sx={{ fontSize: '3rem' }}
            />
          ) : (
            <PauseRounded sx={{ fontSize: '3rem' }} />
          )}
        </IconButton>
      </Typography>
      <Typography variant="h5">
        {wordTranslate}
      </Typography>
      <CardMedia
        component="img"
        height="194"
        image={`https://react-rslang-str.herokuapp.com/${image}`}
        alt="image"
      />
      <CorrectText
        data={textMeaning}
        type={1}
      />
      <Typography>
        <br />
        {textMeaningTranslate}
        <br />
      </Typography>
      <CorrectText
        data={textExample}
        type={0}
      />
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {textExampleTranslate}
      </Typography>
    </CardContent>
  );
}
