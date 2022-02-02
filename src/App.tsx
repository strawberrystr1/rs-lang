import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import EmptyPage from './components/EmptyPage';
import StatisticPage from './components/Statistic/StatisticPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/textbook" element={<EmptyPage />} />
        <Route path="/dictionary/difficult" element={<EmptyPage />} />
        <Route path="/dictionary/learned" element={<EmptyPage />} />
        <Route path="/dictionary/deleted" element={<EmptyPage />} />
        <Route path="/statistic" element={<StatisticPage />} />
        <Route path="/game/audio" element={<EmptyPage />} />
        <Route path="/game/sprint" element={<EmptyPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
