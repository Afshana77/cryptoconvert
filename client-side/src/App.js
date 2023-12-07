// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import CryptoConverterPage from './components/CryptoConverterPage';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}>
      
      {/* /conver-currency */}
      </Route>
      <Route path="conver-currency" element={<CryptoConverterPage />}></Route>
    </Routes>
  </BrowserRouter>


  );
}

export default App;
