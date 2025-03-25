// src/services/raceService.js

import axios from 'axios';

const get_API_BASE = '/api/races/getraces';
const post_API_BASE = '/api/races/postraces';

export const getRaces = async () => {
  try {
    const response = await axios.get(get_API_BASE);
    return response.data;
  } catch (error) {
    console.error('Error fetching races:', error);
    return [];
  }
};

export const createRace = async (raceData) => {
  try {
    const response = await axios.post(post_API_BASE, raceData);
    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error creating race:', error);
    return { success: false };
  }
};

export const getRaceById = async (id) => {
    try {
      const response = await axios.get(`/api/races/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching race by ID:', error);
      return null;
    }
  };
  
