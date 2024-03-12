const API_URL = process.env.REACT_APP_URL_SERVER_API;

const ApiService = {
  get: async (endpoint) => {
    console.log(`${API_URL}/${endpoint}`)
    const response = await fetch(`${API_URL}/${endpoint}`);
    return response.json();
  },

  post: async (endpoint, data) => {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  put: async (endpoint, data) => {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  },

  delete: async (endpoint) => {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'DELETE'
    });
    return response.json();
  }
};

export default ApiService;
