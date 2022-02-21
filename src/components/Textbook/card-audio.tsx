import React from 'react';
import { IconButton } from '@mui/material';

export default function CardAudio(audioArr: string[]) {
  let isPlay = false;
  const audio: HTMLAudioElement = new Audio();
  let currentAudio = 0;
  function playAudio() {
    isPlay = true;
    audio.currentTime = 0;
    audio.volume = 0.2;
    // eslint-disable-next-line
    audio.src = `https://react-rslang-str.herokuapp.com/${audioArr[currentAudio]}`;
    audio.play();
    audio.onended = () => {
      currentAudio += 1;
      if (currentAudio > 2) {
        currentAudio = 0;
        return;
      }
      // eslint-disable-next-line
      audio.src = `https://react-rslang-str.herokuapp.com/${audioArr[currentAudio]}`;
      audio.play();
    };
  }

  function pauseAudio() {
    isPlay = false;
    audio.pause();
    currentAudio = 0;
  }

  function toggleBtn(playButton: HTMLElement) {
    playButton.classList.toggle('pause');
  }
  const toggleAudio = () => {
    const playButton = document.querySelector('.play') as HTMLElement;
    toggleBtn(playButton);
    if (isPlay)pauseAudio();
    else playAudio();
  };
  return (
    <IconButton
      className="play"
      onClick={toggleAudio}
      sx={{
        width: '40px', backgroundColor: 'darkgrey', height: '40px', marginTop: '30px', marginRight: '5px',
      }}
    />
  );
}
