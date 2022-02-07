import {
  Box, Button, CircularProgress, Typography,
} from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import PauseIcon from '@mui/icons-material/Pause';
import { convertTimeToPercent } from '../../utils/gameUtils';

export default function CircularTimer(): ReactElement {
  const [timer, setTimer] = useState<ReturnType<typeof setInterval>>();
  const [timerLastTime, setTimerLastTime] = useState(3);
  const [isTimePaused, setIsTimePaused] = useState(false);

  const startTimer = () => {
    if (timerLastTime > 0) {
      const timerId = setInterval(() => {
        setTimerLastTime((prev) => prev - 1);
      }, 1000);
      setTimer(timerId);
    } else {
      clearInterval(timer!);
    }
  };

  useEffect(() => {
    clearInterval(timer!);
    startTimer();
    return () => clearInterval(timer!);
  }, [timerLastTime]);

  const toggleTimer = () => {
    setIsTimePaused((prev) => !prev);
    if (!isTimePaused) {
      setTimerLastTime(timerLastTime);
      clearInterval(timer!);
    } else {
      startTimer();
    }
  };

  return (
    <Box sx={{
      position: 'absolute',
      display: 'inline-flex',
      width: '100px',
      height: '100px',
      top: '5%',
      left: '0',
    }}
    >
      <CircularProgress
        variant="determinate"
        value={convertTimeToPercent(timerLastTime)}
        sx={{
          minWidth: '100px',
          minHeight: '100px',
        }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          onClick={toggleTimer}
          disableRipple
          sx={{
            maxWidth: '80px',
            maxHeight: '80px',
          }}
        >
          {
            !isTimePaused
              ? (
                <Typography
                  variant="caption"
                  component="div"
                  color="text.secondary"
                  fontSize={32}
                >
                  {timerLastTime}
                </Typography>
              )
              : <PauseIcon fontSize="large" />
          }
        </Button>
      </Box>
    </Box>
  );
}
