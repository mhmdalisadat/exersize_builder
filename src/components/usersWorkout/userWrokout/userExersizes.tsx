import { motion } from "framer-motion";
import { muscleOptions } from "../../../constants/muscles";
import React from "react";

interface Exercise {
  id: string;
  name: string;
  description?: string;
  sets: string;
  reps: string;
  setType: string;
  muscleGroup: string;
  isCompound: boolean;
  isIsolation: boolean;
  relatedExercises?: Array<{
    id: string;
    name: string;
    sets: string;
    reps: string;
    restTime?: number;
  }>;
  setConfig?: {
    restTime?: number;
    targetReps?: number;
    targetSets?: number;
    type?: string;
  };
}

interface Day {
  day: number;
  targetMuscles: string[];
  exercises: Exercise[];
  id: string;
  _id: string;
}

interface WorkoutData {
  success: boolean;
  message: string;
  data: {
    days: Day[];
  };
}

interface Props {
  workout: WorkoutData;
}

const UserExercises = ({ workout }: Props) => {
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

  const getMuscleLabel = (muscle: string) => {
    const found = muscleOptions.find((option) => option.value === muscle);
    return found ? found.label : muscle;
  };

  return (
    <div className="space-y-4" dir="rtl">
      {workout.data.days.map((day) => (
        <motion.div
          key={day.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden w-full max-w-4xl mx-auto"
        >
          {/* Day Header */}
          <div className="bg-[#5677BC] px-2 sm:px-3 py-1.5 sm:py-2">
            <div className="flex flex-row items-center justify-between gap-1.5 sm:gap-2">
              <div className="flex items-center">
                <span className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white text-[#5677BC] flex items-center justify-center text-xs sm:text-sm font-bold">
                  {day.day}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                {day.targetMuscles.map((muscle, index) => (
                  <React.Fragment key={muscle}>
                    <span className="px-1.5 py-0.5 bg-white/10 rounded-full text-xs text-white border border-white/20">
                      {getMuscleLabel(muscle)}
                    </span>
                    {index < day.targetMuscles.length - 1 && (
                      <span className="text-white text-xs">+</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* Day Content */}
          <div className="p-3 sm:p-4">
            {day.exercises.length === 0 ? (
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
                  <div
                    key={exercise.id}
                    className={`bg-gray-50 rounded-lg p-2 sm:p-3 ${
                      index !== day.exercises.length - 1 ? "mb-1.5 sm:mb-2" : ""
                    }`}
                  >
                    <div className="flex flex-col gap-1.5 sm:gap-2">
                      {/* Main Exercise Info */}
                      <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
                        <span className="text-[#5677BC] text-xs font-medium">
                          {index + 1}.
                        </span>
                        <h4 className="text-gray-800 text-xs sm:text-sm font-medium">
                          {exercise.name}
                        </h4>
                        {exercise.setType && (
                          <span className="px-1.5 py-0.5 bg-white rounded-full text-xs text-indigo-600 border border-indigo-100">
                            {getSetTypeLabel(exercise.setType)}
                          </span>
                        )}
                        {exercise.sets && exercise.reps && (
                          <span className="text-gray-600 text-xs">
                            {exercise.sets} ست × {exercise.reps} تکرار
                          </span>
                        )}
                      </div>

                      {/* Exercise Description */}
                      {exercise.description &&
                        exercise.description.trim() !== "" && (
                          <div className="text-xs text-gray-600 bg-white px-2 py-1 rounded border border-gray-100">
                            {exercise.description}
                          </div>
                        )}

                      {/* Exercise Type */}
                      <div className="flex flex-wrap items-center gap-1">
                        {exercise.isCompound && (
                          <span className="px-1.5 py-0.5 bg-white rounded-full text-xs text-green-600 border border-green-100">
                            چند مفصلی
                          </span>
                        )}
                        {exercise.isIsolation && (
                          <span className="px-1.5 py-0.5 bg-white rounded-full text-xs text-purple-600 border border-purple-100">
                            تک مفصلی
                          </span>
                        )}
                      </div>

                      {/* Related Exercises */}
                      {exercise.relatedExercises &&
                        exercise.relatedExercises.length > 0 && (
                          <div className="mt-1">
                            <div className="text-xs text-gray-500 mb-0.5">
                              تمرینات مرتبط:
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {exercise.relatedExercises.map((relatedEx) => (
                                <div
                                  key={relatedEx.id}
                                  className="bg-white px-1.5 py-1 rounded border border-gray-100"
                                >
                                  <div className="text-xs text-gray-800">
                                    {relatedEx.name}
                                  </div>
                                  {relatedEx.sets && relatedEx.reps && (
                                    <div className="text-xs text-gray-500">
                                      {relatedEx.sets} ست × {relatedEx.reps}{" "}
                                      تکرار
                                    </div>
                                  )}
                                  {relatedEx.restTime && (
                                    <div className="text-xs text-gray-500">
                                      استراحت: {relatedEx.restTime} ثانیه
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Set Config Details */}
                      {exercise.setConfig && (
                        <div className="text-xs text-gray-600">
                          <span className="bg-white px-1.5 py-0.5 rounded border border-gray-100">
                            {exercise.setConfig.restTime &&
                              `استراحت: ${exercise.setConfig.restTime} ثانیه`}
                            {exercise.setConfig.targetReps &&
                              exercise.setConfig.restTime &&
                              " | "}
                            {exercise.setConfig.targetReps &&
                              `تکرار: ${exercise.setConfig.targetReps}`}
                            {exercise.setConfig.targetSets &&
                              (exercise.setConfig.restTime ||
                                exercise.setConfig.targetReps) &&
                              " | "}
                            {exercise.setConfig.targetSets &&
                              `ست: ${exercise.setConfig.targetSets}`}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default UserExercises;
