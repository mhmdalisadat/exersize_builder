import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { createWorkout } from "../services";
import type { workoutTypes } from "../types";

const useCreateWorkout = (): UseMutationResult<
  workoutTypes["createWorkoutRes"],
  Error,
  workoutTypes["createWorkoutReq"]
> => {
  return useMutation({
    mutationKey: ["createWorkout"],
    mutationFn: (workout: workoutTypes["createWorkoutReq"]) =>
      createWorkout(workout),
  });
};
export default useCreateWorkout;
  