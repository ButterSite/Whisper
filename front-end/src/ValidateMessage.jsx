
import React, {useState} from 'react';
import {ValidateContainer,TextAreaContainer,TextArea,ButtonsContainer, ValidateButton}from "./styles"
import fetchApi from './assets/apiFetcher';
import { useNavigate } from 'react-router-dom';
export function ValidateMessage(props) {

    const [messageState,setMessageState] = useState('');
    const [usernameState,setUsernameState] = useState(props.username);
    const apiFetcher = new fetchApi();
    const navigate = useNavigate()
    async function handleMessage() {
        const {success, token} = await apiFetcher.verifyAuth(usernameState,messageState)
        console.log(usernameState, messageState)
        if(success) {
            localStorage.setItem(`jwtToken`,token);
            navigate(`/chat`);
        }

    }

    return (
        <ValidateContainer>
            <b>Decrypt the message and paste it.</b>
            <TextAreaContainer>

                <TextArea
                readOnly
                placeholder='Your encrypted message.'
                value={props.message}
                >
                </TextArea>

                <TextArea
                placeholder='Paste here decrypted message...'
                onChange={(e) => {setMessageState(e.target.value); console.log(` message: ${messageState}`)}}
                >
                
                </TextArea>
            </TextAreaContainer>
            <ButtonsContainer>
                <ValidateButton onClick={handleMessage}>Done!</ValidateButton>
                <ValidateButton onClick={props.onClose}>Close</ValidateButton>
            </ButtonsContainer>

        </ValidateContainer>
    )
}

