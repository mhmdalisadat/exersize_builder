import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ExerciseMovement } from "./ExerciseMovement";
import { Trash2, Edit, Plus } from "lucide-react";
import ExerciseMovementForm from "./ExerciseMovement";

interface ExerciseListProps {
  initialExercises?: ExerciseMovement[];
  onExercisesChange?: (exercises: ExerciseMovement[]) => void;
}

const ExerciseList: React.FC<ExerciseListProps> = ({
  initialExercises = [],
  onExercisesChange,
}) => {
  const [exercises, setExercises] =
    useState<ExerciseMovement[]>(initialExercises);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingExercise, setEditingExercise] =
    useState<ExerciseMovement | null>(null);

  // Update exercises when initialExercises changes
  useEffect(() => {
    setExercises(initialExercises);
  }, [initialExercises]);

  const handleAddExercise = (exercise: ExerciseMovement) => {
    const updatedExercises = [...exercises, exercise];
    setExercises(updatedExercises);
    setShowAddForm(false);
    onExercisesChange?.(updatedExercises);
  };

  const handleUpdateExercise = (updatedExercise: ExerciseMovement) => {
    const updatedExercises = exercises.map((ex) =>
      ex.id === updatedExercise.id ? updatedExercise : ex
    );
    setExercises(updatedExercises);
    setEditingExercise(null);
    onExercisesChange?.(updatedExercises);
  };

  const handleDeleteExercise = (id: string) => {
    const updatedExercises = exercises.filter((ex) => ex.id !== id);
    setExercises(updatedExercises);
    onExercisesChange?.(updatedExercises);
  };

  // Get muscle group label
  const getMuscleLabel = (value: string) => {
    const muscleMap: Record<string, string> = {
      chest: "سینه",
      back: "پشت",
      shoulders: "شانه",
      arms: "بازو",
      legs: "پا",
      abs: "شکم",
    };
    return muscleMap[value] || value;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-indigo-700 text-right">
          لیست حرکات
        </h2>

        {!showAddForm && !editingExercise && (
          <motion.button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1 px-3 sm:px-4 py-1.5 sm:py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-all text-xs sm:text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Plus size={16} className="sm:w-5 sm:h-5" />
            <span>افزودن حرکت</span>
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4 sm:mb-6"
          >
            <ExerciseMovementForm
              onSave={handleAddExercise}
              onCancel={() => setShowAddForm(false)}
            />
          </motion.div>
        )}

        {editingExercise && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4 sm:mb-6"
          >
            <ExerciseMovementForm
              exercise={editingExercise}
              onSave={handleUpdateExercise}
              onCancel={() => setEditingExercise(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {exercises.length === 0 && !showAddForm ? (
        <div className="text-center py-6 sm:py-10 text-slate-500 text-sm sm:text-base">
          هیچ حرکتی تعریف نشده است. با کلیک روی دکمه "افزودن حرکت" شروع کنید.
        </div>
      ) : (
        <motion.div
          className="space-y-3 sm:space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {exercises.map((exercise) => (
              <motion.div
                key={exercise.id}
                className="bg-white rounded-lg p-3 sm:p-4 shadow-sm border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                <div className="flex gap-2 sm:gap-3">
                  <motion.button
                    onClick={() => handleDeleteExercise(exercise.id)}
                    className="text-red-500 hover:text-red-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 size={16} className="sm:w-5 sm:h-5" />
                  </motion.button>
                  <motion.button
                    onClick={() => setEditingExercise(exercise)}
                    className="text-indigo-500 hover:text-indigo-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit size={16} className="sm:w-5 sm:h-5" />
                  </motion.button>
                </div>

                <div className="flex-1 mr-2 sm:mr-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-slate-800 text-sm sm:text-base">
                      {exercise.name}
                    </h3>
                    <span className="text-indigo-600 text-xs sm:text-sm bg-indigo-50 px-2 py-1 rounded">
                      {exercise.setType === "straight" && "ست معمولی"}
                      {exercise.setType === "superset" && "سوپرست"}
                      {exercise.setType === "triset" && "تری‌ست"}
                      {exercise.setType === "giant" && "جاینت ست"}
                      {exercise.setType === "drop" && "دراپ ست"}
                      {exercise.setType === "restPause" && "رست-پاز"}
                      {exercise.setType === "pyramid" && "ست هرمی"}
                      {exercise.setType === "fst7" && "FST-7"}
                      {exercise.setType === "cluster" && "کلسترال"}
                      {exercise.setType === "circuit" && "سیرکویت"}
                      {exercise.setType === "hiit" && "HIIT"}
                      {exercise.setType === "preExhaust" && "پیش خستگی"}
                      {exercise.setType === "postExhaust" && "پس خستگی"}
                      {exercise.setType === "tut" && "زمان تحت فشار"}
                      {exercise.setType === "powerbuilding" && "پاوربیلدینگ"}
                      {exercise.setType === "mindMuscle" && "تمرکز ذهن-عضله"}
                    </span>
                  </div>

                  <div className="flex flex-wrap justify-end items-center gap-2 sm:gap-4 text-xs sm:text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <span>ست:</span>
                      <span className="bg-indigo-50 px-1.5 sm:px-2 py-0.5 rounded-md">
                        {exercise.sets}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>تکرار:</span>
                      <span className="bg-indigo-50 px-1.5 sm:px-2 py-0.5 rounded-md">
                        {exercise.reps}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>عضله:</span>
                      <span className="bg-indigo-50 px-1.5 sm:px-2 py-0.5 rounded-md">
                        {getMuscleLabel(exercise.muscleGroup)}
                      </span>
                    </div>
                  </div>

                  {/* Related Exercises */}
                  {exercise.relatedExercises &&
                    exercise.relatedExercises.length > 0 && (
                      <div className="mt-2 bg-slate-50 p-2 rounded-lg">
                        <div className="text-slate-600 text-xs sm:text-sm mb-1 font-medium">
                          {exercise.setType === "superset" && "حرکات سوپرست:"}
                          {exercise.setType === "triset" && "حرکات تری‌ست:"}
                          {exercise.setType === "giant" && "حرکات جاینت ست:"}
                        </div>
                        <div className="space-y-1">
                          {exercise.relatedExercises.map((relatedEx, idx) => (
                            <div
                              key={relatedEx.id}
                              className="bg-white p-1.5 rounded border border-slate-100"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-slate-700 text-xs">
                                  {idx + 1}. {relatedEx.name}
                                </span>
                                <span className="text-slate-500 text-xs">
                                  ست: {relatedEx.sets} | تکرار: {relatedEx.reps}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  {/* Set Type Specific Details */}
                  {exercise.setType === "drop" && (
                    <div className="mt-2 bg-slate-50 p-2 rounded-lg">
                      <div className="text-slate-600 text-xs">
                        <div>وزنه اولیه: {exercise.setConfig.weight}</div>
                        {exercise.setConfig.notes && (
                          <div className="mt-0.5">
                            الگوی کاهش وزنه: {exercise.setConfig.notes}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {exercise.setType === "restPause" && (
                    <div className="mt-2 bg-slate-50 p-2 rounded-lg">
                      <div className="text-slate-600 text-xs">
                        <div>
                          زمان استراحت: {exercise.setConfig.restTime} ثانیه
                        </div>
                        <div className="mt-0.5">
                          تکرار در هر مینی ست: {exercise.setConfig.targetReps}
                        </div>
                      </div>
                    </div>
                  )}

                  {exercise.description && (
                    <p className="text-xs sm:text-sm text-slate-500 mt-2">
                      {exercise.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default ExerciseList;
