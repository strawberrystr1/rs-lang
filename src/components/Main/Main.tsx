import { Container } from '@mui/material';
import React, { ReactElement } from 'react';
import AdvantagesBlock from './AdvantagesBlock';
import IntroBlock from './IntroBlock';
import TeamBlock from './TeamBlock';
import VideoBlock from './VideoBlock';

function Main(): ReactElement {
  return (
    <Container
      maxWidth="xl"
      className="main"
      sx={{
        height: '100%',
      }}
    >
      <IntroBlock />
      <AdvantagesBlock />
      <VideoBlock />
      <TeamBlock />
    </Container>
  );
}

export default Main;
