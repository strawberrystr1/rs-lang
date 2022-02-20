import React from 'react';
import { Box, CardMedia } from '@mui/material';

export default function BoxAfterAnswer(image: string) {
  document.querySelector('.game-box-text')?.classList.remove('hidden');
  return (
    <Box>
      <CardMedia
        sx={{
          width: 80, borderRadius: '50%', height: 80, marginTop: '-20px',
        }}
        component="img"
        image={`https://react-rslang-str.herokuapp.com/${image}`}
        alt="wordPicture"
      />
    </Box>
  );
}
