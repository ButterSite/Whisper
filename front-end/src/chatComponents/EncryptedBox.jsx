import React, { useState } from 'react';
import { decryptObject } from '../assets/encryption';
import { EncryptedBoxContainer, EncryptedBoxIcon, EncryptedBoxInput, FriendsInputContainer, EncryptedBoxConfirmButton } from '../styles';

export const EncryptedBox = ({ encryptionType, encryptedList, setList, setUnlock }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const decryptList = async () => {
    if (!password) {
      setError('Password is required');
      return;
    }
    const decryptedList = await decryptObject(encryptedList, password);
    if (!decryptedList) {
      setError('Wrong password');
      return;
    }
    setList(decryptedList);
    setUnlock(true);
    setError('');
  };

  return (
    <EncryptedBoxContainer>
      <p>
        {encryptionType} <br />please provide the password
      </p>
      <EncryptedBoxIcon className="material-symbols-outlined">encrypted</EncryptedBoxIcon>
      <FriendsInputContainer>
        <EncryptedBoxInput
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          value={password}
        />
        <EncryptedBoxConfirmButton onClick={decryptList}>Confirm</EncryptedBoxConfirmButton>
      </FriendsInputContainer>
      {error && <span>{error}</span>}
    </EncryptedBoxContainer>
  );
};