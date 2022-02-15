import { Box, CircularProgress, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import { IAfterGameCircle } from '../interfaces/interfaces';

export default function CircularStatistic(props: IAfterGameCircle): ReactElement {
  const { value } = props;
  return (
    <Box sx={{
      position: 'relative',
      display: 'inline-flex',
      width: '90px',
      height: '90px',
      flexDirection: 'column',
      alignItems: 'center',
    }}
    >
      <CircularProgress
        variant="determinate"
        color="success"
        value={value}
        thickness={6}
        sx={{
          minWidth: '90px',
          minHeight: '90px',
        }}
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
          fontSize={18}
        >
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
      <Typography
        color="white"
        fontSize={24}
      >
        Точность
      </Typography>
    </Box>
  );
}
