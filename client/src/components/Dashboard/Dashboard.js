import React from 'react';
import styles from './Dashboard.module.css';
import Token from '../Token';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const account = useSelector(state => state.account.value);

  return (
    <div className={styles.dashboard}>
      <section className={styles.section}>
        <h1 className={styles.sectionTitle}>YOUR TOKENS</h1>
        <div className={styles.tokens}>
          {account.payload.tokens.map((token) => {
            return (
              <Token token={token}/>
            )
          })}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
