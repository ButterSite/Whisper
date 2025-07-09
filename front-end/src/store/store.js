import friendsReducer from "./friendsSlice";
import { configureStore } from "@reduxjs/toolkit";



const store = configureStore({
    reducer: {
        friends: friendsReducer
    }
})


export default store;