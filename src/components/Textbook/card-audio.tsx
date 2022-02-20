import React from 'react';
import { IconButton } from '@mui/material';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';

export default function CardAudio(audioArr: string[], size: string) {
  let currentAudio = 0;

  const toggleAudio = () => {
    const audioN: HTMLAudioElement = new Audio();
    audioN.volume = 0.2;
    // eslint-disable-next-line
    audioN.src = `https://react-rslang-str.herokuapp.com/${audioArr[currentAudio]}`;
    audioN.play();
    audioN.onended = () => {
      currentAudio += 1;
      if (currentAudio > 2) {
        currentAudio = 0;
        return;
      }
      // eslint-disable-next-line
      audioN.src = `https://react-rslang-str.herokuapp.com/${audioArr[currentAudio]}`;
      audioN.play();
    };
  };

  return (
    <IconButton
      onClick={toggleAudio}
    >
      <PlayArrowRounded
        sx={{ fontSize: size }}
      />

    </IconButton>
  );
}
