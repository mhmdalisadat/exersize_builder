import { lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Loader } from "../components";

// Lazy load components
const Workout = lazy(() => import("../feature/workout"));
const UserWorkout = lazy(() => import("../feature/userWorkout"));

const Router = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Redirect root to /workout */}
        <Route path="/" element={<Navigate to="/workout" replace />} />

        <Route path="/workout" element={<Workout />} />
        <Route path="/view/:id" element={<UserWorkout />} />
      </Routes>
    </Suspense>
  );
};

export default Router;
