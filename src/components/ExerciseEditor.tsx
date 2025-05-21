import { motion } from "framer-motion";
import ExerciseList from "./ExerciseList";
import type { ExerciseMovement } from "./ExerciseMovement";
import type { DayWorkout } from "../store/workoutStore";

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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <>
      {/* Day selector */}
      <motion.div className="mb-8" variants={itemVariants}>
        <div className="text-right mb-3 text-slate-600">انتخاب روز:</div>
        <div className="flex flex-wrap gap-2 justify-end">
          {nonRestDays.map((day) => (
            <motion.button
              key={day.id}
              onClick={() => handleDaySelect(day.day)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                currentSelectedDay === day.day
                  ? "bg-indigo-100 text-indigo-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className="flex items-center gap-2">
                <span>روز {day.day}</span>
                <div className="flex flex-wrap gap-1">
                  {day.targetMuscles.map((muscle) => (
                    <span
                      key={muscle}
                      className="bg-white px-1.5 py-0.5 rounded text-xs"
                    >
                      {getMuscleLabel(muscle)}
                    </span>
                  ))}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {currentDay && !currentDay.targetMuscles.includes("rest") && (
        <motion.div variants={itemVariants} className="mb-8">
          <div className="text-right mb-2 text-slate-600">
            <span className="font-medium">
              تعریف حرکات برای روز {currentDay.day} -{" "}
            </span>
            <span className="text-indigo-600">
              {currentDay.targetMuscles
                .map((m) => getMuscleLabel(m))
                .join(" + ")}
            </span>
          </div>

          <ExerciseList
            initialExercises={currentDay.exercises}
            onExercisesChange={(exercises) => {
              handleExercisesChange(exercises);
            }}
          />
        </motion.div>
      )}
    </>
  );
};

export default ExerciseEditor;
