// src/utils/auth.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL; // or process.env.REACT_APP_API_BASE_URL for CRA

export const verifyToken = async (token) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/verify`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.success;
  } catch (error) {
    return false;
  }
};
