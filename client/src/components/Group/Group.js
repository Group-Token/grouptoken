import React from 'react';
import styles from './Group.module.css';
import { Link } from 'react-router-dom';

const Group = ({ group }) => {
  return (
    <div className={styles.group}>
      <img className={styles.groupImage} src={group.imageURL} alt={group.name}/>
      <h1 className={styles.groupName}>{group.name}</h1>
      <Link to={`/groups/${group.id}`} className={styles.viewGroupButton}>VIEW</Link>
    </div>
  );
}

export default Group;
