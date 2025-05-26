import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Lazy load components
const Workout = lazy(() => import("../feature/workout"));
const UserWorkout = lazy(() => import("../feature/userWorkout"));
const WorkoutPerview = lazy(
  () => import("../components/workoutPerview/workoutPerview")
);
const Router = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Redirect root to /workout */}
        <Route path="/" element={<Navigate to="/workout" replace />} />

        <Route path="/workout" element={<Workout />} />
        <Route path="/user-workout" element={<UserWorkout />} />
        <Route path="/workout-perview" element={<WorkoutPerview />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
