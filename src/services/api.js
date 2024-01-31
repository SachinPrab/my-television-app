// src/services/api.js
import axios from 'axios';

const BASE_URL = 'https://api.tvmaze.com';

export const fetchShows = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/search/shows?q=all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching shows:', error);
    throw error;
  }
};
