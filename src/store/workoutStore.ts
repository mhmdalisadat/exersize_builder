import { create } from "zustand";
import type { ExerciseMovement } from "../components/workoutProgram/ExerciseMovement";

export interface DayWorkout {
  day: number;
  id: string;
  targetMuscles: string[];
  exercises: ExerciseMovement[];
}

interface WorkoutData {
  programName: string;
  daysPerWeek: string;
  description: string;
  name: string;
  height: string;
  weight: string;
  trainingSystem: string;
  purpose: string;
  userImage?: string; // base64 or URL
}

interface WorkoutStore {
  workoutData: WorkoutData;
  dayWorkouts: DayWorkout[];
  currentSelectedDay: number;
  setWorkoutData: (data: Partial<WorkoutData>) => void;
  setCurrentSelectedDay: (day: number) => void;
  addDayWorkout: (workout: DayWorkout) => void;
  updateDayWorkout: (workout: DayWorkout) => void;
  removeDayWorkout: (id: string) => void;
  addExerciseToDay: (dayId: string, exercise: ExerciseMovement) => void;
  updateExerciseInDay: (dayId: string, exercise: ExerciseMovement) => void;
  removeExerciseFromDay: (dayId: string, exerciseId: string) => void;
  resetWorkoutData: () => void;
}

const initialWorkoutData: WorkoutData = {
  programName: "",
  daysPerWeek: "",
  description: "",
  name: "",
  height: "",
  weight: "",
  trainingSystem: "",
  purpose: "",
  userImage: "",
};

export const useWorkoutStore = create<WorkoutStore>((set) => ({
  workoutData: initialWorkoutData,
  dayWorkouts: [],
  currentSelectedDay: 1,

  setWorkoutData: (data) =>
    set((state) => ({
      workoutData: { ...state.workoutData, ...data },
    })),

  setCurrentSelectedDay: (day) => set({ currentSelectedDay: day }),

  addDayWorkout: (workout) =>
    set((state) => ({
      dayWorkouts: [...state.dayWorkouts, workout],
    })),

  updateDayWorkout: (workout) =>
    set((state) => ({
      dayWorkouts: state.dayWorkouts.map((dw) =>
        dw.id === workout.id ? workout : dw
      ),
    })),

  removeDayWorkout: (id) =>
    set((state) => ({
      dayWorkouts: state.dayWorkouts.filter((dw) => dw.id !== id),
    })),

  addExerciseToDay: (dayId, exercise) =>
    set((state) => ({
      dayWorkouts: state.dayWorkouts.map((dw) =>
        dw.id === dayId ? { ...dw, exercises: [...dw.exercises, exercise] } : dw
      ),
    })),

  updateExerciseInDay: (dayId, exercise) =>
    set((state) => ({
      dayWorkouts: state.dayWorkouts.map((dw) =>
        dw.id === dayId
          ? {
              ...dw,
              exercises: dw.exercises.map((ex) =>
                ex.id === exercise.id ? exercise : ex
              ),
            }
          : dw
      ),
    })),

  removeExerciseFromDay: (dayId, exerciseId) =>
    set((state) => ({
      dayWorkouts: state.dayWorkouts.map((dw) =>
        dw.id === dayId
          ? {
              ...dw,
              exercises: dw.exercises.filter((ex) => ex.id !== exerciseId),
            }
          : dw
      ),
    })),

  resetWorkoutData: () =>
    set({ workoutData: initialWorkoutData, dayWorkouts: [] }),
}));
