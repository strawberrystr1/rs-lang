import { Button } from '@mui/material';
import React, { ReactElement } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function ButtonsBlock(): ReactElement {
  return (
    <>
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
      <div className="sprint__arrows">
        <Button disableRipple>
          <ArrowBackIcon fontSize="large" />
        </Button>
        <Button disableRipple>
          <ArrowForwardIcon fontSize="large" />
        </Button>
      </div>
    </>
  );
}
