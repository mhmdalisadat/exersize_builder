import React from "react";
import type { DayWorkout } from "../../../store/workoutStore";
import type { ExerciseMovement } from "../../workoutProgram/ExerciseMovement";

interface PDFWorkoutDayProps {
  day: DayWorkout;
  getMuscleLabel: (muscle: string) => string;
}

const PDFExerciseDetails = ({ exercise }: { exercise: ExerciseMovement }) => {
  const getSetTypeLabel = (type: string) => {
    const setTypeLabels: Record<string, string> = {
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
    return setTypeLabels[type] || type;
  };

  return (
    <div style={{ marginBottom: "8px" }}>
      {/* Main Exercise and Related Exercises in one line */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "4px",
        }}
      >
        <span style={{ color: "#0077B5", fontWeight: 600, fontSize: "0.9rem" }}>
          {exercise.name}
        </span>
        <span
          style={{
            padding: "2px 6px",
            background: "#fff",
            borderRadius: "12px",
            fontSize: "0.8rem",
            color: "#4f46e5",
            border: "1px solid #e0e7ff",
          }}
        >
          {getSetTypeLabel(exercise.setType)}
        </span>
        <span style={{ color: "#64748b", fontSize: "0.8rem" }}>
          {exercise.sets} ست × {exercise.reps} تکرار
        </span>

        {/* Related Exercises */}
        {exercise.relatedExercises && exercise.relatedExercises.length > 0 && (
          <>
            <span style={{ color: "#64748b", fontSize: "0.8rem" }}>+</span>
            {exercise.relatedExercises.map((relatedEx) => (
              <span
                key={relatedEx.id}
                style={{
                  padding: "2px 6px",
                  background: "#fff",
                  borderRadius: "12px",
                  fontSize: "0.8rem",
                  color: "#64748b",
                  border: "1px solid #e2e8f0",
                }}
              >
                {relatedEx.name} ({relatedEx.sets}×{relatedEx.reps})
              </span>
            ))}
          </>
        )}
      </div>

      {/* Special Set Types */}
      {exercise.setType === "drop" && (
        <div style={{ marginTop: "4px" }}>
          <span
            style={{
              padding: "2px 6px",
              background: "#f8fafc",
              borderRadius: "12px",
              fontSize: "0.8rem",
              color: "#475569",
              border: "1px solid #e2e8f0",
            }}
          >
            وزنه: {exercise.setConfig.weight}
            {exercise.setConfig.notes && ` (${exercise.setConfig.notes})`}
          </span>
        </div>
      )}

      {exercise.setType === "restPause" && (
        <div style={{ marginTop: "4px" }}>
          <span
            style={{
              padding: "2px 6px",
              background: "#f8fafc",
              borderRadius: "12px",
              fontSize: "0.8rem",
              color: "#475569",
              border: "1px solid #e2e8f0",
            }}
          >
            استراحت: {exercise.setConfig.restTime} ثانیه | تکرار:{" "}
            {exercise.setConfig.targetReps}
          </span>
        </div>
      )}

      {/* Exercise Description */}
      {exercise.description && (
        <div style={{ marginTop: "4px" }}>
          <span
            style={{
              padding: "2px 6px",
              background: "#f8fafc",
              borderRadius: "12px",
              fontSize: "0.8rem",
              color: "#475569",
              border: "1px solid #e2e8f0",
            }}
          >
            {exercise.description}
          </span>
        </div>
      )}
    </div>
  );
};

const PDFWorkoutDay = ({ day, getMuscleLabel }: PDFWorkoutDayProps) => (
  <div
    style={{
      marginBottom: "20px",
      background: "white",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
      border: "1px solid #e0e7ff",
    }}
  >
    {/* Day Header with solid background */}
    <div
      style={{
        padding: "16px",
        background: "#4f46e5",
        color: "white",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "16px",
          fontWeight: "600",
          color: "#4f46e5",
          border: "2px solid #ffffff",
        }}
      >
        {day.day}
      </div>
      <h2
        style={{
          fontSize: "16px",
          fontWeight: "600",
          margin: 0,
          color: "white",
        }}
      >
        روز {day.day}
      </h2>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", flex: 1 }}>
        {day.targetMuscles.map((muscle) => (
          <span
            key={muscle}
            style={{
              padding: "4px 12px",
              background: "#ffffff",
              borderRadius: "9999px",
              fontSize: "12px",
              color: "#4f46e5",
              border: "1px solid #ffffff",
              whiteSpace: "nowrap",
            }}
          >
            {getMuscleLabel(muscle)}
          </span>
        ))}
      </div>
    </div>

    {/* Exercises List */}
    <div style={{ padding: "16px" }}>
      {day.exercises.map((exercise: ExerciseMovement, index: number) => (
        <div
          key={index}
          style={{
            padding: "12px",
            background: "#f8fafc",
            borderRadius: "12px",
            marginBottom: index === day.exercises.length - 1 ? "0" : "8px",
            border: "1px solid #e2e8f0",
          }}
        >
          <PDFExerciseDetails exercise={exercise} />
        </div>
      ))}
    </div>
  </div>
);

export default PDFWorkoutDay;
