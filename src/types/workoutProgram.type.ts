import type { ExerciseMovement } from "../components/createWorkout/workoutProgram/ExerciseMovement";
import type { DayWorkout } from "../store/workoutStore";

export interface WorkoutProgramPropsType {
  programName: string;
  description: string;
  dayWorkouts: DayWorkout[];
  currentSelectedDay: number;
  handleDaySelect: (day: number) => void;
  handleExercisesChange: (exercises: ExerciseMovement[]) => void;
  getMuscleLabel: (value: string) => string;
  goToPreviousStep: () => void;
  onFinish: () => void;
}
