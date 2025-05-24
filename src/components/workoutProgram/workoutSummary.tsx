import { motion } from "framer-motion";

import type { DayWorkout } from "../../store/workoutStore";

interface WorkoutSummaryProps {
  programName: string;
  description: string;
  dayWorkouts: DayWorkout[];
  getMuscleLabel: (value: string) => string;
}

const WorkoutSummary = ({
  programName,
  description,
  dayWorkouts,
  getMuscleLabel,
}: WorkoutSummaryProps) => {
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

  return (
    <motion.div variants={containerVariants} className="space-y-4 sm:space-y-6">
      {/* Program Summary */}
      <motion.div
        className="bg-indigo-50 p-4 sm:p-6 rounded-lg border border-indigo-100 mb-6 sm:mb-8"
        variants={itemVariants}
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
          <div className="bg-indigo-100 text-indigo-700 px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm font-medium">
            {dayWorkouts.length} روز
          </div>
          <h3 className="text-right text-lg sm:text-xl font-bold text-indigo-800">
            {programName}
          </h3>
        </div>
        {description && (
          <p className="text-right text-indigo-700 text-xs sm:text-sm mb-2">
            {description}
          </p>
        )}
      </motion.div>

      {/* Days Summary */}
      {dayWorkouts.map((day) => (
        <motion.div
          key={day.id}
          className="bg-white p-4 sm:p-5 rounded-lg shadow-sm border border-slate-200"
          variants={itemVariants}
          whileHover={{
            y: -2,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="bg-indigo-50 text-indigo-700 rounded-full h-6 w-6 sm:h-7 sm:w-7 flex items-center justify-center text-xs sm:text-sm font-medium">
              {day.day}
            </div>
            <h3 className="text-right text-base sm:text-lg font-medium text-slate-800">
              روز {day.day}
            </h3>
          </div>

          <div className="mb-3">
            <div className="text-right mb-2 text-slate-600 text-xs sm:text-sm font-medium">
              گروه‌های عضلانی:
            </div>
            <div className="flex flex-wrap gap-1 justify-end">
              {day.targetMuscles.map((muscle) => (
                <span
                  key={muscle}
                  className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md text-xs sm:text-sm"
                >
                  {getMuscleLabel(muscle)}
                </span>
              ))}
            </div>
          </div>

          {day.targetMuscles.includes("rest") ? (
            <div className="mt-3 text-right text-amber-600 text-xs sm:text-sm font-medium">
              این روز به عنوان روز استراحت در نظر گرفته شده است.
            </div>
          ) : (
            <>
              <div className="text-right mb-2 text-slate-600 text-xs sm:text-sm font-medium mt-4">
                تمرین‌ها:
              </div>
              {day.exercises.length > 0 ? (
                <div className="space-y-2 sm:space-y-3">
                  {day.exercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className="bg-slate-50 p-2 sm:p-3 rounded-md border border-slate-100"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4 mb-2">
                        <span className="text-indigo-700 text-xs bg-indigo-50 px-2 py-0.5 rounded">
                          {getMuscleLabel(exercise.muscleGroup)}
                        </span>
                        <h4 className="text-right font-medium text-slate-700 text-sm sm:text-base">
                          {exercise.name}
                        </h4>
                      </div>
                      <div className="flex justify-end gap-2 sm:gap-3 text-xs sm:text-sm text-slate-600">
                        <span>{exercise.reps} تکرار</span>
                        <span>{exercise.sets} ست</span>
                      </div>
                      {exercise.description && (
                        <p className="text-right text-xs text-slate-500 mt-2">
                          {exercise.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-right text-slate-500 text-xs sm:text-sm italic">
                  هنوز تمرینی تعریف نشده است.
                </div>
              )}
            </>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
};

export default WorkoutSummary;
