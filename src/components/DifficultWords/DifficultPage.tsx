import {
  Button, ButtonGroup, Container, Dialog, DialogActions, DialogTitle, Typography,
} from '@mui/material';
import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CardsBlock from './CardsBlock';
import iconFirstGame from '../../assets/audio.png';
import iconSecondGame from '../../assets/sprint.png';
import { RootState } from '../../redux/store';

export default function DifficultPage(): ReactElement {
  const { user } = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  const [isEmpty, setIsEmpty] = useState(false);
  const [isErrorGameOpen, setIsErrorGameOpen] = useState(false);

  return (
    <Container
      maxWidth={false}
      className="main"
      sx={{
        height: 'calc(100vh - 120px)',
        overflowY: 'auto',
      }}
    >
      {
        user.name
          ? (
            <Container
              sx={{
                padding: '20px 0',
                textAlign: 'center',
              }}
              maxWidth="xl"
            >
              { isEmpty
              && (
              <Container sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
              >
                <ButtonGroup variant="contained" aria-label="outlined primary button group" color="secondary">
                  <Button onClick={() => {
                    const cards = document.querySelectorAll('.card-item');
                    if (cards.length <= 4) {
                      setIsErrorGameOpen(true);
                    } else {
                      navigate('/game/audio/difficult');
                    }
                  }}
                  >
                    <img src={iconFirstGame} alt="" className="img" />
                    Audio challenge
                  </Button>
                  <Button onClick={() => navigate('/game/sprint/difficult')}>
                    <img src={iconSecondGame} alt="" className="img" />
                    Sprint
                  </Button>
                </ButtonGroup>
              </Container>
              )}
              <Typography
                variant="h2"
                color="white"
                sx={{
                  margin: '10px 0',
                }}
              >
                Сложные слова
              </Typography>
              <CardsBlock setIsEmpty={(value: boolean) => {
                setIsEmpty(value);
              }}
              />
            </Container>
          )
          : (
            <Dialog
              open
              onClose={() => navigate('/')}
            >
              <DialogTitle>
                Сложные слова доступны только для авторизованных пользователей
              </DialogTitle>
              <DialogActions>
                <Button onClick={() => navigate('/')} variant="contained">Закрыть</Button>
              </DialogActions>
            </Dialog>
          )
      }
      <Dialog
        open={isErrorGameOpen}
        onClose={() => setIsErrorGameOpen(false)}
      >
        <DialogTitle>
          Для этой игры необходимо минимум 5 слова
        </DialogTitle>
        <DialogActions>
          <Button onClick={() => setIsErrorGameOpen(false)} variant="contained">Закрыть</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
