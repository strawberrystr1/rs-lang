import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import Card from '@mui/material/Card';
import { useParams } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import SingleCard from './single-card';
import { SinglWord } from '../interfaces/textbookI';

export default function ShowCards() {
  const [response, setResponse] = useState<Array<SinglWord>>([]);
  const [open, setOpen] = React.useState(true);
  const params = useParams();
  const wordGroup = params.group;
  const wordPage = params.page;
  const apiUrl = `https://react-rslang-str.herokuapp.com/words?group=${wordGroup}&page=${wordPage}`;
  useEffect(() => {
    axios.get(apiUrl).then((resp) => resp.data).then((data:Array<SinglWord>) => { setResponse(data); setOpen(false); });
  }, [apiUrl]);
  return (
    <>
      <Box sx={{
        alignContent: 'center',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        justifyItems: 'center',
        rowGap: 3,
        marginTop: 2,
      }}
      >
        {response.map((item: SinglWord) => (
          <Box sx={{ minWidth: 275, alignContent: 'center', display: 'flex' }} key={item.id}>
            <Card variant="outlined" sx={{ display: 'flex' }}>
              {SingleCard(item, true)}
            </Card>
          </Box>
        ))}
      </Box>
      <Backdrop
        sx={{ color: '#fff', zIndex: 10001 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
