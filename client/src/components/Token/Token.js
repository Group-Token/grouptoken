import React from 'react';
import styles from './Token.module.css';

const Token = ({ token }) => {
  return (
    <div className={styles.token}>
      <img className={styles.tokenImage} src={token.imageURL} alt={token.name}/>
      <h1 className={styles.tokenName}>{token.name}</h1>
    </div>
  );
}

export default Token;
