import apiService from "./ApiService";

export const CartsService = {
    getCarts: async (userId) => {
        console.log("userId",userId)
        return apiService.get(`carts/${userId}`)
    },
    getCart: async (id) => {
        return apiService.get(`carts/${id}`)
    },
    addCart: async (cart) => {
        return apiService.post('carts', cart)
    },
    deleteCart: async (id) => {
        return apiService.delete(`carts/${id}`)
    }
}
