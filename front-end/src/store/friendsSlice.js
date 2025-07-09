import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    list: [
    ],
    isUnlocked: true,
    isEncrypted: false

}



const friendsSlice = createSlice({
    name: `friends`,
    initialState,
    reducers: {

        addFriend: (state, action) => {
            const {username, publicKey} = action.payload;
            if(!username || !publicKey) return;
            state.list.push({username: username, publicKey: publicKey});
        }
        ,

        setFriends: (state, action) => {
            const friendsList = action.payload;
            if(!friendsList) return;
            state.list = friendsList;
        },

        setUnlock: (state,action) => {
            const boolean = action.payload
            state.isUnlocked = boolean
        },

        setIsEncrypted: (state,action) => {
            const boolean = action.payload
            state.isEncrypted = boolean
        }
    },
})


export const {addFriend, setFriends, setUnlock} = friendsSlice.actions;


export default friendsSlice.reducer;