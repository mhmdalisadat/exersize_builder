/* eslint-disable @typescript-eslint/no-explicit-any */
export interface WorkoutDetailsPropsType {
    workoutData: {
    programName: string;
    daysPerWeek: string;
    userImage?: string;
    description: string;
    name: string;
    height: string;
    weight: string;
    trainingSystem: string;
    purpose: string;
    };
    handleInputChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => void;
    handleNextStep: () => void;
    validateStep1: () => boolean;
    animations: {
      container: any;
      item: any;
      button: any;
    };
  }