import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createUserInfo, deleteUserInfo, editUserInfo, getUserInfo } from "./userInfoAPI";

const initialState = {
    userInfo: null,
    mssg: "idle",
    error: null
};

export const createUserInfoAsync = createAsyncThunk("CreateUserInfo/user", async (data, { rejectWithValue }) => {
    try {
        const res = await createUserInfo(data);
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
export const getUserInfoAsync = createAsyncThunk("getUserInfo/user", async (id, { rejectWithValue }) => {
    try {
        const res = await getUserInfo(id);
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
export const editUserInfoAsync = createAsyncThunk("editUserInfo/user", async (data, { rejectWithValue }) => {
    try {
        const res = await editUserInfo(data);
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
export const deleteUserInfoAsync = createAsyncThunk("deleteUserInfo/user", async (id, { rejectWithValue }) => {
    try {
        const res = await deleteUserInfo(id);
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
export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(createUserInfoAsync.pending, (state) => {
                state.mssg = "loading";
            })
            .addCase(createUserInfoAsync.fulfilled, (state,action) => {
                state.mssg = action.payload.message;
            })
            .addCase(createUserInfoAsync.rejected, (state, action) => {
                state.mssg = "error";
                state.error = action.payload;
            })
            .addCase(getUserInfoAsync.pending, (state) => {
                state.mssg = "loading";
            })
            .addCase(getUserInfoAsync.fulfilled, (state, action) => {
                state.mssg = "idle";
                state.userInfo = action.payload.data;
            })
            .addCase(getUserInfoAsync.rejected, (state, action) => {
                state.mssg = "error";
                state.error = action.payload;
            })
            .addCase(editUserInfoAsync.pending, (state) => {
                state.mssg = "loading";
            })
            .addCase(editUserInfoAsync.fulfilled, (state, action) => {
                state.mssg = "idle";
                state.userInfo = action.payload.data;
            })
            .addCase(editUserInfoAsync.rejected, (state, action) => {
                state.mssg = "error";
                state.error = action.payload;
            })
            .addCase(deleteUserInfoAsync.pending, (state) => {
                state.mssg = "loading";
            })
            .addCase(deleteUserInfoAsync.fulfilled, (state, action) => {
                state.mssg = "idle";
                state.userInfo = action.payload;
            })
            .addCase(deleteUserInfoAsync.rejected, (state, action) => {
                state.mssg = "error";
                state.error = action.payload;
            })
    }


});

export const selectUserInfo = (state) => state.userInformation.userInfo;
export const selectUserInfomssg = (state) => state.userInformation.mssg;
export const selectUserInfoError = (state) => state.userInformation.error;

export default userInfoSlice.reducer;