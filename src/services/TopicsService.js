import apiService from "./ApiService";

export const TopicsService = {
    getTopics: async () => {
        return apiService.get('topics')
    }
}

