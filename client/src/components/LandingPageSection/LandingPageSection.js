import React from 'react';
import styles from './LandingPageSection.module.css';

const LandingPageSection = ({text}) => {
  return(
    <div className={styles.landingPageSection}>
      <h1 className={styles.text}>{text}</h1>
    </div>
  );
}

export default LandingPageSection;
