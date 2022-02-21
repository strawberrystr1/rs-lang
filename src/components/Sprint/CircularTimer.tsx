/* eslint-disable */
import {
  Box, Button, CircularProgress, Typography,
} from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import PauseIcon from '@mui/icons-material/Pause';
import { convertTimeToPercent } from '../../utils/gameUtils';
import { ICircularTimerProps } from '../../interfaces/interfaces';

export default function CircularTimer(props: ICircularTimerProps): ReactElement {
  const {
    setIsTimeEnd, isTimePaused, setIsTimePaused, isTimeEnd,
  } = props;
  const [timer, setTimer] = useState<ReturnType<typeof setInterval>>();
  const [timerLastTime, setTimerLastTime] = useState(60);
  let isMounted = true;

  const startTimer = () => {
    if (isTimeEnd) return;
    if (timerLastTime > 0) {
      const timerId = setInterval(() => {
        if (isMounted) setTimerLastTime((prev) => prev - 1);
      }, 1000);
      setTimer(timerId);
    } else {
      setIsTimePaused();
      clearInterval(timer!);
      setIsTimeEnd();
    }
  };

  const toggleTimer = (fromSpace?: boolean) => {
    setIsTimePaused();
    if (!isTimePaused && !fromSpace) {
      setTimerLastTime(timerLastTime);
      clearInterval(timer!);
    } else {
      startTimer();
    }
  };

  const handleSpace = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      toggleTimer(true);
    }
  };

  useEffect(() => {
    clearInterval(timer!);
    if (!isTimePaused) {
      startTimer();
    }
    return () => {
      isMounted = false;
    };
  }, [timerLastTime]);

  useEffect(() => {
    window.addEventListener('keyup', handleSpace);
    return () => window.removeEventListener('keyup', handleSpace);
  }, [timerLastTime]);

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
          onClick={(e) => {
            if ((e.target as HTMLElement).nodeName === 'DIV'
              || (e.target as HTMLElement).nodeName === 'path') toggleTimer();
          }}
          disableRipple
          sx={{
            maxWidth: '80px',
            maxHeight: '80px',
          }}
          tabIndex={0}
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
