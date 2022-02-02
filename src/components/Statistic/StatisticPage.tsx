import {
  Container, Grid, CardContent, CircularProgress, CircularProgressProps,
  Typography, Box,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { StyledCard } from '../StyledMUIItems';
import sprint from '../../assets/sprint.png';
import sound from '../../assets/audio.png';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  const { value } = props;
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={70}
        color="success"
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="white"
        >
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function StatisticPage(): ReactElement {
  return (
    <Container
      maxWidth="lg"
      className="main stat"
      sx={{ height: 'calc(100vh - 120px)' }}
    >
      <h2>Статистика за последний день</h2>
      <Grid container>
        <Grid item xs={4} className="stat__grid-item">
          <StyledCard>
            <CardContent sx={{
              fontSize: '70px',
              fontWeight: 'bold',
            }}
            >
              0
            </CardContent>
            <CardContent sx={{
              fontSize: '24px',
            }}
            >
              <p style={{ fontSize: '30px' }}>СЛОВ</p>
              <p style={{ fontSize: '30px' }}>изучено</p>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={4} className="stat__grid-item">
          <StyledCard>
            <CardContent sx={{
              fontSize: '70px',
              fontWeight: 'bold',
            }}
            >
              0
            </CardContent>
            <CardContent sx={{
              fontSize: '24px',
            }}
            >
              <p style={{ fontSize: '30px' }}>НОВЫХ</p>
              <p style={{ fontSize: '30px' }}>слов</p>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={4} className="stat__grid-item">
          <StyledCard>
            <CardContent>
              <CircularProgressWithLabel value={42} />
            </CardContent>
            <CardContent>
              <p style={{ fontSize: '26px' }}>ПРОЦЕНТ</p>
              <p style={{ fontSize: '22px' }}>правильных ответов</p>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={6} className="stat__grid-item">
          <StyledCard>
            <CardContent sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'cecnter',
              alignItems: 'center',
            }}
            >
              <img src={sprint} alt="sprint" className="game-icon" />
              <p style={{
                fontSize: '26px',
              }}
              >
                Спринт
              </p>
            </CardContent>
            <CardContent sx={{
              display: 'flex',
              minHeight: '120px',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            >
              <p className="stat_game-stat">
                <span>0</span>
                {' '}
                новых слов
              </p>
              <p className="stat_game-stat">
                <span>0 %</span>
                правильных ответов
              </p>
              <p className="stat_game-stat">
                <span>0</span>
                {' '}
                лучшая серия
              </p>
            </CardContent>
          </StyledCard>
        </Grid>
        <Grid item xs={6} className="stat__grid-item">
          <StyledCard>
            <CardContent sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'cecnter',
              alignItems: 'center',
            }}
            >
              <img src={sound} alt="sprint" className="game-icon" />
              <p style={{
                fontSize: '26px',
              }}
              >
                Аудиовызов
              </p>
            </CardContent>
            <CardContent sx={{
              display: 'flex',
              minHeight: '120px',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
            >
              <p className="stat_game-stat">
                <span>0</span>
                {' '}
                новых слов
              </p>
              <p className="stat_game-stat">
                <span>0 %</span>
                правильных ответов
              </p>
              <p className="stat_game-stat">
                <span>0</span>
                {' '}
                лучшая серия
              </p>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Container>
  );
}
