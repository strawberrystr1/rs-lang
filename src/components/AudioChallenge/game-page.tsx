import { Box, Container, CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { SinglWord } from '../interfaces/textbookI';
import AnswerVariant, { ResetData } from './answer-buttons';
import FillAnswerButtons from './fill-answer-buttons';
import { GameInterface } from '../interfaces/gameI';

export const gameData: GameInterface = {
  correctAnswerInARow: 0,
  answer: false,
  correctAnswerCounter: 0,
  gameState: {
    correctWords: [],
    wrongWords: [],
    bestInARow: 0,
  },
  words: [],
};

export default function GamePage() {
  const [response, setResponse] = React.useState<Array<SinglWord>>([]);
  const [open, setOpen] = React.useState(true);
  const params = useParams();
  const wordGroup = params.group;
  const wordPage = params.page;
  const apiUrl = `https://react-rslang-str.herokuapp.com/words?group=${wordGroup}&page=${wordPage}`;
  useEffect(() => {
    axios.get(apiUrl).then((resp) => resp.data).then((data:Array<SinglWord>) => {
      setResponse(data);
      setOpen(false);
      ResetData();
      FillAnswerButtons(data, 0);
    });
  }, [apiUrl]);
  return (
    <Container
      maxWidth={false}
      className="main-game"
      sx={{
        height: 'calc(100vh - 120px)',
        display: 'table',
      }}
    >
      <Box>
        {AnswerVariant(response)}
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: 10001 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
}
