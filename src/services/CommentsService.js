import apiService from "./ApiService";

export const CommentsService = {
    getCommentsByArtworkId: async (id) => {
        return apiService.get(`comments/artworks/${id}`)
    },
    postComment: async (comment) => {
        return apiService.post('comments', comment)
    },
    updateComment: async (comment) => {
        return apiService.put('comments', comment)
    },
    deleteComment: async (id) => {
        return apiService.delete(`comments/${id}`)
    }
}

