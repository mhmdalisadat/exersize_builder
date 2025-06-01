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
  workout_name: string;
  workout_description: string;
  workout_days_per_week: string;
  workout_weeks: string;
  workout_id?: string;
}

interface UserDetails {
  phoneNumber: string;
  name: string;
  age: number;
  height: number;
  weight: number;
  trainingExperience: string;
  trainingGoals: string[];
  medicalConditions: string[];
  injuries: string[];
}

interface WorkoutStore {
  // State
  workoutData: WorkoutData;
  userDetails: UserDetails;
  dayWorkouts: DayWorkout[];
  currentSelectedDay: number;
  currentStep: number;

  // Actions
  setWorkoutData: (data: Partial<WorkoutData>) => void;
  setUserDetails: (data: Partial<UserDetails>) => void;
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
  validateStep3: () => boolean;
  validateCurrentStep: () => boolean;

  // Selectors
  getCurrentDayWorkout: () => DayWorkout | undefined;
  getDayWorkoutByDay: (day: number) => DayWorkout | undefined;
}

const initialWorkoutData: WorkoutData = {
  workout_name: "",
  workout_description: "",
  workout_days_per_week: "",
  workout_weeks: "4",
  workout_id: undefined,
};

const initialUserDetails: UserDetails = {
  phoneNumber: "",
  name: "",
  age: 0,
  height: 0,
  weight: 0,
  trainingExperience: "",
  trainingGoals: [],
  medicalConditions: [],
  injuries: [],
};

export const useWorkoutStore = create<WorkoutStore>()(
  persist(
    (set, get) => ({
      // State
      workoutData: initialWorkoutData,
      userDetails: initialUserDetails,
      dayWorkouts: [],
      currentSelectedDay: 1,
      currentStep: 0,

      // Actions
      setWorkoutData: (data) =>
        set((state) => ({
          workoutData: { ...state.workoutData, ...data },
        })),

      setUserDetails: (data) =>
        set((state) => ({
          userDetails: { ...state.userDetails, ...data },
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
          userDetails: initialUserDetails,
          dayWorkouts: [],
          currentStep: 0,
        }),

      submitWorkout: async () => {
        const { workoutData, userDetails, dayWorkouts } = get();

        const workoutPayload = {
          ...workoutData,
          user: userDetails,
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

          const data = await response.json();

          // Update the workout ID in the store
          set((state) => ({
            workoutData: {
              ...state.workoutData,
              workout_id: data.workout_id,
            },
          }));

          // Move to the next step
          const { currentStep } = get();
          if (currentStep < 4) {
            // Assuming 4 is the last step
            set({ currentStep: currentStep + 1 });
          }

          return data;
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
          workoutData.workout_name &&
            workoutData.workout_days_per_week &&
            parseInt(workoutData.workout_days_per_week) > 0
        );
      },

      validateStep2: () => {
        const { dayWorkouts } = get();
        return (
          dayWorkouts.length > 0 &&
          dayWorkouts.every((day) => day.targetMuscles.length > 0)
        );
      },

      validateStep3: () => {
        const { userDetails } = get();
        return Boolean(
          userDetails.name &&
            userDetails.phoneNumber &&
            userDetails.age > 0 &&
            userDetails.height > 0 &&
            userDetails.weight > 0 &&
            userDetails.trainingExperience
        );
      },

      validateCurrentStep: () => {
        const { currentStep, validateStep1, validateStep2, validateStep3 } =
          get();
        switch (currentStep) {
          case 0:
            return validateStep1();
          case 1:
            return validateStep2();
          case 2:
            return validateStep3();
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
        userDetails: state.userDetails,
        dayWorkouts: state.dayWorkouts,
      }),
    }
  )
);
