import React, { ReactElement } from 'react';
import { Container } from '@mui/material';

export default function VideoBlock(): ReactElement {
  return (
    <Container
      maxWidth="xl"
      sx={{
        height: '700px',
        marginTop: '50px',
        color: 'white',
        fontSize: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
      }}
    >
      Here will be a video
    </Container>
  );
}
