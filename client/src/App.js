import React, { useEffect, useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/';
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setKey } from './features/publicKey/publicKeySlice';
import { setAccount } from './features/account/accountSlice';
import LoadingPage from './components/LoadingPage/LoadingPage';
import Dashboard from './components/Dashboard';

function App() {
  const publicKey = useSelector(state => state.publicKey.value);
  const account = useSelector(state => state.account.value);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if ("solana" in window && publicKey == null) {
      window.solana.connect({ onlyIfTrusted: true }).then(
        ({ publicKey }) => {
          dispatch(setKey(publicKey.toBase58()));
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
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  });

  useEffect(() => {
    if (publicKey != null) {
      fetch(`/api/v1/users/${publicKey.payload}`)
      .then(response => response.json())
      .then((data) => {
        dispatch(setAccount(data));
        console.log(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(err => console.log(err));
    }
  }, [publicKey]);

  return (
    <div className="App">
      {
        loading ? (
          <LoadingPage />
        ) : (
          <Routes>
            <Route path="/" element={account == null ? <LandingPage/> : <Dashboard/>} />
          </Routes>
        )
      }
    </div>
  );
}

export default App;
