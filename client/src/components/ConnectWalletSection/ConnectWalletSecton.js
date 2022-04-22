import React from 'react';
import ConnectWalletButton from '../ConnectWalletButton';
import styles from './ConnectWalletSection.module.css';

const ConnectWalletSection = () => {
  return (
    <div className={styles.connectWalletSection}>
      <img src='/assets/icon.svg' alt='Group Token Icon' className={styles.icon}/>
      <ConnectWalletButton />
    </div>
  );
}

export default ConnectWalletSection;
