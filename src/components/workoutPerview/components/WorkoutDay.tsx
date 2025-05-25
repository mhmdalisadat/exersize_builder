import type { DayWorkout } from "../../../store/workoutStore";
import { motion } from "framer-motion";
import "./WorkoutDay.css";

interface WorkoutDayProps {
  day: DayWorkout;
  getMuscleLabel: (value: string) => string;
}

const WorkoutDay = ({ day, getMuscleLabel }: WorkoutDayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="workoutday-root"
    >
      {/* Day Header */}
      <div className="workoutday-header">
        <div className="workoutday-header-row">
          <div className="workoutday-header-title-group">
            <span className="workoutday-day-number">{day.day}</span>
    
          </div>
          <div className="workoutday-muscles">
            {day.targetMuscles.map((muscle) => (
              <span key={muscle} className="workoutday-muscle-badge">
                {getMuscleLabel(muscle)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Day Content */}
      <div className="workoutday-content">
        {day.targetMuscles.includes("rest") ? (
          <div className="workoutday-rest">
            <div className="workoutday-rest-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="workoutday-rest-svg"
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
            <p className="workoutday-rest-text">روز استراحت</p>
          </div>
        ) : (
          <div className="workoutday-exercise-list">
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
      className={`workoutday-exercise-item${
        !isLast ? " workoutday-exercise-item-mb" : ""
      }`}
    >
      <div className="workoutday-exercise-row">
        <div className="workoutday-exercise-main">
          <div className="workoutday-exercise-title-group">
            <h4 className="workoutday-exercise-title">{exercise.name}</h4>
            <span className="workoutday-settype-badge">
              {getSetTypeLabel(exercise.setType)}
            </span>
            <span className="workoutday-sets-reps">
              {exercise.sets} ست × {exercise.reps} تکرار
            </span>
            {exercise.relatedExercises &&
              exercise.relatedExercises.length > 0 && (
                <>
                  <span className="workoutday-plus">+</span>
                  {exercise.relatedExercises.map((relatedEx) => (
                    <span
                      key={relatedEx.id}
                      className="workoutday-related-badge"
                    >
                      {relatedEx.name} ({relatedEx.sets}×{relatedEx.reps})
                    </span>
                  ))}
                </>
              )}
          </div>

          {/* Set Type Specific Details */}
          {exercise.setType === "drop" && (
            <div className="workoutday-settype-detail">
              وزنه: {exercise.setConfig.weight}
              {exercise.setConfig.notes && ` (${exercise.setConfig.notes})`}
            </div>
          )}

          {exercise.setType === "restPause" && (
            <div className="workoutday-settype-detail">
              استراحت: {exercise.setConfig.restTime} ثانیه | تکرار:{" "}
              {exercise.setConfig.targetReps}
            </div>
          )}

          {/* Exercise Description */}
          {exercise.description && (
            <div className="workoutday-exercise-desc">
              {exercise.description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkoutDay;
