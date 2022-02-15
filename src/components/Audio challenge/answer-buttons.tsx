import { Box, Button, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import React, { ReactElement } from 'react';
import { SinglWord } from '../interfaces/textbookI';
// import EndGameView from '../Sprint/EndGameView';
import CardAudio from '../Textbook/card-audio';
import AnswerProcessing from './answer-processing';
import BoxAfterAnswer from './box-after-answer';
import Circular from './circular-progress';
import FillAnswerButtons from './fill-answer-buttons';

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
    return data[(count / 5)].audio;
  }
}

function Word(data: Array<SinglWord>, count: number) {
  if (data.length !== 0) {
    return data[(count / 5)].word;
  }
}

export default function AnswerVariant(data: Array<SinglWord>) {
  const [progress, setProgress] = React.useState(0);
  const [buttonName, setbuttonName] = React.useState('Я не знаю');
  const [component, setComponent] = React.useState<ReactElement>();
  const { ...allWords } = data;
  return (
    <>
      {Circular(progress)}
      <Box
        sx={{
          margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}
      >
        <Box className="game-box" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {component}
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '40px' }}>
            {CardAudio(AudioUrl(data, progress) as string, '60px', style, true)}
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
            setbuttonName('Следующее слово');
            const rightAnswer = allWords[progress / 5].wordTranslate;
            AnswerProcessing(button, rightAnswer);
            setComponent(BoxAfterAnswer(allWords[progress / 5].image));
          })}
        >
          <Button variant="outlined" className="variant">Outlined</Button>
          <Button variant="outlined" className="variant">Outlined</Button>
          <Button variant="outlined" className="variant">Outlined</Button>
          <Button variant="outlined" className="variant">Outlined</Button>
        </Stack>
        <Button
          variant="contained"
          sx={{ marginBottom: '20px' }}
          onClick={(() => {
            setbuttonName('Я не знаю');
            setProgress(progress + 5);
            FillAnswerButtons(data, progress + 5);
            setComponent(undefined);
            document.querySelector('.game-box-text')?.classList.add('hidden');
            if (progress === 100) {
              setProgress(0);
              // EndGameView();
            }
          })}
        >
          {buttonName}
        </Button>
      </Box>
    </>
  );
}
