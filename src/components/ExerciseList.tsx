import { useState } from "react";
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
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-indigo-700 text-right">
          لیست حرکات
        </h2>

        {!showAddForm && !editingExercise && (
          <motion.button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Plus size={18} />
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
            className="mb-6"
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
            className="mb-6"
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
        <div className="text-center py-10 text-slate-500">
          هیچ حرکتی تعریف نشده است. با کلیک روی دکمه "افزودن حرکت" شروع کنید.
        </div>
      ) : (
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {exercises.map((exercise) => (
              <motion.div
                key={exercise.id}
                className="bg-white rounded-lg p-4 shadow-sm border border-slate-200 flex justify-between items-start"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => handleDeleteExercise(exercise.id)}
                    className="text-red-500 hover:text-red-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 size={18} />
                  </motion.button>
                  <motion.button
                    onClick={() => setEditingExercise(exercise)}
                    className="text-indigo-500 hover:text-indigo-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Edit size={18} />
                  </motion.button>
                </div>

                <div className="flex-1 text-right">
                  <h3 className="font-medium text-slate-800">
                    {exercise.name}
                  </h3>
                  <div className="flex justify-end items-center gap-4 mt-1 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <span>ست:</span>
                      <span className="bg-indigo-50 px-2 py-0.5 rounded-md">
                        {exercise.sets}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>تکرار:</span>
                      <span className="bg-indigo-50 px-2 py-0.5 rounded-md">
                        {exercise.reps}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>عضله:</span>
                      <span className="bg-indigo-50 px-2 py-0.5 rounded-md">
                        {getMuscleLabel(exercise.muscleGroup)}
                      </span>
                    </div>
                  </div>
                  {exercise.description && (
                    <p className="text-sm text-slate-500 mt-2">
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
