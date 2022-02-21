import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { Container } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import iconFirstGame from '../../assets/audio.png';
import iconSecondGame from '../../assets/sprint.png';
import { colors } from '../../constants/apiConstants';

export default function GameButtons() {
  const params = useParams();
  const navigate = useNavigate();
  const { group, page } = params;
  return (
    <Container className="game" sx={{ display: 'flex' }}>
      <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button onClick={() => navigate(`/textbook/game/audio/${group}/${page}`)} sx={{ backgroundColor: colors[+(group as string)].color }}>
          <img src={iconFirstGame} alt="" className="img" />
          Audio challenge
        </Button>
        <Button onClick={() => navigate(`/textbook/game/sprint/${group}/${page}`)} sx={{ backgroundColor: colors[+(group as string)].color }}>
          <img src={iconSecondGame} alt="" className="img" />
          Sprint
        </Button>
      </ButtonGroup>
    </Container>
  );
}
