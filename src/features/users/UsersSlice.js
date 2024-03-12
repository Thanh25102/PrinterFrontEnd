import {createSlice} from "@reduxjs/toolkit";
import {UsersThunk} from "./UsersThunk";

const defaultUser = JSON.parse(localStorage.getItem("user")) || {};

export const usersSlice = createSlice({
    name: "users",
    initialState: {value: defaultUser},
    reducers: {
        logout: (state, action) => {
            state.value = {}
            localStorage.removeItem("user");
        },
        editUser: (state, action) => {
            state.value = action.payload;
            localStorage.setItem("user", JSON.stringify(state.value));
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(UsersThunk.login.fulfilled, (state, action) => {
                state.value = action.payload;
                localStorage.setItem("user", JSON.stringify(state.value));
            })
            .addCase(UsersThunk.login.rejected, (state, action) => {
                localStorage.removeItem("user");
            })

    }
})
export default usersSlice.reducer;
export const {login, logout,editUser} = usersSlice.actions;
