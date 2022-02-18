import React, { useState, useEffect, ReactElement } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import CardItem from './CardItem';
import { RootState } from '../../redux/store';
import { getAllAggregatedWords } from '../../utils/gameUtils';
import { IAggregatedWord } from '../../interfaces/apiInterfaces';
import { updateUserWord } from '../../redux/userState/wordsSlice';

export default function CardsBlock(): ReactElement {
  const [response, setResponse] = useState<IAggregatedWord[]>([]);
  const [open, setOpen] = React.useState(true);

  const { user } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllAggregatedWords(user, {
      filter: '{"$and":[{"userWord.optional.learned":true}]}',
    }).then((res) => {
      getAllAggregatedWords(user, {
        filter: '{"$and":[{"userWord.optional.learned":true}]}',
        wordsPerPage: `${res[0].totalCount[0]?.count || 20}`,
      }).then((result) => {
        setResponse(result[0].paginatedResults);
        setOpen(false);
      });
    });
  }, []);

  const updateDispatch = (word: IAggregatedWord) => {
    dispatch(updateUserWord({
      word,
      user,
    }));
  };

  return (
    <>
      {
        response.length
          ? (
            <Box
              sx={{
                alignContent: 'center',
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                justifyItems: 'center',
                rowGap: 3,
                marginTop: 2,
                textAlign: 'left',
              }}
            >
              {response.map((item: IAggregatedWord) => (
                <Box
                  sx={{ minWidth: 275, alignContent: 'center', display: 'flex' }}
                // eslint-disable-next-line
                key={item._id}
                  className="card-item"
                >
                  <Card variant="outlined" sx={{ display: 'flex' }}>
                    {CardItem({ wordItem: item, user, dispatch: updateDispatch })}
                  </Card>
                </Box>
              ))}
            </Box>
          )
          : (!open
            && (
            <Typography
              variant="h4"
              color="white"
              sx={{
                marginTop: '200px',
              }}
            >
              У вас нет изученных слов
            </Typography>
            )
          )
      }
      <Backdrop
        sx={{ color: '#fff', zIndex: 10001 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
