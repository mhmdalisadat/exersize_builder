export interface WorkoutCreateResponse {
  success: boolean;
  message: string;
  programId: string;
  data: WorkoutProgram;
}

export interface WorkoutProgram {
  programName: string;
  daysPerWeek: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
  days: WorkoutDay[];
  height: string;
  name: string;
  purpose: string;
  trainingSystem: string;
  userImage?: string;
  weight: string;
  __v?: number;
  _id?: string;
}

export interface WorkoutDay {
  day: number;
  targetMuscles: string[];
  exercises: Exercise[];
  _id?: string;
  id?: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroup: string;
  isCompound?: boolean;
  isIsolation?: boolean;
  relatedExercises?: RelatedExercise[];
  reps: string;
  setConfig: SetConfig;
  setType: string;
  sets: string;
  _id?: string;
}

export interface RelatedExercise {
  id: string;
  name: string;
  reps: string;
  sets: string;
  restTime: number;
  _id?: string;
}

export interface SetConfig {
  type: string;
  // Add other set configuration properties as needed
}
