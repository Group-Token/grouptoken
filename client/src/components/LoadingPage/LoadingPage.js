import React from 'react';
import styles from './LoadingPage.module.css';

const LoadingPage = () => {
  return (
    <div className={styles.loadingPage}>
      <img src='/assets/icon.svg' alt='Group Token Icon' className={styles.icon}/>
    </div>
  );
}

export default LoadingPage;
