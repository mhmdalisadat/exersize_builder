import { forwardRef } from "react";
import type { DayWorkout } from "../../store/workoutStore";
import PDFUserInfo from "./components/PDFUserInfo";
import PDFWorkoutDay from "./components/PDFWorkoutDay";

// Types
interface WorkoutProgramPDFContentProps {
  programName: string;
  description: string;
  dayWorkouts: DayWorkout[];
  getMuscleLabel: (muscle: string) => string;
  name: string;
  height: string;
  weight: string;
  trainingSystem?: string;
  getTrainingSystemLabel: (system: string) => string;
  purpose: string;
  getPurposeLabel: (purpose: string) => string;
  userImage?: string;
}

// Main Component
const WorkoutProgramPDFContent = forwardRef<
  HTMLDivElement,
  WorkoutProgramPDFContentProps
>((props, ref) => {
  const {
    programName,
    description,
    dayWorkouts,
    getMuscleLabel,
    name,
    height,
    weight,
    trainingSystem,
    getTrainingSystemLabel,
    purpose,
    getPurposeLabel,
    userImage,
  } = props;

  return (
    <div
      ref={ref}
      style={{ padding: "20px", fontFamily: "Vazirmatn, sans-serif" }}
    >
      <PDFUserInfo
        programName={programName}
        description={description}
        name={name}
        height={height}
        weight={weight}
        trainingSystem={trainingSystem}
        getTrainingSystemLabel={getTrainingSystemLabel}
        purpose={purpose}
        getPurposeLabel={getPurposeLabel}
        userImage={userImage}
      />
      {dayWorkouts.map((day, index) => (
        <PDFWorkoutDay key={index} day={day} getMuscleLabel={getMuscleLabel} />
      ))}
    </div>
  );
});

WorkoutProgramPDFContent.displayName = "WorkoutProgramPDFContent";

export default WorkoutProgramPDFContent;
