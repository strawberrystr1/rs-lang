import React from 'react';
import { IconButton } from '@mui/material';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';

export default function CardAudio(audio:string, size: string) {
  return (
    <IconButton
      onClick={() => {
        const audioN: HTMLAudioElement = new Audio();
        audioN.src = `https://react-rslang-str.herokuapp.com/${audio}`;
        audioN.play();
      }}
    >
      <PlayArrowRounded
        sx={{ fontSize: size }}
      />

    </IconButton>
  );
}
