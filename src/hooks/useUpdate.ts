/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { updateWorkout } from "../services";

const useUpdateWorkout = (uuid: string): UseMutationResult<any, Error, any> => {
  return useMutation({
    mutationKey: ["updateWorkout"],
    mutationFn: (workout: any) => updateWorkout(uuid, workout),
  });
};

export default useUpdateWorkout;
