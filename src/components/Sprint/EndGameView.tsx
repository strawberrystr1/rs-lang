import {
  Box,
  Button, CardContent, Divider, Typography,
} from '@mui/material';
import React, { ReactElement } from 'react';
import { IAfterGameWordsStat } from '../../interfaces/interfaces';
import {
  StyledBoxMW, StyledCard, StyledPaper,
} from '../StyledMUIItems';
import CircularStatistic from './CircularStatistic';
import EndGameWordItem from './EndGameWordItem';

export default function EndGameView(props: IAfterGameWordsStat): ReactElement {
  const { inARow, right, wrong } = props;

  return (
    <StyledPaper>
      <StyledCard>
        <CardContent sx={{ width: '95%' }}>
          <StyledBoxMW>
            <Typography variant="h4" component="span" color="white">Результаты</Typography>
            <Button variant="contained">Сыграть ещё раз</Button>
          </StyledBoxMW>
          <Divider sx={{ background: 'white', marginTop: '10px', height: '3px' }} />
          <div className="sprint__stat-box">
            <StyledBoxMW sx={{ paddingX: '30px', marginBottom: '30px' }}>
              <CircularStatistic value={67} />
              <Box>
                <Typography
                  variant="h6"
                  component="div"
                  color="white"
                  fontSize={18}
                >
                  Ответов подряд -
                  {' '}
                  {inARow}
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  color="white"
                  fontSize={18}
                >
                  Правильно -
                  {' '}
                  {right}
                </Typography>
                <Typography
                  variant="h6"
                  component="div"
                  color="white"
                  fontSize={18}
                >
                  Ошибки -
                  {' '}
                  {wrong}
                </Typography>
              </Box>
            </StyledBoxMW>
            <Typography
              variant="h6"
              component="div"
              color="white"
              fontSize={18}
            >
              <span className="sprint__end_total-count">{wrong + right}</span>
              {' '}
              cлов было повторено
            </Typography>
            <StyledBoxMW sx={{
              alignItems: 'flex-start !important',
              flexDirection: 'column',
            }}
            >
              <Typography
                variant="h6"
                component="div"
                color="white"
                fontSize={18}
              >
                Ошибки
                {' '}
                <span className="sprint__end_total-count mistake">{wrong}</span>
              </Typography>
              <EndGameWordItem word="alchohol" wordTranslate="алкоголь" />
              <EndGameWordItem word="alchohol" wordTranslate="алкоголь" />
              <EndGameWordItem word="alchohol" wordTranslate="алкоголь" />
            </StyledBoxMW>
            <StyledBoxMW sx={{
              alignItems: 'flex-start !important',
              flexDirection: 'column',
            }}
            >
              <Typography
                variant="h6"
                component="div"
                color="white"
                fontSize={18}
              >
                Правильные ответы
                {' '}
                <span className="sprint__end_total-count">{right}</span>
              </Typography>
              <EndGameWordItem word="alchohol" wordTranslate="алкоголь" />
              <EndGameWordItem word="alchohol" wordTranslate="алкоголь" />
              <EndGameWordItem word="alchohol" wordTranslate="алкоголь" />
            </StyledBoxMW>
          </div>
        </CardContent>
      </StyledCard>
    </StyledPaper>
  );
}
