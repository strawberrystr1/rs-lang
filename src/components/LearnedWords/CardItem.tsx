import React, { ReactElement } from 'react';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardMedia } from '@mui/material';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CorrectText from '../Textbook/right-card-text';
import CardAudio from '../Textbook/card-audio';
import { ICardItemDifProps } from '../../interfaces/interfaces';

const Style = styled(Typography)`
    text-align: end;
    margin-top: -18px;
    margin-bottom: -20px;
`;
export default function CardItem(props: ICardItemDifProps): ReactElement {
  const { wordItem } = props;
  const {
    word, transcription, wordTranslate, image, textMeaning,
    textMeaningTranslate, textExample, textExampleTranslate, audio,
    audioMeaning, audioExample,
  } = wordItem;

  return (
    <Card sx={{ width: 600, display: 'flex' }}>
      <CardMedia
        sx={{ maxWidth: 200 }}
        component="img"
        height="100%"
        image={`https://react-rslang-str.herokuapp.com/${image}`}
        alt="wordPicture"
      />
      <div
        className="card-content"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
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
        <CardActions>
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Удалить
          </Button>
        </CardActions>
      </div>
    </Card>
  );
}
