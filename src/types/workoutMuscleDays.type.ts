/* eslint-disable @typescript-eslint/no-explicit-any */
export interface MusclesDaysSelectionPropsType {
  dayWorkouts: Array<{
    id: string;
    day: number;
    targetMuscles: string[];
    exercises: any[];
  }>;
  handleDayMuscleChange: (day: number) => (muscles: string[]) => void;
  getMuscleLabel: (value: string) => string;
  validateStep2: () => boolean;
  goToPreviousStep: () => void;
  handleNextStep: () => void;
  animations: {
    container: any;
    item: any;
    button: any;
  };
}
