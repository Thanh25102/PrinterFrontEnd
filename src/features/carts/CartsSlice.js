import { createSlice } from "@reduxjs/toolkit";
import {CartsThunk} from "./CartsThunk";

const initialCarts = JSON.parse(localStorage.getItem("carts")) || [];

export const cartsSlice = createSlice({
    name: "carts",
    initialState: { value: initialCarts },
    reducers: {
        addToCart: (state, action) => {
            state.value.push(action.payload);
            localStorage.setItem("carts", JSON.stringify(state.value));
        },
        deleteFromCart: (state, action) => {
            state.value = state.value.filter((artwork) => artwork.id !== action.payload.id);
            localStorage.setItem("carts", JSON.stringify(state.value));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(CartsThunk.getAllCarts.fulfilled, (state, action) => {
                console.log("call api success", action.payload);
                state.value = action.payload;
            })
            .addCase(CartsThunk.getAllCarts.rejected, (state, action) => {
                console.log("call api failed");
            })
            .addCase(CartsThunk.getAllCarts.pending, (state, action) => {
                console.log("call api pending");
            })
            .addCase(CartsThunk.addCart.fulfilled, (state, action) => {
                state.value.push(action.payload);
            })
            .addCase(CartsThunk.deleteCart.fulfilled, (state, action) => {
                state.value = state.value.filter((artwork) => artwork.id !== action.payload.id);
                localStorage.setItem("carts", JSON.stringify(state.value));
            });
    }
})
export default cartsSlice.reducer;
export const { addToCart, deleteFromCart } = cartsSlice.actions;
