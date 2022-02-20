import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import AudioChallenge from './components/AudioChallenge/audio-challenge-main';
import GamePage from './components/AudioChallenge/game-page';
import StatisticPage from './components/Statistic/StatisticPage';
import SprintGame from './components/Sprint/SprintGame';
import GameDifficulty from './components/GamesFromMenu/GameDifficulty';
import Textbook from './components/Textbook/textbook';
import TextBookFinal from './components/Textbook/component-for-app';
import LearnedPage from './components/LearnedWords/LearnedPage';
import DeletedPage from './components/DeletedWords/DeletedPage';
import DifficultPage from './components/DifficultWords/DifficultPage';

function App() {
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
        <Route path="/game/audio" element={<AudioChallenge />} />
        <Route path="/game/audio/:group/:page" element={<GamePage />} />
        <Route path="/statistic" element={<StatisticPage />} />
        <Route path="/dictionary/learned" element={<LearnedPage />} />
        <Route path="/dictionary/difficult" element={<DifficultPage />} />
        <Route path="/dictionary/deleted" element={<DeletedPage />} />
        <Route path="/game/sprint/:group/:page" element={<SprintGame />} />
        <Route path="/game/sprint/difficult" element={<SprintGame />} />
        <Route path="/gamedif" element={<GameDifficulty />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
