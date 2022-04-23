import React, { useEffect } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/';
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setKey } from './features/publicKey/publicKeySlice';

function App() {
  const publicKey = useSelector(state => state.publicKey.value);
  const dispatch = useDispatch();

  useEffect(() => {
    window.solana.connect({ onlyIfTrusted: true }).then(
      ({ publicKey }) => {
        dispatch(setKey(publicKey.toBase58()));
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  });

  return (
    <div className="App">
       <Routes>
        <Route path="/" element={publicKey == null ? <LandingPage/> : <><h1>Key: {publicKey.payload}</h1></>} />
       </Routes>
    </div>
  );
}

export default App;
