import { Button } from '@mui/material';
import React, { ReactElement } from 'react';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import { IScoreProps } from '../../interfaces/interfaces';

export default function ScoreBlock(props: IScoreProps): ReactElement {
  const { score, isSoundOn, setIsSoundOn } = props;
  return (
    <p className="sprint__counter">
      {score}
      <Button
        sx={{
          position: 'absolute',
          right: '1%',
          bottom: '0',
          borderRadius: '50%',
          minWidth: '40px',
          maxWidth: '40px',
          height: '40px',
        }}
        onClick={setIsSoundOn}
      >
        {
              isSoundOn
                ? (
                  <NotificationsOutlinedIcon
                    fontSize="large"
                    sx={{
                      color: 'white',
                    }}
                  />
                )
                : (
                  <NotificationsOffOutlinedIcon
                    fontSize="large"
                    sx={{
                      color: 'white',
                    }}
                  />
                )
            }
      </Button>
    </p>
  );
}
