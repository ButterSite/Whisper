import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { encryptMessage } from '../assets/encryption';
import {
  SendButton,
  ChatContainer,
  MessageTo,
  MessageContainer,
  StyledInput,
  InputContainer,
  StyledMessage,
  LargeIcon,
  BaseIcon,
} from '../styles';
import io from 'socket.io-client';

const Message = ({ username, message }) => {
  return (
    <StyledMessage>
      <b>{username}</b>
      <p>{message}</p>
    </StyledMessage>
  );
};

export const Messages = ({ recipient, messages, setMessages }) => {
  const [encryption, setEncryption] = useState(true);
  const socketRef = useRef(null);
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState('');

  const handleEncryption = () => {
    setEncryption(!encryption);
  };

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/');
      return;
    }

    socketRef.current = io('http://localhost:3001', {
      auth: { token },
    });


    socketRef.current.on('privateMessage', (msg) => {
      const message = { user: msg.user, msg: msg.msg };
      setMessages((prev) => [...prev, message]);
    });

    socketRef.current.on('connect_error', () => {
      // localStorage.removeItem('jwtToken');
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  const messagesToShow = useMemo(() => {
    if (!recipient) return [];
    return messages.filter(
      (message) =>
        message.user === recipient.username ||
        (message.user === 'You' && message.to === recipient.username)
    );
  }, [recipient, messages]);

  const sendMessage = async () => {
    try {
      if (newMessage.trim()) {
        const { username, publicKey } = recipient;
        let finalMessage = newMessage;
        if (encryption) {
          finalMessage = await encryptMessage(publicKey, newMessage);
        }
        const data = {
          recipient: username,
          message: finalMessage,
        };
        socketRef.current.emit('privateMessage', data);
        const message = { user: 'You', to: username, msg: finalMessage };
        setMessages((prev) => [...prev, message]);
        setNewMessage('');
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <ChatContainer>
      <MessageTo>
        <BaseIcon>identity_platform</BaseIcon>
        <p>{recipient && recipient.username ? recipient.username : ''}</p>
      </MessageTo>
      <MessageContainer>
        {messagesToShow.map((message, index) => (
          <Message key={index} username={message.user} message={message.msg} />
        ))}
      </MessageContainer>
      <InputContainer>
        <StyledInput
          disabled={!recipient}
          value={newMessage}
          placeholder="Type your message..."
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <LargeIcon onClick={handleEncryption}>{encryption ? 'lock' : 'lock_open'}</LargeIcon>
        <SendButton disabled={!recipient} onClick={sendMessage}>
          <LargeIcon>send</LargeIcon>
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};