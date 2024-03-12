import {ArtworksService} from "../../services/ArtworksService";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const ArtworksThunk = {
    getAllArtworks: createAsyncThunk("artworks/get-all", async () => {
        return ArtworksService.getArtworks();
    }),
    getArtwork: createAsyncThunk("artworks/get-by-id", async (id) => {
        return ArtworksService.getArtwork(id);
    }),
    createArtwork: createAsyncThunk("artworks/create-artworks",  async (artwork) => {
        return ArtworksService.createArtwork(artwork);
    }),
    deleteArtwork: createAsyncThunk("artworks/delete-artwork", async (id) => {
        return ArtworksService.deleteArtwork(id);
    }),
}
