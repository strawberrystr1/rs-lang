import React from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import { SinglWord } from '../interfaces/textbookI';
import CorrectText from './right-card-text';
import CardAudio from './card-audio';

const Style = styled(Typography)`
    text-align: end;
    margin-top: -18px;
    margin-bottom: -20px;
`;
export default function SingleCard(wordCard: SinglWord) {
  const {
    id, word, transcription, wordTranslate, image, textMeaning,
    textMeaningTranslate, textExample, textExampleTranslate, audio,
    audioMeaning, audioExample,
  } = wordCard;

  return (
    <CardContent key={id} sx={{ width: 300, dispaly: 'flex' }}>
      <Typography variant="h5" color="text.secondary" gutterBottom>
        {word}
        {` ${transcription}`}
        {CardAudio(audio, '3rem')}
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
      <Style>{CardAudio(audioMeaning, '2rem')}</Style>
      <Typography>
        <br />
        {textMeaningTranslate}
        <br />
      </Typography>
      <CorrectText
        data={textExample}
        type={0}
      />
      <Style>{CardAudio(audioExample, '2rem')}</Style>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        {textExampleTranslate}
      </Typography>
    </CardContent>
  );
}
