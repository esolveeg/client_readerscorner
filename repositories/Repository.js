import axios from "axios";
const api = axios.create ({
    baseURL: `${process.env.API_URL}`,
    headers: { 'Accept': 'application/json'}
})

api.interceptors.request.use(
    config => {
      const token = localStorage.getItem("auth._token.local");
      if (token) {
        config.headers.common['Authorization'] = `${token}`
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

export const serializeQuery = query => {
  return Object.keys(query)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
      .join('&');
};


  export default api;