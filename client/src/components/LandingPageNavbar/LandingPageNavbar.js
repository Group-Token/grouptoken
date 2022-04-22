import React from 'react';
import styles from './LandingPageNavbar.module.css';
import { Link } from 'react-router-dom';
import ConnectWalletButton from '../ConnectWalletButton';

const LandingPageNavbar = () => {
  return (
    <div className={styles.landingPageNavbar}>
      <Link to='/'>
        <img src='/assets/logo.svg' alt='Group Token Logo' height='40px'/>
      </Link>
      <ConnectWalletButton />
    </div>
  );
}

export default LandingPageNavbar;
