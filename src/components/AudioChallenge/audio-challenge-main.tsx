import React from 'react';
import { Container } from '@mui/material';
import MainPage from './audio-challenge-main-page';
import '../styles/audio-challenge.css';

function AudioChallenge() {
  return (
    <Container
      maxWidth="xl"
      className="main"
      sx={{
        height: 'calc(100vh - 120px)',
        display: 'table',
      }}
    >
      <MainPage />
    </Container>

  );
}

export default AudioChallenge;
