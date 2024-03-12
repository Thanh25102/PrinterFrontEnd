import { createSlice } from "@reduxjs/toolkit";
import artworks from "../data/Listartworks";

const initialArtwork = JSON.parse(localStorage.getItem("artworks")) || artworks;

/**
 * Tôi không biết không biết ông, tôi nhận dự án này từ bạn tôi,
 * nhưng tôi không có document nên không hiểu cách setup redux redux toolkit của ông
 * Không setup store sao xài đc redux, tôi có config store cho ông rồi, ông xem lại xem có đúng không
 * có bug hay vấn đề gì ông cứ báo tôi sửa lại cho
 */
export const userSlice = createSlice({
    name: "artworks",
    initialState: { value: initialArtwork },
    reducers: {
        addArtwork: (state, action) => {
            state.value.push(action.payload);
            localStorage.setItem("artworks", JSON.stringify(state.value));
        },
        deleteArtwork: (state, action) => {
            state.value = state.value.filter((artwork) => artwork.id !== action.payload.id);
            localStorage.setItem("artworks", JSON.stringify(state.value));
        },
    }
})
export default userSlice.reducer;
export const { addArtwork, deleteArtwork } = userSlice.actions;
