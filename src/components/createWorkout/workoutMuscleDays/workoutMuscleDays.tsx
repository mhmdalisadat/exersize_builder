import { motion } from "framer-motion";
import React, { useState } from "react";
import { NavigationButtons, DayCard } from "../..";
import { useWorkoutStore } from "../../../store/workoutStore";
import { animations } from "../../../animation";
import { muscleOptions } from "../../../constants";
import { useUpdateWorkout } from "../../../hooks";

const WorkoutMuscleDays: React.FC = () => {
  const { dayWorkouts, updateDayWorkout, setCurrentStep, workoutData } =
    useWorkoutStore();

  const workoutId = workoutData.workout_id;
  const { mutate: updateWorkout } = useUpdateWorkout(workoutId || "");
  const [pendingUpdates, setPendingUpdates] = useState<
    Record<number, string[]>
  >({});

  const handleDayMuscleChange = (day: number) => (muscles: string[]) => {
    const dayWorkout = dayWorkouts.find((d) => d.day === day);
    if (dayWorkout) {
      const updatedDayWorkout = {
        ...dayWorkout,
        targetMuscles: muscles,
      };

      // Update local store
      updateDayWorkout(updatedDayWorkout);

      // Store the update in pendingUpdates
      setPendingUpdates((prev) => ({
        ...prev,
        [day]: muscles,
      }));
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
      // Send all updates to the server
      if (workoutId && Object.keys(pendingUpdates).length > 0) {
        updateWorkout({
          days: dayWorkouts.map((d) => ({
            day_number: d.day,
            day_muscle_groups: pendingUpdates[d.day] || d.targetMuscles,
          })),
        });
      }
      setCurrentStep(3);
    }
  };

  return (
    <motion.div
      className="w-full flex justify-center px-2 sm:px-4 lg:px-6"
      variants={animations.container}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="w-full max-w-3xl flex flex-col">
        <motion.h2
          className="text-base sm:text-lg font-bold mb-2 sm:mb-4 text-right text-[#5677BC]"
          variants={animations.item}
        >
          تعیین عضلات برای هر روز
        </motion.h2>

        <motion.div
          className="mb-4 sm:mb-6 space-y-2 sm:space-y-4"
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
