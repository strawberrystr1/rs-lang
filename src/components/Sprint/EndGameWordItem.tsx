import React, { ReactElement } from 'react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { Button, Typography } from '@mui/material';
import { ISprinGameWord } from '../../interfaces/interfaces';

export default function EndGameWordItem(props: ISprinGameWord): ReactElement {
  const { word, wordTranslate } = props;
  return (
    <div>
      <Button sx={{
        maxWidth: '30px',
        minWidth: '40px',
        borderRadius: '50%',
      }}
      >
        <KeyboardVoiceIcon fontSize="medium" />
      </Button>
      <Typography
        variant="h6"
        component="span"
        color="white"
        fontSize={18}
        sx={{ textTransform: 'capitalize' }}
      >
        {word}
        {' '}
        -
        {' '}
        {wordTranslate}
      </Typography>
    </div>
  );
}
