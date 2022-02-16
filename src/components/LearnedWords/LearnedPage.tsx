import { Button, ButtonGroup, Container } from '@mui/material';
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
        }}
        maxWidth="xl"
      >
        <Container sx={{
          display: 'flex',
          marginTop: '20px',
          justifyContent: 'center',
        }}
        >
          <ButtonGroup variant="contained" aria-label="outlined primary button group" color="secondary">
            <Button>
              <img alt="" className="img" />
              Audio challenge
            </Button>
            <Button>
              <img alt="" className="img" />
              Sprint
            </Button>
          </ButtonGroup>
        </Container>
        <CardsBlock />
      </Container>
    </Container>
  );
}
