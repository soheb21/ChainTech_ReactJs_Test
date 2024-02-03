import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth/authSlice"
import userInfoReducer from "../feature//userInfo/userInfoSlice"

export const store = configureStore({
    reducer: {
        auth: authReducer,
        userInformation: userInfoReducer
    },
});