import axios from "axios";

export const API_URL = "https://blog.kata.academy/api/";

const $api = axios.create({
  baseURL: API_URL,
});

$api.interceptors.request.use((config): any => {
  config.headers.Authorization = `Token ${localStorage.getItem("token")}`;
  return config;
});

export default $api;
