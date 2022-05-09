import React from 'react';
import styles from './Dashboard.module.css';
import { useSelector, useDispatch } from 'react-redux';

const Dashboard = () => {
  const account = useSelector(state => state.account.value);

  return (
    <div className={styles.dashboard}>
      <h1>{account.payload.username}</h1>
    </div>
  );
}

export default Dashboard;
