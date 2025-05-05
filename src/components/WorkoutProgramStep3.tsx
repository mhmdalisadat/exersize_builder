import { useState } from "react";
import { motion } from "framer-motion";
import type { ExerciseMovement } from "./ExerciseMovement";
import type { DayWorkout } from "../store/workoutStore";
import WorkoutSummary from "./WorkoutSummary";
import ExerciseEditor from "./ExerciseEditor";

interface WorkoutProgramStep3Props {
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

const WorkoutProgramStep3 = ({
  programName,
  description,
  dayWorkouts,
  currentSelectedDay,
  handleDaySelect,
  handleExercisesChange,
  getMuscleLabel,
  goToPreviousStep,
  onFinish,
}: WorkoutProgramStep3Props) => {
  const [showSummary, setShowSummary] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.6,
        type: "spring",
        stiffness: 500,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  return (
    <motion.div
      className="w-full flex justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="w-4/5 flex flex-col">
        <motion.div
          className="flex justify-between items-center mb-6"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => setShowSummary(!showSummary)}
            className="px-4 py-2 rounded-lg text-white font-medium bg-indigo-600 shadow-md text-sm flex items-center gap-1"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {showSummary ? (
              <>
                <span>برگشت به ویرایش</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                  <path
                    fillRule="evenodd"
                    d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                  />
                </svg>
              </>
            ) : (
              <>
                <span>مشاهده خلاصه برنامه</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z" />
                </svg>
              </>
            )}
          </motion.button>

          <motion.h2
            className="text-xl font-bold text-right text-indigo-700"
            variants={itemVariants}
          >
            {showSummary ? "خلاصه برنامه تمرینی" : "تعریف حرکات تمرینی"}
          </motion.h2>
        </motion.div>

        {showSummary ? (
          <WorkoutSummary
            programName={programName}
            description={description}
            dayWorkouts={dayWorkouts}
            getMuscleLabel={getMuscleLabel}
          />
        ) : (
          <ExerciseEditor
            dayWorkouts={dayWorkouts}
            currentSelectedDay={currentSelectedDay}
            handleDaySelect={handleDaySelect}
            handleExercisesChange={handleExercisesChange}
            getMuscleLabel={getMuscleLabel}
          />
        )}

        {/* Navigation buttons */}
        <motion.div
          className="flex justify-between w-full mt-6"
          variants={itemVariants}
        >
          <motion.button
            onClick={goToPreviousStep}
            className="px-10 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-gray-500 to-gray-600 shadow-md"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            مرحله قبل
          </motion.button>

          <motion.button
            onClick={onFinish}
            className="px-10 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-green-500 to-green-600 shadow-md"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            پایان و ذخیره
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WorkoutProgramStep3;
