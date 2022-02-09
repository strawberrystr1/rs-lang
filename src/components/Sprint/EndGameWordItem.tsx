import React, { ReactElement, useState, useRef } from 'react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import { Button, Typography } from '@mui/material';
import { ISprinGameWord } from '../../interfaces/interfaces';

export default function EndGameWordItem(props: ISprinGameWord): ReactElement {
  const { word, wordTranslate, audio } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const audioElem = useRef<HTMLAudioElement>(null);

  const toggleAudio = () => {
    if (!isPlaying) {
      (audioElem.current as HTMLAudioElement).play();
      setIsPlaying(true);
    } else {
      (audioElem.current as HTMLAudioElement).pause();
      (audioElem.current as HTMLAudioElement).currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div>
      <Button
        onClick={toggleAudio}
        sx={{
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
      <audio ref={audioElem} src={`https://react-rslang-str.herokuapp.com/${audio}`}>
        <track kind="captions" />
      </audio>
    </div>
  );
}
