import React, { useEffect, useState } from 'react';
import LoadingPage from '../LoadingPage';
import { useParams } from 'react-router';
import styles from './GroupPage.module.css';
import Token from '../Token';

const GroupPage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [group, setGroup] = useState(null);

  useEffect(() => {
    fetch(`/api/v1/groups/${id}`).then(response => response.json())
    .then(
      (data) => {
        setGroup(data);
        setLoading(false);
      }
    ).catch((err) => {console.log(err)});
  }, [id]);

  return (
   <>
    { loading ? <LoadingPage /> :
      <div className={styles.groupPage}>
        <img src={group.imageURL} className={styles.groupImage} alt={group.name}/>
        <div className={styles.groupInfo}>
          <h1 className={styles.groupName}>{group.name}</h1>
          <p className={styles.groupDescription}>{group.description}</p>
        </div>
        <h2 className={styles.tokensName}>TOKENS</h2>
        <div className={styles.tokens}>
          {
            group.tokens.map((token) => {
              return (
                <Token token={token} />
              );
            })
          }
        </div>
      </div>
    }
   </>
  );
}

export default GroupPage;
