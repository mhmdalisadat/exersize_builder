import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ExerciseMovement } from "../components/createWorkout/workoutProgram/ExerciseMovement";

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
  // State
  workoutData: WorkoutData;
  dayWorkouts: DayWorkout[];
  currentSelectedDay: number;
  currentStep: number;

  // Actions
  setWorkoutData: (data: Partial<WorkoutData>) => void;
  setCurrentSelectedDay: (day: number) => void;
  setCurrentStep: (step: number) => void;
  addDayWorkout: (workout: DayWorkout) => void;
  updateDayWorkout: (workout: DayWorkout) => void;
  removeDayWorkout: (id: string) => void;
  addExerciseToDay: (dayId: string, exercise: ExerciseMovement) => void;
  updateExerciseInDay: (dayId: string, exercise: ExerciseMovement) => void;
  removeExerciseFromDay: (dayId: string, exerciseId: string) => void;
  resetWorkoutData: () => void;
  submitWorkout: () => Promise<void>;

  // Navigation
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  goToStep: (step: number) => void;

  // Validation
  validateStep1: () => boolean;
  validateStep2: () => boolean;
  validateCurrentStep: () => boolean;

  // Selectors
  getCurrentDayWorkout: () => DayWorkout | undefined;
  getDayWorkoutByDay: (day: number) => DayWorkout | undefined;
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

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set, get) => ({
      // State
      workoutData: initialWorkoutData,
      dayWorkouts: [],
      currentSelectedDay: 1,
      currentStep: 0,

      // Actions
      setWorkoutData: (data) =>
        set((state) => ({
          workoutData: { ...state.workoutData, ...data },
        })),

      setCurrentSelectedDay: (day) => set({ currentSelectedDay: day }),

      setCurrentStep: (step) => set({ currentStep: step }),

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
            dw.id === dayId
              ? { ...dw, exercises: [...dw.exercises, exercise] }
              : dw
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
        set({
          workoutData: initialWorkoutData,
          dayWorkouts: [],
          currentStep: 0,
        }),

      submitWorkout: async () => {
        const { workoutData, dayWorkouts } = get();

        const workoutPayload = {
          ...workoutData,
          days: dayWorkouts.map((day) => ({
            day: day.day,
            targetMuscles: day.targetMuscles,
            exercises: day.exercises.map((exercise) => ({
              ...exercise,
              setConfig: exercise.setConfig
                ? {
                    ...exercise.setConfig,
                    restTime: parseInt(
                      exercise.setConfig.restTime?.toString() || "0"
                    ),
                    targetReps: parseInt(
                      exercise.setConfig.targetReps?.toString() || "0"
                    ),
                    targetSets: parseInt(
                      exercise.setConfig.targetSets?.toString() || "0"
                    ),
                  }
                : undefined,
            })),
          })),
        };

        try {
          const response = await fetch("YOUR_API_ENDPOINT", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(workoutPayload),
          });

          if (!response.ok) {
            throw new Error("Failed to submit workout");
          }

          // Reset the store after successful submission
          get().resetWorkoutData();
        } catch (error) {
          console.error("Error submitting workout:", error);
          throw error;
        }
      },

      // Navigation
      goToNextStep: () => {
        const { currentStep, validateCurrentStep } = get();
        if (validateCurrentStep()) {
          set({ currentStep: currentStep + 1 });
        }
      },

      goToPreviousStep: () => {
        const { currentStep } = get();
        if (currentStep > 0) {
          set({ currentStep: currentStep - 1 });
        }
      },

      goToStep: (step) => {
        const { currentStep, validateCurrentStep } = get();
        if (step > currentStep) {
          if (validateCurrentStep()) {
            set({ currentStep: step });
          }
        } else {
          set({ currentStep: step });
        }
      },

      // Validation
      validateStep1: () => {
        const { workoutData } = get();
        return Boolean(
          workoutData.programName &&
            workoutData.daysPerWeek &&
            parseInt(workoutData.daysPerWeek) > 0
        );
      },

      validateStep2: () => {
        const { dayWorkouts } = get();
        return (
          dayWorkouts.length > 0 &&
          dayWorkouts.every((day) => day.targetMuscles.length > 0)
        );
      },

      validateCurrentStep: () => {
        const { currentStep, validateStep1, validateStep2 } = get();
        switch (currentStep) {
          case 0:
            return validateStep1();
          case 1:
            return validateStep2();
          default:
            return true;
        }
      },

      // Selectors
      getCurrentDayWorkout: () => {
        const { dayWorkouts, currentSelectedDay } = get();
        return dayWorkouts.find((dw) => dw.day === currentSelectedDay);
      },

      getDayWorkoutByDay: (day) => {
        const { dayWorkouts } = get();
        return dayWorkouts.find((dw) => dw.day === day);
      },
    }),
    {
      name: "workout-storage",
      partialize: (state) => ({
        workoutData: state.workoutData,
        dayWorkouts: state.dayWorkouts,
      }),
    }
  )
);
