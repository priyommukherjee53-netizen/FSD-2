import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginUser = async (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

export const getDashboard = async (token) => {
  return axios.get(`${API_URL}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};