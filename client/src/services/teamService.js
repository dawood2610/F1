// src/services/teamService.js
import axios from "axios";

const API = "/api/teams";

export const getTeams = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const createTeam = async (data) => {
  const res = await axios.post(API, data);
  return res.data;
};

export const updateTeam = async (id, data) => {
  const res = await axios.put(`${API}/${id}`, data);
  return res.data;
};

export const deleteTeam = async (id) => {
  const res = await axios.delete(`${API}/${id}`);
  return res.data;
};
