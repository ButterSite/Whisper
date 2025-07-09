import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EncryptedBox } from './EncryptedBox';
import { FriendContainer, UserInfo, RecipientsContainer, NoFriendsContainer, LargeIcon, FlexColumnContainer, ScrollContainer } from '../styles';
import { EncryptFriends } from './EncryptFriends';
import { setFriends, setUnlock } from '../store/friendsSlice';
import fetchApi from '../assets/apiFetcher';

const Friend = ({ user, isActive, setRecipient, recipient }) => {
  const handleClick = () => {
    setRecipient(user);
  };

  return (
    <FriendContainer $isSelected={recipient?.username === user.username} onClick={handleClick}>
      <div>
        <LargeIcon>identity_platform</LargeIcon>
      </div>
      <UserInfo>
        <p>{user.username}</p>
        <p>{isActive}</p>
      </UserInfo>
    </FriendContainer>
  );
};

export const FriendList = ({ setRecipient, recipient }) => {
  const dispatch = useDispatch();
  const isUnlocked = useSelector((state) => state.friends.isUnlocked);
  const friends = useSelector((state) => state.friends.list);
  const [listEncrypted, setListEncrypted] = useState();
  const apiFetcher = new fetchApi();

  const getList = async () => {
    const { isEncrypted, friendsList } = await apiFetcher.getFriends();
    if (isEncrypted) {
      setListEncrypted(friendsList);
      dispatch(setUnlock(false));
    } else {
      dispatch(setFriends(friendsList));
      dispatch(setUnlock(true));
    }
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      {isUnlocked ? (
        friends.length > 0 ? (
          <>
          <RecipientsContainer>
            {friends.map((user, index) => (
              <Friend
                recipient={recipient}
                setRecipient={setRecipient}
                key={index}
                user={user}
                isActive="Active"
              />
            ))}
           <EncryptFriends>
            
          </EncryptFriends>
          </RecipientsContainer>
          </>

        ) : (
          <NoFriendsContainer>
            <p>Start talking safely with your friends!</p>
          </NoFriendsContainer>
        )
      ) : (
        <EncryptedBox
          setList={(data) => dispatch(setFriends(data))}
          setUnlock={(data) => dispatch(setUnlock(data))}
          encryptionType="Your friends list is encrypted"
          encryptedList={listEncrypted}
        />
      )}
    </>
  );
};