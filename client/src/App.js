import React, { useEffect, useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/';
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setKey } from './features/publicKey/publicKeySlice';
import { setAccount } from './features/account/accountSlice';
import LoadingPage from './components/LoadingPage/LoadingPage';
import Dashboard from './components/Dashboard';
import DashboardNavbar from './components/DashboardNavbar';

function App() {
  const publicKey = useSelector(state => state.publicKey.value);
  const account = useSelector(state => state.account.value);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getPublicKeyFromWindowIfTrusted = () => {
    console.log('Getting Public Key');
    window.solana.connect({ onlyIfTrusted: true }).then(
      (publicKey) => {
        if (publicKey) {
          dispatch(setKey(publicKey.toBase58()));
        }
        setLoading(false);
      }
    ).catch(
      (err) => {
        console.log(err);
        setLoading(false);
      }
    );
  }

  const fetchAndSetAccount = async () => {
    console.log('Fetching Account For ' + publicKey.payload);
    fetch(`/api/v1/users/${publicKey.payload}`).then(response => response.json())
    .then(
      (data) => {
        console.log(data);
        dispatch(setAccount(data));
        setLoading(false);
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    )
  }

  useEffect(() => {
    if (publicKey == null && 'solana' in window) {
      setLoading(true);
      getPublicKeyFromWindowIfTrusted();
    } else if (publicKey != null && account == null ) {
      setLoading(true);
      fetchAndSetAccount();
    } else {
      setLoading(false);
    }
  }, [publicKey])

  return (
    <div className="App">
      {
        loading ? (
          <LoadingPage />
        ) : (
          <>
            {
              account == null ?
              <Routes>
                <Route path='/' element={<LandingPage/>} />
              </Routes>
              :
              <>
                <DashboardNavbar />
                <Routes>
                  <Route path='/' element={<Dashboard/>} />
                </Routes>
              </>
            }
          </>
        )
      }
    </div>
  );
}

export default App;
