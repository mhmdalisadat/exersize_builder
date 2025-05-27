import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { createWorkout } from "../services/createWorkout";
import type { WorkoutCreateResponse, WorkoutProgram } from "../types";

const useCreateWorkout = (): UseMutationResult<
  WorkoutCreateResponse,
  Error,
  WorkoutProgram
> => {
  return useMutation({
    mutationKey: ["createWorkout"],
    mutationFn: (workout: WorkoutProgram) => createWorkout(workout),
  });
};
export default useCreateWorkout;
