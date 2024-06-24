// src/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const predict = async (data:any) => {
    console.log("first",process.env.REACT_APP_API_URL);
  try {
    const response = await api.post('/predict', data);
    return response.data;
  } catch (error) {
    console.error('Error predicting price:', error);
    throw error;
  }
};
