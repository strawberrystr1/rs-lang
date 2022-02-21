/* eslint-disable */
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
      }}
    >
      <iframe src="https://www.youtube.com/embed/Ju_VpADjG8M" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
    </Container>
  );
}
