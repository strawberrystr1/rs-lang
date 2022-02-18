import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import Card from '@mui/material/Card';
import { useParams } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import { Typography } from '@mui/material';
import SingleCard from './single-card';
import { SinglWord } from '../interfaces/textbookI';
import { RootState } from '../../redux/store';
import { getAllAggregatedWords } from '../../utils/gameUtils';
import { IAggregatedWord, IUserWord } from '../../interfaces/apiInterfaces';
import { addUserWord, updateUserWord } from '../../redux/userState/wordsSlice';
import { updateStatistic } from '../../redux/userState/statisticSlice';

export default function ShowCards() {
  const [response, setResponse] = useState<Array<SinglWord | IAggregatedWord>>([]);
  const [open, setOpen] = React.useState(true);
  const params = useParams();
  const wordGroup = params.group;

  const { user, userStatistic } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  const wordPage = params.page;
  const apiUrlAnonym = `https://react-rslang-str.herokuapp.com/words?group=${wordGroup}&page=${wordPage}`;
  useEffect(() => {
    if (!user.name) {
      axios.get(apiUrlAnonym).then((resp) => resp.data).then((data:Array<SinglWord>) => {
        const sortedData = data.sort((a, b) => a.word.localeCompare(b.word));
        setResponse(sortedData);
        setOpen(false);
      });
    } else {
      getAllAggregatedWords(user, {
        filter: `{"$and":[{"group":${wordGroup}}, {"page": ${wordPage}}]}`,
        wordsPerPage: '20',
      }).then((res) => {
        const data = res[0].paginatedResults.sort((a, b) => a.word.localeCompare(b.word))
          .filter((item) => !item.userWord?.optional.deleted);
        setResponse(data);
        setOpen(false);
        // const ans = data.every((item) => item.userWord.optional.learned || item.userWord.difficulty === 'hard');
        // console.log(ans);
      });
    }
  }, [apiUrlAnonym, user.name]);

  const learnToggleDispatch = (word: IAggregatedWord, type: string) => {
    dispatch(updateUserWord({
      word,
      user,
      type,
    }));
    const newStats = {
      ...userStatistic,
    };
    getAllAggregatedWords(user, {
      filter: '{"$and":[{"userWord.optional.learned":true}]}',
    }).then((res) => {
      const learned = res[0].totalCount[0].count || 0;
      const wordDate = (new Date()).getDate() * ((new Date()).getMonth() + 1);
      newStats.learnedWords = learned;
      const ind = newStats.optional.long.stat.findIndex((item) => item.date === `${(new Date()).getDate()}.${(new Date()).getMonth() + 1}`);
      getAllAggregatedWords(user, {
        filter: `{"$and":[{"userWord.optional.learned":true}, {"userWord.optional.wordDate": ${wordDate}}]}`,
      }).then((result) => {
        const newLongStat = [...newStats.optional.long.stat];
        if (ind >= 0) {
          const newLongStats = {
            date: `${(new Date()).getDate()}.${(new Date()).getMonth() + 1}`,
            newWords: newStats.optional.long.stat[ind].newWords,
            learnedWords: result[0].totalCount[0].count || 0,
          };
          newLongStat.splice(ind, 1, newLongStats);
        }
        const brand = {
          learnedWords: learned,
          optional: {
            short: {
              ...newStats.optional.short,
            },
            long: {
              stat: newLongStat,
            },
          },
        };
        dispatch(updateStatistic({
          optional: brand,
          token: user.token,
          userId: user.id,
        }));
      });
    });
  };

  const deleteDispatch = (word: IAggregatedWord) => {
    dispatch(updateUserWord({
      word,
      user,
      type: 'deleteWord',
    }));
  };

  const addWordDispatch = (word: IAggregatedWord) => {
    const wordDate = (new Date()).getDate() * ((new Date()).getMonth() + 1);
    const wordOptions: IUserWord = {
      difficulty: 'simple',
      optional: {
        learned: false,
        progress: 0,
        new: false,
        // eslint-disable-next-line
        wordId: word._id,
        wordDate,
        learnDate: 0,
        deleted: false,
        directProgress: 0,
        backProgress: 0,
      },
    };
    dispatch(addUserWord(
      {
        user,
        // eslint-disable-next-line
        word: { id: word._id },
        wordOptions,
      },
    ));
  };

  const difficultyDispatch = (word: IAggregatedWord, type: string) => {
    dispatch(updateUserWord({
      word,
      user,
      type,
    }));
  };

  return (
    <div style={{ textAlign: 'center' }}>
      { response.length
        ? (
          <Box sx={{
            alignContent: 'center',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            justifyItems: 'center',
            rowGap: 3,
            marginTop: 2,
            textAlign: 'left',
          }}
          >
            {response.map((item: SinglWord) => (
              <Box
                sx={{ minWidth: 275, alignContent: 'center', display: 'flex' }}
                key={item.word}
                className="card-item"
              >
                <Card variant="outlined" sx={{ display: 'flex' }}>
                  {SingleCard(item, user, learnToggleDispatch, addWordDispatch, deleteDispatch, difficultyDispatch)}
                </Card>
              </Box>
            ))}
          </Box>
        )
        : (
          <Typography
            variant="h4"
            color="white"
            sx={{
              marginTop: '200px',
            }}
          >
            Все слова на этой странице удалены
          </Typography>
        )}
      <Backdrop
        sx={{ color: '#fff', zIndex: 10001 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
