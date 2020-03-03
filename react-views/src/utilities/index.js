import axios from 'axios';

export const request = axios.create({
  baseURL: '',
  timeout: 15000,
});
