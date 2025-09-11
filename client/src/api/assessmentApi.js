// src/api/assessmentApi.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5173";

const API_URL = axios.create({ baseURL: `${BASE_URL}/api/assessments` });

export const submitPHQ9 = async (responses, token) => {
  const res = await axios.post(`${API_URL}/phq9`, { responses }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.assessment;
};

export const submitGAD7 = async (responses, token) => {
  const res = await axios.post(`${API_URL}/gad7`, { responses }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.assessment;
};

export const submitGHQ = async (responses, token) => {
  const res = await axios.post(`${API_URL}/ghq`, { responses }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.assessment;
};
