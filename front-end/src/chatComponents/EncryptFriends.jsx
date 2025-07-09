import { useState} from 'react';
import { FriendsColumnContainer, EncryptedBoxInput, EncryptFriendsButton } from '../styles';
export const EncryptFriends = () => {


    return (
        <>
        <FriendsColumnContainer>
            <p>Want to encrypt your friends list?</p>
            <EncryptedBoxInput placeholder='Password'></EncryptedBoxInput>
            <EncryptedBoxInput placeholder='Repeat password'></EncryptedBoxInput>
            <EncryptFriendsButton>Encrypt</EncryptFriendsButton>
            <p>Provide the password to do this.</p>
        </FriendsColumnContainer>
        </>
    )
}