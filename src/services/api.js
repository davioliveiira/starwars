import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://swapi.co/api',
});

export default Api;