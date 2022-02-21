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
  const wordGroup = +(params.group as string);
  const wordPage = params.page;
  const { user } = useSelector((state: RootState) => state);
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
      if (wordGroup >= 0) {
        getAllAggregatedWords(user, {
          filter: `{"$and":[{"group":${wordGroup}}]}`,
          wordsPerPage: '600',
        }).then((result) => {
          let filtered = result[0].paginatedResults;
          let pageReducer = 1;
          if (location.pathname.includes('textbook')) {
            filtered = result[0].paginatedResults.filter((item) => !item.userWord?.optional.learned && item.page === +(wordPage as string) && !item.userWord?.optional.deleted);
          }
          while (filtered.length < 20) {
            if ((+(wordPage as string) - pageReducer) < 0) break;
            // eslint-disable-next-line
            filtered = filtered.concat(result[0].paginatedResults.filter((item) => !item.userWord?.optional.learned && item.page === (+(wordPage as string) - pageReducer) && !item.userWord?.optional.deleted));
            filtered = filtered.slice(0, 20);
            pageReducer += 1;
          }
          if (filtered.length > 20) {
            filtered = filtered.slice(0, 20);
          }
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
      } else {
        getAllAggregatedWords(user, {
          filter: '{"$and":[{"userWord.difficulty": "hard"}]}',
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
