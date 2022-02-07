import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import iconFirstGame from '../../assets/book.png';
import iconSecondGame from '../../assets/games.png';

export default function GameButtons() {
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group" color="secondary" className="game">
      <Button>
        <img src={iconFirstGame} alt="" className="img" />
        Audio challenge
      </Button>
      <Button>
        <img src={iconSecondGame} alt="" className="img" />
        Sprint
      </Button>
    </ButtonGroup>
  );
}
