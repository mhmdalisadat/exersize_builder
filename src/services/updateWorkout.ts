/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_URL } from "../api/api";

 const updateWorkout = async (uuid: string, workout: any) => {
  const response = await axios.put(`${API_URL}/api/workouts/${uuid}`, workout);
  return response.data;
};

export default updateWorkout;
