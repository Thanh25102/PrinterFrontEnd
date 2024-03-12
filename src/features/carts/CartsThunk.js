import {createAsyncThunk} from "@reduxjs/toolkit";
import {CartsService} from "../../services/CartsService";

export const CartsThunk = {
    getAllCarts: createAsyncThunk("carts/get-all", async (userId) => {
        return CartsService.getCarts(userId);
    }),
    getCart: createAsyncThunk("carts/get-by-id", async (id) => {
        return CartsService.getCart(id);
    }),
    addCart: createAsyncThunk("carts/create-artworks",  async (cart) => {
        return CartsService.addCart(cart);
    }),
    deleteCart: createAsyncThunk("carts/delete-by-id", async (id) => {
        return CartsService.deleteCart(id);
    })
}
