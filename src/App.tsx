import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import EmptyPage from './components/EmptyPage';
import Textbook from './components/Textbook/textbook';
import OutlinedCard from './components/Textbook/show-cards';
import BasicPagination from './components/Textbook/pagination';
import GameButtons from './components/Textbook/games';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/textbook" element={<Textbook />} />
        <Route
          path="/textbook/:group/:page"
          element={(
            <>
              <GameButtons />
              <BasicPagination />
              <OutlinedCard />
            </>
)}
        />
        <Route path="/dictionary/difficult" element={<EmptyPage />} />
        <Route path="/dictionary/learned" element={<EmptyPage />} />
        <Route path="/dictionary/deleted" element={<EmptyPage />} />
        <Route path="/statistic" element={<EmptyPage />} />
        <Route path="/game/audio" element={<EmptyPage />} />
        <Route path="/game/sprint" element={<EmptyPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
