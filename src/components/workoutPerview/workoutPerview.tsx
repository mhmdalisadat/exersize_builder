import { motion } from "framer-motion";
import type { DayWorkout } from "../../store/workoutStore";
import UserInfo from "./components/UserInfo";
import WorkoutDay from "./components/WorkoutDay";
import PDFGenerator from "./components/PDFGenerator";

interface WorkoutProgramPreviewProps {
  programName: string;
  description: string;
  dayWorkouts: DayWorkout[];
  getMuscleLabel: (value: string) => string;
  onBack: () => void;
  name: string;
  height: string;
  weight: string;
  trainingSystem?: string;
  getTrainingSystemLabel: (system: string) => string;
  purpose: string;
  getPurposeLabel: (purpose: string) => string;
  userImage?: string;
}

const WorkoutPerview = ({
  programName,
  description,
  dayWorkouts,
  getMuscleLabel,
  onBack,
  name,
  height,
  weight,
  trainingSystem,
  getTrainingSystemLabel,
  purpose,
  getPurposeLabel,
  userImage,
}: WorkoutProgramPreviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full min-h-screen flex flex-col items-center bg-white print:bg-white px-2 sm:px-0"
    >
      {/* Mobile scroll hint */}
      <div className="sm:hidden text-center text-xs text-slate-500 mb-2">
        برای مشاهده کامل پیش‌نمایش، به چپ و راست اسکرول کنید
      </div>

      {/* Responsive Preview (user-facing) */}
      <div className="w-full max-w-4xl px-4 sm:px-6 mb-8">
        {/* User Information */}
        <UserInfo
          name={name}
          description={description}
          userImage={userImage}
          height={height}
          weight={weight}
          trainingSystem={trainingSystem}
          getTrainingSystemLabel={getTrainingSystemLabel}
          purpose={purpose}
          getPurposeLabel={getPurposeLabel}
        />



        {/* Program Schedule */}
        <div className="space-y-4 sm:space-y-6">
          {dayWorkouts.map((day) => (
            <WorkoutDay
              key={day.id}
              day={day}
              getMuscleLabel={getMuscleLabel}
            />
          ))}
        </div>
      </div>

      {/* PDF Generator */}
      <PDFGenerator
        programName={programName}
        description={description}
        dayWorkouts={dayWorkouts}
        getMuscleLabel={getMuscleLabel}
        name={name}
        height={height}
        weight={weight}
        trainingSystem={trainingSystem}
        getTrainingSystemLabel={getTrainingSystemLabel}
        purpose={purpose}
        getPurposeLabel={getPurposeLabel}
        userImage={userImage}
      />

      {/* Back Button */}
      <div className="flex flex-col sm:flex-row justify-between w-full max-w-xl mt-6 gap-2 print:hidden">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-1.5 text-sm rounded hover:bg-gray-200 transition-colors"
          style={{ backgroundColor: "#f1f5f9", color: "#334155" }}
        >
          بازگشت
        </motion.button>
      </div>
    </motion.div>
  );
};

export default WorkoutPerview;
