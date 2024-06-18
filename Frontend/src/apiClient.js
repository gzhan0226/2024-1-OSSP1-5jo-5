import axios from 'axios';

const host = window.location.hostname === "localhost" 
  ? 'http://3.38.78.74:8080/'
  : "/api";

export const apiClient = axios.create({
  baseURL: host,
});
