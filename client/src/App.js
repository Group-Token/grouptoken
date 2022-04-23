import React, { useEffect, useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/';
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setKey } from './features/publicKey/publicKeySlice';
import LoadingPage from './components/LoadingPage/LoadingPage';

function App() {
  const publicKey = useSelector(state => state.publicKey.value);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ("solana" in window) {
      window.solana.connect({ onlyIfTrusted: true }).then(
        ({ publicKey }) => {
          dispatch(setKey(publicKey.toBase58()));
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      ).catch(
        (err) => {
          console.log(err);
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      );
    } else {
      window.open("https://phantom.app/", "_blank");
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  });

  return (
    <div className="App">
      {
        loading ? (
          <LoadingPage />
        ) : (
          <Routes>
            <Route path="/" element={publicKey == null ? <LandingPage/> : <><h1>Key: {publicKey.payload}</h1></>} />
          </Routes>
        )
      }
    </div>
  );
}

export default App;
