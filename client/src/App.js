import React from 'react';
import './App.css';
import LandingPage from './components/LandingPage/';
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="App">
       <Routes>
        <Route path="/" element={<LandingPage/>} />
       </Routes>
    </div>
  );
}

export default App;
