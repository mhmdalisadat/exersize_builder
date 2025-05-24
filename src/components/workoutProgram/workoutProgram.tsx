import { useState } from "react";
import { motion } from "framer-motion";

import WorkoutSummary from "./workoutSummary";
import ExerciseEditor from "./ExerciseEditor";
import NavigationButtons from "../navigationsButtons";
import type { WorkoutProgramPropsType } from "../../types";
import { animations } from "../../animation";
import { ToggleButton } from "..";

const WorkoutProgram: React.FC<WorkoutProgramPropsType> = ({
  programName,
  description,
  dayWorkouts,
  currentSelectedDay,
  handleDaySelect,
  handleExercisesChange,
  getMuscleLabel,
  goToPreviousStep,
  onFinish,
}) => {
  const [showSummary, setShowSummary] = useState(false);

  return (
    <motion.div
      className="w-full flex justify-center px-2 sm:px-4 lg:px-8 py-3"
      variants={animations.container}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="w-full max-w-4xl flex flex-col gap-4 sm:gap-6">
        {/* Toggle Button */}
        <div className="flex justify-center mb-4">
          <ToggleButton
            showSummary={showSummary}
            onClick={() => setShowSummary(!showSummary)}
          />
        </div>

        <motion.div
          className="flex flex-col gap-4 sm:gap-6"
          variants={animations.item}
        >
          <motion.h2
            className="text-lg sm:text-xl font-bold text-center text-indigo-700 mb-2"
            variants={animations.item}
          >
            {showSummary ? "خلاصه برنامه تمرینی" : "تعریف حرکات تمرینی"}
          </motion.h2>

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
        </motion.div>

        {/* Navigation Buttons (bottom) */}
        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <NavigationButtons
            onPrevious={goToPreviousStep}
            onNext={onFinish}
            isNextDisabled={false}
            variants={animations.button}
            nextButtonText="پایان و ذخیره"
            nextButtonClassName="bg-gradient-to-r from-green-500 to-green-600"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default WorkoutProgram;
