import { Box, Typography } from '@mui/material';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function Circular(progress: number) {
  return (
    <Box sx={{ position: 'relative', marginLeft: '20px', marginTop: '35px' }}>
      <Box sx={{ position: 'relative' }}>
        <CircularProgress
          variant="determinate"
          value={progress}
          size={120}
          sx={{ position: 'absolute', zIndex: 100 }}
        />
        <CircularProgress
          variant="determinate"
          value={100}
          size={120}
          sx={{ color: 'darkgrey' }}
        />
      </Box>
      <Typography variant="h6" sx={{ position: 'absolute', top: '43px', left: '41px' }}>
        {`${progress / 5}/20`}
      </Typography>
    </Box>
  );
}
