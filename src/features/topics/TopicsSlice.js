import { TopicsThunk } from "./TopicsThunk";
import { createSlice } from "@reduxjs/toolkit";

const initialTopics = JSON.parse(localStorage.getItem("topics")) || [];

export const topicsSlice = createSlice({
    name: "topics",
    initialState: { value: initialTopics },
    reducers: {
        addTopics: (state, action) => {
            localStorage.setItem("carts", JSON.stringify(state.value));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(TopicsThunk.getAllTopics.fulfilled, (state, action) => {
                console.log("call api success", action?.payload);
                state.value = action?.payload;
            })
            .addCase(TopicsThunk.getAllTopics.rejected, (state, action) => {
                console.log("call api failed");
            })
            .addCase(TopicsThunk.getAllTopics.pending, (state, action) => {
                console.log("call api pending");
            })

    }
})
export default topicsSlice.reducer;
export const { addTopics } = topicsSlice.actions;
