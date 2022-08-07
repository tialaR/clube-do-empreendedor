import axios from 'axios';

import {baseURL} from '../utils/constants';

const api = axios.create({
  baseURL: baseURL,
});

export default api;
