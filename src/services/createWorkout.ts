import axios from "axios";
import { API_URL } from "../api/api";

export const createWorkout = async (workout: any) => {
  const response = await axios.post(`${API_URL}/api/programs/`, workout);
  return response.data;
};
