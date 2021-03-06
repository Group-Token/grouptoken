import React, { useEffect, useState } from 'react';
import './App.css';
import LandingPage from './components/LandingPage/';
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setKey } from './features/publicKey/publicKeySlice';
import { setAccount } from './features/account/accountSlice';
import LoadingPage from './components/LoadingPage/LoadingPage';
import Dashboard from './components/Dashboard';
import DashboardNavbar from './components/DashboardNavbar';
import GroupsPage from './components/GroupsPage';
import NewGroupPage from './components/NewGroupPage';
import GroupPage from './components/GroupPage';

function App() {
  const publicKey = useSelector(state => state.publicKey.value);
  const account = useSelector(state => state.account.value);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const getPublicKeyFromWindowIfTrusted = () => {
    console.log('Getting Public Key');
    window.solana.connect({ onlyIfTrusted: true }).then(
      (publicKey) => {
        if (publicKey.toBase58()) {
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
                <Route path='/' element={<LandingPage />} />
                <Route exact path='*' element={<Navigate to='/' />} />
              </Routes>
              :
              <>
                <DashboardNavbar />
                <Routes>
                  <Route path='/' element={<Dashboard/>} />
                  <Route path='/groups' element={<GroupsPage />} />
                  <Route path='/groups/new' element={<NewGroupPage />} />
                  <Route path='/groups/:id' element={<GroupPage />} />
                  <Route exact path='*' element={<Navigate to='/' />} />
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
