import * as React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import getRandom from './random';

export default function StartButton(value: string) {
  const navigate = useNavigate();
  return (
    <div>
      <Button
        sx={{ marginTop: '25px' }}
        variant="contained"
        onClick={(() => {
          navigate(`/game/audio/${value}/${getRandom(0, 29)}`);
        })}
      >
        Начать

      </Button>
    </div>
  );
}
