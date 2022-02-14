import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import EmptyPage from './components/EmptyPage';
import SprintGame from './components/Sprint/SprintGame';
import GameDifficulty from './components/GamesFromMenu/GameDifficulty';
import Textbook from './components/Textbook/textbook';
import TextBookFinal from './components/Textbook/component-for-app';

function App() {
  return (
    <>
      <Header isAuthOpenProp={false} />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/signin" element={<Header isAuthOpenProp />} />
        <Route path="/textbook" element={<Textbook />} />
        <Route path="/textbook/:group/:page" element={<TextBookFinal />} />
        <Route path="/dictionary/difficult" element={<EmptyPage />} />
        <Route path="/dictionary/learned" element={<EmptyPage />} />
        <Route path="/dictionary/deleted" element={<EmptyPage />} />
        <Route path="/statistic" element={<EmptyPage />} />
        <Route path="/game/audio" element={<EmptyPage />} />
        <Route path="/game/sprint/:group/:page" element={<SprintGame />} />
        <Route path="/gamedif" element={<GameDifficulty />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
