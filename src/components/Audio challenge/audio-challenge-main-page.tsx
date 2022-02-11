import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Container, Typography } from '@mui/material';
import TransitionsModal from './modal';

export default function MainPage() {
  const [value, setValue] = useState('0');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
    }}
    >
      <Typography variant="h3" sx={{ color: 'white' }}>
        Audio challenge
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
      {TransitionsModal((parseInt(value, 10) + 1).toString())}
    </Container>
  );
}
