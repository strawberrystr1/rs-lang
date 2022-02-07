import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import axios from 'axios';
import Card from '@mui/material/Card';
import { useParams } from 'react-router-dom';
import SingleCard from './single-card';
import { SinglWord } from '../interfaces/textbookI';

export default function ShowCards() {
  const [response, setResponse] = useState<Array<SinglWord>>([]);
  const params = useParams();
  const wordGroup = params.group;
  const wordPage = params.page;
  const apiUrl = `https://react-rslang-str.herokuapp.com/words?group=${wordGroup}&page=${wordPage}`;
  useEffect(() => {
    axios.get(apiUrl).then((resp) => resp.data).then((data:Array<SinglWord>) => setResponse(data));
  }, [apiUrl]);
  return (
    <div className="items">
      {response.map((item: SinglWord) => (
        <Box sx={{ minWidth: 275 }} key={item.id}>
          <Card variant="outlined">
            {SingleCard(item)}
          </Card>
        </Box>
      ))}
    </div>
  );
}
