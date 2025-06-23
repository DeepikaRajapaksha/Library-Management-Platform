import axios from 'axios';

const API = 'http://localhost:5000/api';

export const registerUser = (data) => axios.post(`${API}/register`, data);
export const loginUser = (data) => axios.post(`${API}/login`, data);
