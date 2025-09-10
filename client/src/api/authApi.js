// src/api/authApi.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/users"; // base URL 

// --- Register User ---
export const registerUser = (data) => {
  return axios.post(`${API_URL}/register`, data);
};

// --- Login User ---
export const loginUser = (data) => {
  return axios.post(`${API_URL}/login`, data);
};

// --- Google Login ---
export const googleLogin = (id_token) => {
  return axios.post(`${API_URL}/google`, { id_token });
};

// --- Logout User ---
export const logoutUser = (token) => {
  return axios.post(
    `${API_URL}/logout`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

// --- Get Current User ---
export const getCurrentUser = (token) => {
  return axios.get(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
