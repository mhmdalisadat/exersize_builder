import { useMutation } from "@tanstack/react-query";
import { createWorkout } from "../services/createWorkout";

export const useCreateWorkout = () => {
  return useMutation({
    mutationFn: (workout: any) => createWorkout(workout),
  });
};
