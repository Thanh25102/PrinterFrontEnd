import {createSlice} from "@reduxjs/toolkit";
import artworks from "../../data/Listartworks";
import {ArtworksThunk} from "./ArtworksThunk";

const initialArtwork = JSON.parse(localStorage.getItem("artworks")) || artworks;

export const artWorkSlice = createSlice({
    name: "artworks",
    initialState: {value: initialArtwork},
    reducers: {
        addArtwork: (state, action) => {
            state.value.push(action.payload);
            localStorage.setItem("artworks", JSON.stringify(state.value));
        },
        deleteArtwork: (state, action) => {
            state.value = state.value.filter((artwork) => artwork.id !== action.payload.id);
            localStorage.setItem("artworks", JSON.stringify(state.value));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(ArtworksThunk.getAllArtworks.fulfilled, (state, action) => {
                console.log("call api success", action.payload);
                state.value = action.payload;
            })
            .addCase(ArtworksThunk.getAllArtworks.rejected, (state, action) => {
                console.log("call api failed");
            })
            .addCase(ArtworksThunk.getAllArtworks.pending, (state, action) => {
                console.log("call api pending");
            })
            .addCase(ArtworksThunk.createArtwork.fulfilled, (state, action) => {
                state.value.push(action.payload);
            })
            .addCase(ArtworksThunk.deleteArtwork.fulfilled, (state, action) => {
                state.value = state.value.filter((artwork) => artwork.id !== action.payload.id);
            });

    }
})
export default artWorkSlice.reducer;
export const {addArtwork, deleteArtwork} = artWorkSlice.actions;
