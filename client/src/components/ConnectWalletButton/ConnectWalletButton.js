import React from 'react';
import styles from './ConnectWalletButton.module.css';

const ConnectWalletButton = () => {
  const connectWallet = () => {
    window.solana.connect().then(
      (res) => {
        console.log(res.publicKey.toBase58());
      }
    );
  }

  return (
    <button className={styles.walletButton} onClick={() => connectWallet()}>CONNECT WALLET</button>
  );
}

export default ConnectWalletButton;
