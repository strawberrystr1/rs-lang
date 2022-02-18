import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import iconFirstGame from '../../assets/audio.png';
import iconSecondGame from '../../assets/sprint.png';

export default function GameButtons() {
  const params = useParams();
  const navigate = useNavigate();
  const { group, page } = params;
  return (
    <Container className="game" sx={{ display: 'flex' }}>
      <ButtonGroup variant="contained" aria-label="outlined primary button group" color="secondary">
        <Button onClick={() => navigate(`/game/audio/${group}/${page}`)}>
          <img src={iconFirstGame} alt="" className="img" />
          Audio challenge
        </Button>
        <Button onClick={() => navigate(`/game/sprint/${group}/${page}`)}>
          <img src={iconSecondGame} alt="" className="img" />
          Sprint
        </Button>
      </ButtonGroup>
    </Container>
  );
}
