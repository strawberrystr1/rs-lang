import React from 'react';
import {
  Box, CircularProgress, CircularProgressProps, Typography,
} from '@mui/material';

export default function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  const { value } = props;
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={70}
        color="success"
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="white"
        >
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}
