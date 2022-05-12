import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './GroupsPage.module.css';
import Group from '../Group/';

const GroupsPage = () => {
  const account = useSelector(state => state.account.value);

  return (
    <div className={styles.groupsPage}>
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h1 className={styles.sectionTitle}>YOUR GROUPS</h1>
          <Link to='/groups/new' className={styles.sectionButton}>+</Link>
        </div>
        <dic className={styles.groups}>
          {account.payload.groups.map((group) => {
            return (
              <Group group={group} />
            )
          })}
        </dic>
      </div>
    </div>
  );
}

export default GroupsPage;
