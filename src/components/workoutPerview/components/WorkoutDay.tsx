import type { DayWorkout } from "../../../store/workoutStore";
import { motion } from "framer-motion";

interface WorkoutDayProps {
  day: DayWorkout;
  getMuscleLabel: (value: string) => string;
}

const WorkoutDay = ({ day, getMuscleLabel }: WorkoutDayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden w-full max-w-4xl mx-auto"
    >
      {/* Day Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm sm:text-base font-bold">
              {day.day}
            </span>
            <h3 className="text-blue-700 text-sm sm:text-base font-semibold">
              روز {day.day}
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {day.targetMuscles.map((muscle) => (
              <span
                key={muscle}
                className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white rounded-full text-xs sm:text-sm text-blue-600 border border-blue-100"
              >
                {getMuscleLabel(muscle)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Day Content */}
      <div className="p-3 sm:p-4">
        {day.targetMuscles.includes("rest") ? (
          <div className="text-center py-6 sm:py-8">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2 sm:mb-3 rounded-full bg-gray-50 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            </div>
            <p className="text-gray-600 text-sm sm:text-base font-medium">
              روز استراحت
            </p>
          </div>
        ) : (
          <div className="space-y-2 sm:space-y-3">
            {day.exercises.map((exercise, index) => (
              <ExerciseItem
                key={index}
                exercise={exercise}
                isLast={index === day.exercises.length - 1}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

interface ExerciseItemProps {
  exercise: DayWorkout["exercises"][0];
  isLast: boolean;
}

const ExerciseItem = ({ exercise, isLast }: ExerciseItemProps) => {
  const getSetTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      straight: "ست معمولی",
      superset: "سوپرست",
      triset: "تری‌ست",
      giant: "جاینت ست",
      drop: "دراپ ست",
      restPause: "رست-پاز",
      pyramid: "ست هرمی",
      fst7: "FST-7",
      cluster: "کلسترال",
      circuit: "سیرکویت",
      hiit: "HIIT",
      preExhaust: "پیش خستگی",
      postExhaust: "پس خستگی",
      tut: "زمان تحت فشار",
      powerbuilding: "پاوربیلدینگ",
      mindMuscle: "تمرکز ذهن-عضله",
    };
    return labels[type] || type;
  };

  return (
    <div
      className={`bg-gray-50 rounded-lg p-3 sm:p-4 ${
        !isLast ? "mb-2 sm:mb-3" : ""
      }`}
    >
      <div className="flex flex-col gap-2 sm:gap-3">
        {/* Main Exercise Info */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <h4 className="text-gray-800 text-sm sm:text-base font-medium">
            {exercise.name}
          </h4>
          <span className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-white rounded-full text-xs sm:text-sm text-indigo-600 border border-indigo-100">
            {getSetTypeLabel(exercise.setType)}
          </span>
          <span className="text-gray-600 text-xs sm:text-sm">
            {exercise.sets} ست × {exercise.reps} تکرار
          </span>
        </div>

        {/* Related Exercises */}
        {exercise.relatedExercises && exercise.relatedExercises.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-xs sm:text-sm text-gray-500">+</span>
            {exercise.relatedExercises.map((relatedEx) => (
              <span
                key={relatedEx.id}
                className="text-xs sm:text-sm text-gray-600 bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-gray-100"
              >
                {relatedEx.name} ({relatedEx.sets}×{relatedEx.reps})
              </span>
            ))}
          </div>
        )}

        {/* Set Type Specific Details */}
        {exercise.setType === "drop" && (
          <div className="text-xs sm:text-sm text-gray-600">
            <span className="bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-gray-100">
              وزنه: {exercise.setConfig.weight}
              {exercise.setConfig.notes && ` (${exercise.setConfig.notes})`}
            </span>
          </div>
        )}

        {exercise.setType === "restPause" && (
          <div className="text-xs sm:text-sm text-gray-600">
            <span className="bg-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-gray-100">
              استراحت: {exercise.setConfig.restTime} ثانیه | تکرار:{" "}
              {exercise.setConfig.targetReps}
            </span>
          </div>
        )}

        {/* Exercise Description */}
        {exercise.description && (
          <div className="text-xs sm:text-sm text-gray-600 bg-white px-2 sm:px-3 py-1.5 sm:py-2 rounded border border-gray-100">
            {exercise.description}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkoutDay;
