import { useState } from "react";
import { motion } from "framer-motion";
import WorkoutSummary from "./workoutSummary";
import ExerciseEditor from "./ExerciseEditor";
import NavigationButtons from "../navigationsButtons";
import { animations } from "../../animation/program_animate";
import { ToggleButton } from "..";
import { useWorkoutStore } from "../../store/workoutStore";
import { muscleOptions } from "../../constants";
import type { ExerciseMovement } from "./ExerciseMovement";

const WorkoutProgram: React.FC = () => {
  const [showSummary, setShowSummary] = useState(false);
  const {
    workoutData,
    dayWorkouts,
    currentSelectedDay,
    setCurrentSelectedDay,
    updateDayWorkout,
    setCurrentStep,
  } = useWorkoutStore();

  const handleDaySelect = (day: number) => {
    setCurrentSelectedDay(day);
  };

  const handleExercisesChange = (exercises: ExerciseMovement[]) => {
    const dayWorkout = dayWorkouts.find((d) => d.day === currentSelectedDay);
    if (dayWorkout) {
      updateDayWorkout({
        ...dayWorkout,
        exercises,
      });
    }
  };

  const getMuscleLabel = (value: string) => {
    const option = muscleOptions.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const goToPreviousStep = () => {
    setCurrentStep(1);
  };

  const handleFinish = () => {
    setCurrentStep(3);
  };

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
              programName={workoutData.programName}
              description={workoutData.description}
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
            onNext={handleFinish}
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
