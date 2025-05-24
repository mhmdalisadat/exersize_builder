/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DayCardPropsType {
  day: number;
  targetMuscles: string[];
  onMuscleChange: (muscles: string[]) => void;
  getMuscleLabel: (value: string) => string;
  variants: any;
}
  