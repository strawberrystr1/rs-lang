import { Container } from '@mui/material';
import React, { ReactElement } from 'react';

export default function EmptyPage(): ReactElement {
  return (
    <Container
      maxWidth="xl"
      className="main"
      sx={{
        height: 'calc(100vh - 120px)',
      }}
    />
  );
}
