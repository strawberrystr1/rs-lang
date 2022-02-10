import React from 'react';
import { Container } from '@mui/material';
import GameButtons from './games';
import BasicPagination from './pagination';
import ShowCards from './show-cards';

function TextBookFinal() {
  return (
    <Container
      maxWidth="xl"
      className="main"
      sx={{
        height: 'calc(100vh - 120px)',
        display: 'table',
      }}
    >
      <GameButtons />
      <BasicPagination />
      <ShowCards />
    </Container>
  );
}
export default TextBookFinal;
