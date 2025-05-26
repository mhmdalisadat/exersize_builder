import { motion } from "framer-motion";
import React from "react";
import { NavigationButtons, DayCard } from "..";
import { useWorkoutStore } from "../../store/workoutStore";
import { animations } from "../../animation/program_animate";
import { muscleOptions } from "../../constants";

const WorkoutMuscleDays: React.FC = () => {
  const { dayWorkouts, updateDayWorkout, setCurrentStep } = useWorkoutStore();

  const handleDayMuscleChange = (day: number) => (muscles: string[]) => {
    const dayWorkout = dayWorkouts.find((d) => d.day === day);
    if (dayWorkout) {
      updateDayWorkout({
        ...dayWorkout,
        targetMuscles: muscles,
      });
    }
  };

  const getMuscleLabel = (value: string) => {
    const option = muscleOptions.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const validateStep2 = (): boolean => {
    return (
      dayWorkouts.length > 0 &&
      dayWorkouts.every((day) => day.targetMuscles.length > 0)
    );
  };

  const goToPreviousStep = () => {
    setCurrentStep(0);
  };

  const handleNextStep = () => {
    if (validateStep2()) {
      setCurrentStep(2);
    }
  };

  return (
    <motion.div
      className="w-full flex justify-center px-4 sm:px-6 lg:px-8"
      variants={animations.container}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="w-full max-w-4xl flex flex-col">
        <motion.h2
          className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-right text-indigo-700"
          variants={animations.item}
        >
          تعیین عضلات برای هر روز
        </motion.h2>

        <motion.div
          className="mb-6 sm:mb-8 space-y-4 sm:space-y-6"
          variants={animations.item}
        >
          {dayWorkouts.map((day) => (
            <DayCard
              key={day.id}
              day={day.day}
              targetMuscles={day.targetMuscles}
              onMuscleChange={handleDayMuscleChange(day.day)}
              getMuscleLabel={getMuscleLabel}
              variants={animations.item}
            />
          ))}
        </motion.div>

        <NavigationButtons
          onPrevious={goToPreviousStep}
          onNext={handleNextStep}
          isNextDisabled={!validateStep2()}
          variants={animations.button}
        />
      </div>
    </motion.div>
  );
};

export default WorkoutMuscleDays;
