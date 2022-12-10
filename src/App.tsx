import React from 'react';
import {Routes, Route} from 'react-router-dom'
import {HomePage} from './pages/HomePage'
import {FavoritesPage} from './pages/FavoritesPage'
import {Navigation} from './components/Navigation'

function App() {
  return (
    <div className="container max-w-5xl mx-auto">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
}

export default App;
