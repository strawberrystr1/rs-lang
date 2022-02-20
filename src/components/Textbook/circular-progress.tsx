import React from 'react';
import {
  Box, CircularProgress, CircularProgressProps, Tooltip, Typography,
} from '@mui/material';

export default function CircularProgressLabel(
  props: CircularProgressProps & { value: number },
) {
  const { value } = props;
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={value > 4 ? 100 : value * 25}
        size={50}
        color="success"
        thickness={8}
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
          width: '50px',
          height: '50px',
        }}
      >
        <Tooltip title="Прогресс изучения">
          <Typography
            variant="caption"
            component="div"
            color="black"
            sx={{
              cursor: 'pointer',
            }}
          >
            {`${value > 4 ? 4 : value}/4`}
          </Typography>
        </Tooltip>
      </Box>
    </Box>
  );
}
