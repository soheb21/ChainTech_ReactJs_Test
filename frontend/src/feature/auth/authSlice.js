import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register } from "./authAPI";

const initialState = {
    authUser: null,
    status: "idle",
    error: null
};

export const registerAsync = createAsyncThunk("register/user", async (data, { rejectWithValue }) => {
    try {
        const res = await register(data);
        return res;

    } catch (error) {
        const serverMssg = error.response
        if (serverMssg) {
            return rejectWithValue(serverMssg.data.message)
        }
        else {
            throw "something went wrong"
        }


    }
})
export const loginAsync = createAsyncThunk("login/user", async (data, { rejectWithValue }) => {
    try {
        const res = await login(data);
        return res;

    } catch (error) {
        const serverMssg = error.response
        if (serverMssg) {
            return rejectWithValue(serverMssg.data.message)
        }
        else {
            throw "something went wrong"
        }

    }
})
export const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(registerAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(registerAsync.fulfilled, (state, action) => {
                state.status = "success";
                state.authUser = action.payload;
            })
            .addCase(registerAsync.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload;
            })
            .addCase(loginAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(loginAsync.fulfilled, (state, action) => {
                state.status = "success";
                state.authUser = action.payload;
            })
            .addCase(loginAsync.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload;
            })


    }


});

export const selectAuth = (state) => state.auth.authUser;
export const selectAuthError = (state) => state.auth.error;
export const selectAuthStatus = (state) => state.auth.status;


export default authSlice.reducer;