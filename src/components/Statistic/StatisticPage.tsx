import {
  Container, Grid, CardContent, Dialog, DialogTitle, DialogActions, Button,
} from '@mui/material';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { StyledStatsCard } from '../StyledMUIItems';
import sprint from '../../assets/sprint.png';
import sound from '../../assets/audio.png';
import CircularProgressWithLabel from './CircularProgressWithLabel';
import { RootState } from '../../redux/store';
import { getAllAggregatedWords } from '../../utils/gameUtils';
import { getStatistic } from '../../redux/userState/statisticSlice';
import { getAllWords } from '../../redux/userState/wordsSlice';
import LongStatistic from './LongStatistic';
import LongStatisticLearned from './LosgStatisticLearned';

export default function StatisticPage(): ReactElement {
  const { user, userStatistic } = useSelector((state: RootState) => state);
  const [learnedWords, setLearnedWords] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const newWords = (userStatistic.optional.short.sprint?.newWords || 0)
    + (userStatistic.optional.short.audio?.newWords || 0);
  const totalAnswers = (userStatistic.optional.short.sprint?.allAnswers || 0) + (userStatistic.optional.short.audio?.allAnswers || 0);
  const correctAnswers = (userStatistic.optional.short.sprint?.correctAnswers || 0) + (userStatistic.optional.short.audio?.correctAnswers || 0);
  const totalPercents = Math.ceil(((correctAnswers * 100) / totalAnswers)) || 0;

  useEffect(() => {
    if (user.name) {
      dispatch(getStatistic({ userId: user.id, token: user.token }));
      dispatch(getAllWords(user));
      getAllAggregatedWords(user, {
        filter: '{"$and":[{"userWord.optional.learned":true}]}',
      }).then((res) => {
        const totalCount = res[0].totalCount[0]?.count || 0;
        setLearnedWords(totalCount);
      });
    }
  }, []);

  // const data = [
  //   {
  //     date: '17.02',
  //     newWords: 15,
  //     learnedWords: 3,
  //   },
  //   {
  //     date: '18.02',
  //     newWords: 8,
  //     learnedWords: 6,
  //   },
  //   {
  //     date: '19.02',
  //     newWords: 19,
  //     learnedWords: 4,
  //   },
  //   {
  //     date: '20.02',
  //     newWords: 4,
  //     learnedWords: 9,
  //   },
  //   {
  //     date: '21.02',
  //     newWords: 66,
  //     learnedWords: 5,
  //   },
  //   {
  //     date: '22.02',
  //     newWords: 31,
  //     learnedWords: 19,
  //   },
  //   {
  //     date: '23.02',
  //     newWords: 18,
  //     learnedWords: 12,
  //   },
  //   {
  //     date: '24.02',
  //     newWords: 15,
  //     learnedWords: 15,
  //   },
  //   {
  //     date: '25.02',
  //     newWords: 5,
  //     learnedWords: 20,
  //   },
  //   {
  //     date: '26.02',
  //     newWords: 19,
  //     learnedWords: 13,
  //   },
  //   {
  //     date: '27.02',
  //     newWords: 23,
  //     learnedWords: 21,
  //   },
  // ];

  return (
    <Container
      maxWidth={false}
      className="main"
      sx={{
        height: 'calc(100vh - 120px)',
        overflowY: 'auto',
      }}
    >
      <Container
        maxWidth="lg"
        className="main stat"
        sx={{
          height: 'calc(100vh - 120px)',
        }}
      >
        {
      user.name
        ? (
          <>
            <h2>Статистика за последний день</h2>
            <Grid
              container
            >
              <Grid item xs={4} className="stat__grid-item">
                <StyledStatsCard>
                  <CardContent sx={{
                    fontSize: '70px',
                    fontWeight: 'bold',
                  }}
                  >
                    {learnedWords}
                  </CardContent>
                  <CardContent sx={{
                    fontSize: '24px',
                  }}
                  >
                    <p style={{ fontSize: '30px' }}>СЛОВ</p>
                    <p style={{ fontSize: '30px' }}>изучено</p>
                  </CardContent>
                </StyledStatsCard>
              </Grid>
              <Grid item xs={4} className="stat__grid-item">
                <StyledStatsCard>
                  <CardContent sx={{
                    fontSize: '70px',
                    fontWeight: 'bold',
                  }}
                  >
                    {newWords}
                  </CardContent>
                  <CardContent sx={{
                    fontSize: '24px',
                  }}
                  >
                    <p style={{ fontSize: '30px' }}>НОВЫХ</p>
                    <p style={{ fontSize: '30px' }}>слов</p>
                  </CardContent>
                </StyledStatsCard>
              </Grid>
              <Grid item xs={4} className="stat__grid-item">
                <StyledStatsCard>
                  <CardContent>
                    <CircularProgressWithLabel value={totalPercents} />
                  </CardContent>
                  <CardContent>
                    <p style={{ fontSize: '26px' }}>ПРОЦЕНТ</p>
                    <p style={{ fontSize: '22px' }}>правильных ответов</p>
                  </CardContent>
                </StyledStatsCard>
              </Grid>
              <Grid item xs={6} className="stat__grid-item">
                <StyledStatsCard>
                  <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'cecnter',
                    alignItems: 'center',
                  }}
                  >
                    <img src={sprint} alt="sprint" className="game-icon" />
                    <p style={{
                      fontSize: '26px',
                    }}
                    >
                      Спринт
                    </p>
                  </CardContent>
                  <CardContent sx={{
                    display: 'flex',
                    minHeight: '120px',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '50%',
                  }}
                  >
                    <p className="stat_game-stat">
                      <span>{userStatistic.optional.short.sprint?.newWords}</span>
                      {' '}
                      новых слов
                    </p>
                    <p className="stat_game-stat">
                      <span>
                        {userStatistic.optional.short.sprint?.percents}
                        {' '}
                        %
                      </span>
                      правильных ответов
                    </p>
                    <p className="stat_game-stat">
                      <span>{userStatistic.optional.short.sprint?.inARow}</span>
                      {' '}
                      лучшая серия
                    </p>
                  </CardContent>
                </StyledStatsCard>
              </Grid>
              <Grid item xs={6} className="stat__grid-item">
                <StyledStatsCard>
                  <CardContent sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'cecnter',
                    alignItems: 'center',
                  }}
                  >
                    <img src={sound} alt="sprint" className="game-icon" />
                    <p style={{
                      fontSize: '26px',
                    }}
                    >
                      Аудиовызов
                    </p>
                  </CardContent>
                  <CardContent sx={{
                    display: 'flex',
                    minHeight: '120px',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    width: '50%',
                  }}
                  >
                    <p className="stat_game-stat">
                      <span>{userStatistic.optional.short.audio?.newWords}</span>
                      {' '}
                      новых слов
                    </p>
                    <p className="stat_game-stat">
                      <span>
                        {userStatistic.optional.short.audio?.percents}
                        {' '}
                        %
                      </span>
                      правильных ответов
                    </p>
                    <p className="stat_game-stat">
                      <span>{userStatistic.optional.short.audio?.inARow}</span>
                      {' '}
                      лучшая серия
                    </p>
                  </CardContent>
                </StyledStatsCard>
              </Grid>
            </Grid>
            <h2>Общая статистика</h2>
            <Grid
              container
              spacing={4}
            >
              <Grid item xs={6} className="stat__grid-item_long">
                <LongStatistic data={userStatistic.optional.long.stat} />
                {/* <LongStatistic data={data} /> */}
              </Grid>
              <Grid item xs={6} className="stat__grid-item_long">
                <LongStatisticLearned data={userStatistic.optional.long.stat} />
                {/* <LongStatisticLearned data={data} /> */}
              </Grid>
            </Grid>
          </>
        )
        : (
          <Dialog
            open
            onClose={() => navigate('/')}
          >
            <DialogTitle>
              Статистика доступна только для авторизованных пользователей
            </DialogTitle>
            <DialogActions>
              <Button onClick={() => navigate('/')} variant="contained">Закрыть</Button>
            </DialogActions>
          </Dialog>
        )
    }
      </Container>
    </Container>
  );
}
