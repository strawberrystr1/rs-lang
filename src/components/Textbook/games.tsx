import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Container } from '@mui/material';
import iconFirstGame from '../../assets/book.png';
import iconSecondGame from '../../assets/games.png';

export default function GameButtons() {
  return (
    <Container className="game" sx={{ display: 'flex' }}>
      <ButtonGroup variant="contained" aria-label="outlined primary button group" color="secondary">
        <Button>
          <img src={iconFirstGame} alt="" className="img" />
          Audio challenge
        </Button>
        <Button>
          <img src={iconSecondGame} alt="" className="img" />
          Sprint
        </Button>
      </ButtonGroup>
    </Container>
  );
}
