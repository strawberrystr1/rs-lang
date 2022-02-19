import {
  Container, Typography,
} from '@mui/material';
import React, { ReactElement } from 'react';
import CardsBlock from './CardsBlock';

export default function LearnedPage(): ReactElement {
  return (
    <Container
      maxWidth={false}
      className="main"
      sx={{
        height: 'calc(100vh - 120px)',
        overflowY: 'auto',
      }}
    >
      <Container
        sx={{
          padding: '20px 0',
          textAlign: 'center',
        }}
        maxWidth="xl"
      >
        <Container sx={{
          display: 'flex',
          marginTop: '20px',
          justifyContent: 'center',
        }}
        />
        <Typography
          variant="h2"
          color="white"
        >
          Изученные слова
        </Typography>
        <CardsBlock />
      </Container>
    </Container>
  );
}
