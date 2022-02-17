import { Container, Typography } from '@mui/material';
import React, { ReactElement } from 'react';
import CardsBlock from './CardsBlock';

export default function DeletedPage(): ReactElement {
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
        <Typography
          variant="h2"
          color="white"
          sx={{
            margin: '10px 0',
          }}
        >
          Удалённые слова
        </Typography>
        <CardsBlock />
      </Container>
    </Container>
  );
}
