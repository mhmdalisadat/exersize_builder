export interface WorkoutReqType {
  workout_name: string;
  workout_description: string;
  workout_days_per_week: string;
  workout_weeks: string;
}

export interface WorkoutDataResType {
  workout_name: string;
  workout_description: string;
  workout_days_per_week: number;
  workout_weeks: number;
  workout_id: string;
  user: null | string;
  createdAt: string;
  updatedAt: string;
  _id: string;
  __v: number;
}
export interface CreateWorkoutResType {
  success: boolean;
  message: string;
  data: {
    _id: string;
    workout_name: string;
    workout_description: string;
    workout_days_per_week: number;
    workout_weeks: number;
    workout_id: string;
    user: string | null;
    createdAt: string;
    updatedAt: string;
    __v: number;
    days: Array<{
      day: number;
      targetMuscles: string[];
      exercises: Array<{
        id: string;
        name: string;
        setConfig?: {
          targetSets: number;
          targetReps: number;
          restTime: number;
        };
      }>;
    }>;
  };
}

export type workoutTypes = {
  createWorkoutRes: CreateWorkoutResType;
  createWorkoutReq: WorkoutReqType;
};
