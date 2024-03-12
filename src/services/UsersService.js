import apiService from "./ApiService";

export const UsersService = {
    login: async (username, password) => {
        return apiService.post('users/login', {username, password})
    },
    register: async (user) => {
        return apiService.post('users/register', user)
    },
    edit: async (user) => {
        return apiService.put('users/edit', user)
    }
}
