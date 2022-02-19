import {
  Button, ButtonGroup, Container, Typography,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CardsBlock from './CardsBlock';
import iconFirstGame from '../../assets/audio.png';
import iconSecondGame from '../../assets/sprint.png';

export default function DifficultPage(): ReactElement {
  const params = useParams();
  const navigate = useNavigate();
  const { group, page } = params;
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
        >
          <ButtonGroup variant="contained" aria-label="outlined primary button group" color="secondary">
            <Button onClick={() => navigate(`/game/audio/${group}/${page}`)}>
              <img src={iconFirstGame} alt="" className="img" />
              Audio challenge
            </Button>
            <Button onClick={() => navigate('/game/sprint/difficult')}>
              <img src={iconSecondGame} alt="" className="img" />
              Sprint
            </Button>
          </ButtonGroup>
        </Container>
        <Typography
          variant="h2"
          color="white"
          sx={{
            margin: '10px 0',
          }}
        >
          Сложные слова
        </Typography>
        <CardsBlock />
      </Container>
    </Container>
  );
}
