import { Container, Card, Button } from '@mui/material';
import React, { ReactElement } from 'react';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';

export default function SprintGame(): ReactElement {
  const correctAnswerInARow = 12;
  const currentLevelAnswerCount = 1;
  const currentLevel = 1;
  const isPlaying = true;
  const score = 2000;
  const isSoundOn = true;
  // const correctAnserCounter = 0;

  const { word, wordTranslate } = {
    word: 'alcohol',
    wordTranslate: 'алкоголь',
  };

  return (
    <Container
      className="spring-bg"
      maxWidth={false}
      sx={{
        width: '100%',
        height: 'calc(100vh - 120px)',
      }}
    >
      <Container
        maxWidth="xl"
        className="main sprint"
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <p className="sprint__counter">
          {score}
          <Button
            sx={{
              position: 'absolute',
              right: '1%',
              bottom: '0',
              borderRadius: '50%',
              minWidth: '40px',
              maxWidth: '40px',
              height: '40px',
            }}
          >
            {
              isSoundOn
                ? (
                  <NotificationsOutlinedIcon
                    fontSize="large"
                    sx={{
                      color: 'white',
                    }}
                  />
                )
                : (
                  <NotificationsOffOutlinedIcon
                    fontSize="large"
                    sx={{
                      color: 'white',
                    }}
                  />
                )
            }
          </Button>
        </p>
        <Card
          className="sprint__card"
          elevation={12}
          sx={{
            maxWidth: 600,
            background: 'rgba(90, 206, 109, 1)',
            borderRadius: '10px',
            position: 'relative',
          }}
        >
          <Button
            size="small"
            aria-label="music note"
            sx={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              borderRadius: '50%',
              minWidth: '40px',
              maxWidth: '40px',
              height: '40px',
            }}
          >
            { isPlaying
              ? <PauseCircleOutlineIcon fontSize="large" />
              : <PlayCircleOutlineIcon fontSize="large" />}

          </Button>
          <div
            className="sprint__circle-block"
          >
            { currentLevelAnswerCount >= 1
              ? <div className="sprint__circle-block_item filled" />
              : <div className="sprint__circle-block_item" />}
            { currentLevelAnswerCount >= 2
              ? <div className="sprint__circle-block_item filled" />
              : <div className="sprint__circle-block_item" />}
            { currentLevelAnswerCount >= 3
              ? <div className="sprint__circle-block_item filled" />
              : <div className="sprint__circle-block_item" />}
          </div>
          <p className="sprint__score-info">
            +
            {currentLevel * 10}
            {' '}
            очков за слово
          </p>
          <div
            className="sprint__stick"
          >
            <div className="sprint__stick_bird-red" />
            {
              correctAnswerInARow >= 4
                && <div className="sprint__stick_bird-blue" />
            }
            {
              correctAnswerInARow >= 8
               && <div className="sprint__stick_bird-green" />
            }
            {
              correctAnswerInARow >= 12
               && <div className="sprint__stick_bird-yellow" />
            }
          </div>
          <p className="sprint__word">{word}</p>
          <p className="sprint__word-translate">{wordTranslate}</p>
          <div className="sprint__buttons">
            <Button
              variant="contained"
              color="error"
              sx={{
                width: '180px',
                color: 'white',
                height: '50px',
                fontSize: '18px',
              }}
            >
              Не верно
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{
                width: '180px',
                color: 'white',
                height: '50px',
                fontSize: '18px',
              }}
            >
              Верно
            </Button>
          </div>
        </Card>
      </Container>
    </Container>
  );
}
