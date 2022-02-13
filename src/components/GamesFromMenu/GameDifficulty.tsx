import {
  Container, ButtonGroup,
} from '@mui/material';
import { Link } from 'react-router-dom';
import React, { ReactElement } from 'react';
import { StyledButton } from '../StyledMUIItems';

export default function GameDifficulty(): ReactElement {
  const randonPage = Math.floor(Math.random() * 30);
  return (
    <Container
      maxWidth="xl"
      className="main"
      sx={{
        height: 'calc(100vh - 120px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <p className="game-difficulty">Выберите уровень сложности</p>
      <ButtonGroup variant="contained">
        <Link
          to={`/game/sprint/0/${randonPage}`}
          style={{ textDecoration: 'none' }}
        >
          <StyledButton>1</StyledButton>
        </Link>
        <Link
          to={`/game/sprint/1/${randonPage}`}
          style={{ textDecoration: 'none' }}
        >
          <StyledButton>2</StyledButton>
        </Link>
        <Link
          to={`/game/sprint/2/${randonPage}`}
          style={{ textDecoration: 'none' }}
        >
          <StyledButton>3</StyledButton>
        </Link>
        <Link
          to={`/game/sprint/3/${randonPage}`}
          style={{ textDecoration: 'none' }}
        >
          <StyledButton>4</StyledButton>
        </Link>
        <Link
          to={`/game/sprint/4/${randonPage}`}
          style={{ textDecoration: 'none' }}
        >
          <StyledButton>5</StyledButton>
        </Link>
        <Link
          to={`/game/sprint/5/${randonPage}`}
          style={{ textDecoration: 'none' }}
        >
          <StyledButton>6</StyledButton>
        </Link>
      </ButtonGroup>
    </Container>
  );
}
