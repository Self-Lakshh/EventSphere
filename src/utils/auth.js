// src/utils/auth.js
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const verifyToken = async (token) => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/verify`, { token }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if ( response.data.user.role == 'admin') {
      return true;
    }
    else {
      return false;
    }
  } catch (error) {
    console.error('Token verification failed:', error);
    return false;
  }
};
