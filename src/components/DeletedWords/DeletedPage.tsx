import {
  Button, Container, Dialog, DialogActions, DialogTitle, Typography,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';
import CardsBlock from './CardsBlock';

export default function DeletedPage(): ReactElement {
  const { user } = useSelector((state: RootState) => state);
  const navigate = useNavigate();
  return (
    <Container
      maxWidth={false}
      className="main"
      sx={{
        height: 'calc(100vh - 120px)',
        overflowY: 'auto',
      }}
    >
      { user.name
        ? (
          <Container
            sx={{
              padding: '20px 0',
              textAlign: 'center',
            }}
            maxWidth="xl"
          >
            <Typography
              variant="h2"
              color="white"
              sx={{
                margin: '10px 0',
              }}
            >
              Удалённые слова
            </Typography>
            <CardsBlock />
          </Container>
        )
        : (
          <Dialog
            open
            onClose={() => navigate('/')}
          >
            <DialogTitle>
              Удалённые слова доступны только для авторизованных пользователей
            </DialogTitle>
            <DialogActions>
              <Button onClick={() => navigate('/')} variant="contained">Закрыть</Button>
            </DialogActions>
          </Dialog>
        )}
    </Container>
  );
}
