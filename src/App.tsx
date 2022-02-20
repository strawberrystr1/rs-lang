import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import EmptyPage from './components/EmptyPage';
import StatisticPage from './components/Statistic/StatisticPage';
import SprintGame from './components/Sprint/SprintGame';
import GameDifficulty from './components/GamesFromMenu/GameDifficulty';
import Textbook from './components/Textbook/textbook';
import TextBookFinal from './components/Textbook/component-for-app';
import LearnedPage from './components/LearnedWords/LearnedPage';
import DeletedPage from './components/DeletedWords/DeletedPage';
import DifficultPage from './components/DifficultWords/DifficultPage';
import { RootState } from './redux/store';
import { getStatistic, updateStatistic } from './redux/userState/statisticSlice';
import { getAllWords } from './redux/userState/wordsSlice';
import { ILongStatsItem } from './interfaces/apiInterfaces';

function App() {
  const { user, userStatistic } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user.name) {
      dispatch(getStatistic({ userId: user.id, token: user.token }));
      dispatch(getAllWords(user));
      const lastDate = new Date(userStatistic.optional.short.lastDate).getDate();
      const todayDate = (new Date()).getDate();

      if ((lastDate !== todayDate)) {
        const date = `${(new Date()).getDate()}.${(new Date()).getMonth() + 1}`;
        const newWords = (userStatistic.optional.short.sprint?.newWords || 0)
          + (userStatistic.optional.short.audio?.newWords || 0);
        const longAddition: ILongStatsItem = {
          date,
          newWords,
          learnedWords: 0,
        };
        dispatch(updateStatistic({
          userId: user.id,
          token: user.token,
          optional: {
            learnedWords: 0,
            optional: {
              short: {
                lastDate: Date.now(),
                sprint: {
                  newWords: 0,
                  inARow: 0,
                  percents: 0,
                  correctAnswers: 0,
                  allAnswers: 0,
                },
              },
              long: {
                stat: [...userStatistic.optional.long.stat, longAddition],
              },
            },
          },
        }));
      }
    }
  }, []);
  return (
    <div style={{
      overflowY: 'auto',
    }}
    >
      <Header isAuthOpenProp={false} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<Header isAuthOpenProp />} />
        <Route path="/textbook" element={<Textbook />} />
        <Route path="/textbook/:group/:page" element={<TextBookFinal />} />
        <Route path="/statistic" element={<StatisticPage />} />
        <Route path="/dictionary/learned" element={<LearnedPage />} />
        <Route path="/dictionary/difficult" element={<DifficultPage />} />
        <Route path="/dictionary/deleted" element={<DeletedPage />} />
        <Route path="/game/audio" element={<EmptyPage />} />
        <Route path="/game/sprint/:group/:page" element={<SprintGame />} />
        <Route path="/game/sprint/difficult" element={<SprintGame />} />
        <Route path="/gamedif" element={<GameDifficulty />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
