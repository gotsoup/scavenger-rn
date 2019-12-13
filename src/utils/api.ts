import axios from 'axios';
import { API_KEY, BASE_URL } from './prod.config';

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'x-api-key': API_KEY
  }
});

const getItems = () => instance.get('/items?type=plant');

export default getItems;
