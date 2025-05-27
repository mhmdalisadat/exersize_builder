import { useQuery } from "@tanstack/react-query";
import { getWorkout } from "../services/getWorkout";

 const useGetWorkout = (programId: string) => {
  return useQuery({
    queryKey: ["workout", programId],
    queryFn: () => getWorkout(programId),
  });
};
export default useGetWorkout;
