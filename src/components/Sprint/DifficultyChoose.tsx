import React, { useState } from 'react';
import {
  Box, Button, Container, Tab, Tabs, Typography,
} from '@mui/material';
import '../styles/audio-challenge.css';
import { useNavigate } from 'react-router-dom';
import getRandom from '../AudioChallenge/random';

function DifficultyChoose() {
  const [value, setValue] = useState('0');
  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <Container
      maxWidth="xl"
      className="main"
      sx={{
        height: 'calc(100vh - 120px)',
        display: 'table',
      }}
    >
      <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
      >
        <Typography variant="h3" sx={{ color: 'white' }}>
          Спринт
        </Typography>
        <Typography variant="h5" sx={{ color: 'darkgray', margin: '20px 0' }}>
          Выберите сложность
        </Typography>
        <Box sx={{
          width: '100%', margin: '0 auto', display: 'flex', justifyContent: 'center',
        }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
          >
            <Tab value="0" label="Первая" sx={{ color: 'white' }} />
            <Tab value="1" label="Вторая" sx={{ color: 'white' }} />
            <Tab value="2" label="Третья" sx={{ color: 'white' }} />
            <Tab value="3" label="Четрвёртая" sx={{ color: 'white' }} />
            <Tab value="4" label="Пятая" sx={{ color: 'white' }} />
            <Tab value="5" label="Шестая" sx={{ color: 'white' }} />
          </Tabs>
        </Box>
        <div>
          <Button
            sx={{ marginTop: '25px' }}
            variant="contained"
            onClick={(() => {
              navigate(`/game/sprint/${(parseInt(value, 10)).toString()}/${getRandom(0, 29)}`);
            })}
          >
            Начать
          </Button>
        </div>
      </Container>
    </Container>

  );
}

export default DifficultyChoose;
