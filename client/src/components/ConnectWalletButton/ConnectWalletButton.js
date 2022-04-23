import React from 'react';
import styles from './ConnectWalletButton.module.css';
import { useDispatch } from 'react-redux';
import { setKey } from '../../features/publicKey/publicKeySlice';

const ConnectWalletButton = () => {
  const dispatch = useDispatch();

  const connectWallet = () => {
    if("solana" in window) {
      window.solana.connect().then(
        ({ publicKey }) => {
          dispatch(setKey(publicKey.toBase58()));
        }
      );
    } else {
      window.open("https://phantom.app/", "_blank");
    }
  }

  return (
    <button className={styles.walletButton} onClick={() => connectWallet()}>CONNECT WALLET</button>
  );
}

export default ConnectWalletButton;
