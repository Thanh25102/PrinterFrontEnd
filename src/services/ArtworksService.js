import apiService from "./ApiService";

export const ArtworksService = {
    getArtworks: async () => {
        return apiService.get('artworks')
    },
    getArtwork: async (id) => {
        return apiService.get(`artworks/${id}`)
    },
    getCreatedArtworks: async (userId) => {
        return apiService.get(`artworks/created/${userId}`)
    },
    getSavedArtworks: async (userId) => {
        return apiService.get(`artworks/saved/${userId}`)
    },
    saveArtwork: async (userId, artworkId) => {
        return apiService.post(`artworks/save`, {userId, artworkId})
    },
    createArtwork: async (artwork) => {
        return apiService.post('artworks', artwork)
    },
    deleteArtwork: async (id) => {
        return apiService.delete(`artworks/${id}`)
    }
}

