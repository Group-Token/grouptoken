import React from 'react';
import { Link } from 'react-router-dom';
import styles from './DashboardNavbar.module.css';
import { useSelector } from 'react-redux';

const DashboardNavbar = () => {
  const account = useSelector(state => state.account.value);

  return (
    <nav className={styles.dashboardNavbar}>
      <Link to='/' className={styles.navbarBrand}>
        <img src='/assets/logo-alt.svg' alt='Group Token Logo' height='40px'/>
      </Link>
      <div className={styles.navlinks}>
        <Link className={styles.navlink} to='/'>DASHBOARD</Link>
        <Link className={styles.navlink} to='/groups'>GROUPS</Link>
        <Link to='/account'>
          <img className={styles.avatar} src={account.payload.imageURL} alt={account.payload.username} height='40px'/>
        </Link>
      </div>
    </nav>
  );
}

export default DashboardNavbar;
