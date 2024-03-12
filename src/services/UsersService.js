import apiService from "./ApiService";

export const UsersService = {
    login: async (email, password) => {
        return apiService.post('users/login', {email, password})
    },
    register: async (user) => {
        return apiService.post('users/register', user)
    },
    edit: async (user) => {
        return apiService.put('users/edit', user)
    }
}
