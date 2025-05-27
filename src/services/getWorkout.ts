import axios from "axios";
import { API_URL } from "../api/api";

export const getWorkout = async (programId: string) => {
  const response = await axios.get(`${API_URL}/api/programs/${programId}`);
  return response.data;
};
