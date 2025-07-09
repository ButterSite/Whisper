import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import fetchApi from './assets/apiFetcher';
import { NavigationBar } from './chatComponents/NavigationBar';
import { Messages } from './chatComponents/Messages';
import { ChatSectionContainer } from './styles';



export const ChatSection = () => {
  const apiFetcher = new fetchApi()
  const [messages,setMessages] = useState([
    
  ]);
  const [recipient, setRecipient] = useState(``);
  const socketRef = useRef(null);

 


return (
  <ChatSectionContainer>
    <NavigationBar recipient={recipient} setRecipient={setRecipient}></NavigationBar>
    <Messages setMessages={setMessages} socketRef={socketRef} recipient={recipient} messages={messages}></Messages>
  </ChatSectionContainer>
  
)
}
