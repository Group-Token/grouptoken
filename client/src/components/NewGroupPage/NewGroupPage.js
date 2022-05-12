import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styles from './NewGroupPage.module.css';
import LoadingPage from '../LoadingPage';

const NewGroupPage = () => {
  const navigate = useNavigate();
  const account = useSelector(state => state.account.value);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [description, setDescription] = useState('');
  const [tokenAddresses, setTokenAddresses] = useState(['']);

  const handleTokenAddressChange = (index, event) => {
    const addresses = tokenAddresses;
    addresses[index] = event.target.value;
    setTokenAddresses([...addresses]);
  }

  const addTokenAddress = () => {
    setTokenAddresses([...tokenAddresses, '']);
  }

  const createGroup = (group) => {
    setLoading(true);
    fetch('/api/v1/groups/', {
      method: 'POST',
      body: JSON.stringify(group),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
    .then(
      (data) => {
        console.log(data);
        if (data.status === 'success') {
          navigate(`/groups/${data.id}`);
        }
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    )
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const group = {
      userId: account.payload.id,
      name: name,
      imageURL: imageURL,
      description: description,
      tokenAddresses: tokenAddresses,
    }
    createGroup(group);
  }

  return (
    <>
      { loading ? <LoadingPage /> :
          <div className={styles.newGroupPage}>
            <div className={styles.section}>
              <h1 className={styles.sectionTitle}>NEW GROUP</h1>
              <form className={styles.form} onSubmit={(e) => {handleSubmit(e)}}>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder='NAME' required className={styles.groupInput} />
                <input value={imageURL} onChange={(e) => setImageURL(e.target.value)} placeholder='IMAGE URL' required className={styles.groupInput} />
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder='DESCRIPTION' required className={styles.groupTextarea}></textarea>
                <h2 className={styles.label}>TOKENS</h2>
                {tokenAddresses.map((address, index) => {
                  return (
                    <input key={index} value={address} required onChange={(e) => handleTokenAddressChange(index, e)} placeholder='TOKEN ADDRESS' className={styles.groupInput} />
                  );
                })}
                <button type='button' className={styles.addTokenButton} onClick={() => addTokenAddress()}>+</button>
                <button type='submit' className={styles.groupSubmit}>CREATE GROUP</button>
              </form>
            </div>
          </div>
      }
    </>
  );
}

export default NewGroupPage;
