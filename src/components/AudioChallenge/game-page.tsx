/* eslint-disable react-hooks/rules-of-hooks */
import { Box, Container, CircularProgress } from '@mui/material';
import { useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { useSelector } from 'react-redux';
import { SinglWord } from '../interfaces/textbookI';
import AnswerVariant, { ResetData } from './answer-buttons';
import FillAnswerButtons from './fill-answer-buttons';
import { GameInterface } from '../interfaces/gameI';
import { RootState } from '../../redux/store';
import { getAllAggregatedWords } from '../../utils/gameUtils';

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
  const location = useLocation();
  const params = useParams();
  const wordGroup = params.group;
  const wordPage = params.page;
  const { user } = useSelector((state: RootState) => state);
  // const dispatch = useDispatch();
  if (!user.name) {
    const apiUrl = `https://react-rslang-str.herokuapp.com/words?group=${wordGroup}&page=${wordPage}`;
    useEffect(() => {
      axios.get(apiUrl).then((resp) => resp.data).then((data:Array<SinglWord>) => {
        setResponse(data);
        setOpen(false);
        ResetData();
        FillAnswerButtons(data, 0);
      });
    }, [apiUrl]);
  }
  useEffect(() => {
    if (user.name) {
      getAllAggregatedWords(user, {
        filter: `{"$and":[{"group":${wordGroup}}, {"page":${wordPage}}]}`,
        wordsPerPage: '20',
      }).then((result) => {
        const filtered = result[0].paginatedResults.filter((item) => !item.userWord?.optional.learned);
        const newData = filtered.map((item) => ({
          audio: item.audio,
          audioExample: item.audioExample,
          audioMeaning: item.audioMeaning,
          group: item.group,
          // eslint-disable-next-line no-underscore-dangle
          id: item._id,
          image: item.image,
          page: item.page,
          textExample: item.textExample,
          textExampleTranslate: item.textExampleTranslate,
          textMeaning: item.textMeaning,
          textMeaningTranslate: item.textMeaningTranslate,
          transcription: item.transcription,
          word: item.word,
          wordTranslate: item.wordTranslate,
        }));
        setResponse(newData);
        setOpen(false);
        ResetData();
        FillAnswerButtons(newData, 0);
      });
    }
  }, [user, wordGroup, wordPage]);
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
