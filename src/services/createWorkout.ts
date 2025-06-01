/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { API_URL } from "../api/api";
import type { workoutTypes } from "../types";

 const createWorkout = async (
  workout: any
): Promise<workoutTypes["createWorkoutRes"]> => {
  const response = await axios.post(`${API_URL}/api/workouts`, workout);
  return response.data;
};


export default createWorkout;
