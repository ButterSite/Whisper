import React from "react"
import { useState} from "react"
import fetchApi from "../assets/apiFetcher";
import { addFriend } from "../store/friendsSlice";
import { useDispatch, useSelector } from "react-redux";
import { EncryptedBox } from "./EncryptedBox";
import { FoundedUserContainer, UserInfo, UserSearchContainer, SearchButton,SearchInput,LargeIcon } from "../styles";
const User = ({username,publicKey, apiFetcher}) => {
    const friends = useSelector(state => state.friends.list);
    const dispatch = useDispatch()
    
    const handleAddFriend = async () => {
        try {
            const newFriend = {username: username, publicKey: publicKey};
            const friendExist = friends.some(friend => friend.username === username)
            if(friendExist) {
                // ERROR
                return;
            }
            dispatch(addFriend(newFriend));
            const friendsList = [...friends, newFriend];
            // const encryptedObject = await encryptObject(friendsList,`qwerty`);
            const {success, message} = await apiFetcher.addFriend(newFriend);
            console.log(success,message);
            if(!success) return false;
        }catch(error) {
            throw error
        }



    }

    


    return (
        <>
        <FoundedUserContainer onClick={handleAddFriend}>
        <div>
            <LargeIcon data-testid="add-friend-icon">
            person_add
            </LargeIcon>
        </div>
        <UserInfo>
            <p>{username}</p>
        </UserInfo> 
        </FoundedUserContainer>
        </>
    )
}

export const SearchingUsers = ({setRecipient}) => {
    const isUnlocked = useSelector(state => state.friends.isUnlocked);
    const apiFetcher = new fetchApi();
    const [searchForUser,setSearchForUser] = useState();
    const [foundedUser, setFoundedUser] = useState([]);
    const [error,setError] = useState(``)
    async function searchUser() {
        if(!searchForUser) {
            setError(`Username not provided`);
            return;
        }
        const {recipient, publicKey}= await apiFetcher.getUser(searchForUser);
        if(recipient && publicKey) {
          setFoundedUser([{username: recipient, publicKey: publicKey}]);
        }
    }



    return (
        <>
            {isUnlocked ? 

            <UserSearchContainer>
            {foundedUser.map((user,index) => (
                <User key={index} apiFetcher={apiFetcher} username={user.username} publicKey={user.publicKey}></User>
            ))}
            <SearchInput 
            placeholder='Search user'
            onChange={(e) => {setSearchForUser(e.target.value)}}
            ></SearchInput>
            <SearchButton onClick={searchUser}>Search</SearchButton>
            <p>{error}</p>
            </UserSearchContainer> 
            : 
            <EncryptedBox encryptionType={`Your friends list is encrypted`}></EncryptedBox>
            }
        
        </>
  
    )
}