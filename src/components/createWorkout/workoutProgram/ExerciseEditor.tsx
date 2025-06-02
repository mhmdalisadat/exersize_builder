import { motion } from "framer-motion";
import ExerciseList from "./ExerciseList";
import type { ExerciseMovement } from "./ExerciseMovement";
import type { DayWorkout } from "../../../store/workoutStore";
import { useRef } from "react";

interface ExerciseEditorProps {
  dayWorkouts: DayWorkout[];
  currentSelectedDay: number;
  handleDaySelect: (day: number) => void;
  handleExercisesChange: (exercises: ExerciseMovement[]) => void;
  getMuscleLabel: (value: string) => string;
}

const ExerciseEditor = ({
  dayWorkouts,
  currentSelectedDay,
  handleDaySelect,
  handleExercisesChange,
  getMuscleLabel,
}: ExerciseEditorProps) => {
  const nonRestDays = dayWorkouts.filter(
    (day) => !day.targetMuscles.includes("rest")
  );
  const currentDay =
    dayWorkouts.find((day) => day.day === currentSelectedDay) || nonRestDays[0];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.2, ease: "easeOut" },
    },
  };

  const sliderRef = useRef<HTMLDivElement>(null);

  return (
    <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 md:px-6 py-2">
      {/* Unified Box */}
      <motion.div
        className="bg-white rounded-xl shadow-sm p-3 sm:p-4 mb-4 sm:mb-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col mb-4  sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-2 sm:mb-4 gap-1 sm:gap-0">
          <h2 className="text-base sm:text-sm font-medium text-gray-700">
            روزهای تمرین
          </h2>
          <span className="text-xs text-gray-500">
            {nonRestDays.length} روز
          </span>
        </div>

        {/* Slider */}
        <div className="overflow-x-auto pb-2 mt-4 mb-2" ref={sliderRef}>
          <div className="flex gap-2 min-w-max">
            {nonRestDays.map((day) => (
              <button
                key={day.id}
                onClick={() => handleDaySelect(day.day)}
                className={`flex flex-col items-center justify-center rounded-full border transition-all px-0.5 py-0.5 w-9 h-9 sm:w-10 sm:h-10 text-xs sm:text-sm font-bold select-none focus:outline-none focus:ring-2 focus:ring-indigo-400 ${
                  currentSelectedDay === day.day
                    ? "bg-indigo-500 text-white border-indigo-500 shadow"
                    : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-indigo-100"
                }`}
                style={{ minWidth: 36, minHeight: 36 }}
              >
                {day.day}
              </button>
            ))}
          </div>
        </div>

        {/* Muscles for selected day under slider */}
        <div className="flex flex-wrap gap-2 mb-2 min-h-[32px]">
          {currentDay &&
            currentDay.targetMuscles.map((muscle) => (
              <span
                key={muscle}
                className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-indigo-400 to-indigo-600 text-white text-xs font-semibold shadow-sm transition-transform duration-150 hover:scale-105 hover:from-indigo-500 hover:to-indigo-700 cursor-pointer select-none"
              >
                {getMuscleLabel(muscle)}
              </span>
            ))}
        </div>
      </motion.div>

      {/* Exercise Editor for selected day */}
      {currentDay && !currentDay.targetMuscles.includes("rest") && (
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-xl shadow-sm p-3 sm:p-4"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-1 sm:gap-0">
            <div>
              <h2 className="text-base sm:text-lg font-medium text-gray-800">
                تعریف حرکات
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">
                روز {currentDay.day}
              </p>
            </div>
          </div>

          <ExerciseList
            initialExercises={currentDay.exercises}
            onExercisesChange={(exercises) => {
              handleExercisesChange(exercises);
            }}
          />
        </motion.div>
      )}
    </div>
  );
};

export default ExerciseEditor;
