import {
  Box, Button, Container, Typography,
} from '@mui/material';
import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import { PlayArrowRounded } from '@mui/icons-material';
import Stack from '@mui/material/Stack';

export default function GamePage() {
  const [progress, setProgress] = React.useState(0);
  const [buttonName, setbuttonName] = React.useState('Я не знаю');
  return (
    <Container
      maxWidth="xl"
      className="main-game"
      sx={{
        height: 'calc(100vh - 120px)',
        display: 'table',
      }}
    >
      <Box sx={{ position: 'relative', marginLeft: '20px', marginTop: '35px' }}>
        <Box sx={{ position: 'relative' }}>
          <CircularProgress
            variant="determinate"
            value={progress}
            size={120}
            sx={{ position: 'absolute', zIndex: 100 }}
          />
          <CircularProgress
            variant="determinate"
            value={100}
            size={120}
            sx={{ color: 'darkgrey' }}
          />
        </Box>
        <Typography variant="h6" sx={{ position: 'absolute', top: '43px', left: '41px' }}>
          {`${progress / 5}/20`}
        </Typography>
      </Box>
      <Box
        className="container-for-adding"
        sx={{
          margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}
      >
        <IconButton
          aria-label="fingerprint"
          color="primary"
          sx={{
            width: '60px',
            height: '60px',
            marginTop: '40px',
            '&:hover': {
              backgroundColor: 'darkgrey',
            },
          }}
        >
          <PlayArrowRounded
            color="primary"
            sx={{ fontSize: 60 }}
          />
        </IconButton>
        <Stack
          spacing={2}
          direction="row"
          sx={{ marginTop: '80px', marginBottom: '40px' }}
          onClick={(() => {
            setbuttonName('Следующее слово');
          })}
        >
          <Button variant="outlined">Outlined</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="outlined">Outlined</Button>
        </Stack>
        <Button
          variant="contained"
          onClick={(() => {
            setbuttonName('Я не знаю');
            setProgress(progress + 5);
            if (progress === 100) {
              setProgress(0);
            }
          })}
        >
          {buttonName}
        </Button>
      </Box>
    </Container>
  );
}
