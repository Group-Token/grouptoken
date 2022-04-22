import React from 'react';
import styles from './ConnectWalletButton.module.css';

const ConnectWalletButton = () => {
  const connectWallet = () => {
    console.log('Connect Wallet');
  }

  return (
    <button className={styles.walletButton} onClick={() => connectWallet()}>CONNECT WALLET</button>
  );
}

export default ConnectWalletButton;
