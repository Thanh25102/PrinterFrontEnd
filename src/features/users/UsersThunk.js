import {createAsyncThunk} from "@reduxjs/toolkit";
import {CartsService} from "../../services/CartsService";
import {UsersService} from "../../services/UsersService";

export const UsersThunk = {
    login: createAsyncThunk("users/login", async ({username,password}) => {
        return UsersService.login(username, password);
    })
}
