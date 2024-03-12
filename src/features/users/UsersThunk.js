import {createAsyncThunk} from "@reduxjs/toolkit";
import {CartsService} from "../../services/CartsService";
import {UsersService} from "../../services/UsersService";

export const UsersThunk = {
    login: createAsyncThunk("users/login", async ({email,password}) => {
        return UsersService.login(email, password);
    })
}
