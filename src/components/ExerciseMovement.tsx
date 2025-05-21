import { useState } from "react";
import { motion } from "framer-motion";

export interface ExerciseMovement {
  id: string;
  name: string;
  sets: string;
  reps: string;
  description: string;
  muscleGroup: string;
}

interface ExerciseMovementProps {
  exercise?: ExerciseMovement;
  onSave: (exercise: ExerciseMovement) => void;
  onCancel?: () => void;
}

const ExerciseMovementForm: React.FC<ExerciseMovementProps> = ({
  exercise,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<ExerciseMovement>(
    exercise || {
      id: Math.random().toString(36).substring(2, 9),
      name: "",
      sets: "",
      reps: "",
      description: "",
      muscleGroup: "chest", // Default value
    }
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="bg-white rounded-lg p-6 shadow-md border border-slate-200 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h3 className="text-lg font-medium text-indigo-700 mb-4 text-right">
        تعریف حرکت تمرینی
      </h3>

      <div className="space-y-6">
        {/* Exercise Name */}
        <motion.div variants={itemVariants}>
          <div className="text-right mb-2 text-slate-500 font-medium">
            نام حرکت
          </div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md shadow-sm hover:border-slate-400 transition duration-300 relative"
          >
            <motion.input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-transparent py-2 px-4 rounded-md text-right focus:outline-none"
              placeholder="نام حرکت"
            />
          </motion.div>
        </motion.div>

        {/* Sets and Reps */}
        <motion.div className="flex gap-6" variants={itemVariants}>
          <div className="w-1/2">
            <div className="text-right mb-2 text-slate-500 font-medium">
              تعداد ست
            </div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md shadow-sm hover:border-slate-400 transition duration-300 relative"
            >
              <motion.input
                type="number"
                name="sets"
                value={formData.sets}
                onChange={handleInputChange}
                className="w-full bg-transparent py-2 px-4 rounded-md text-right focus:outline-none"
                min="1"
                placeholder="تعداد ست"
              />
            </motion.div>
          </div>

          <div className="w-1/2">
            <div className="text-right mb-2 text-slate-500 font-medium">
              تعداد تکرار
            </div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md shadow-sm hover:border-slate-400 transition duration-300 relative"
            >
              <motion.input
                type="number"
                name="reps"
                value={formData.reps}
                onChange={handleInputChange}
                className="w-full bg-transparent py-2 px-4 rounded-md text-right focus:outline-none"
                min="1"
                placeholder="تعداد تکرار"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants}>
          <div className="text-right mb-2 text-slate-500 font-medium">
            توضیحات
          </div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md shadow-sm hover:border-slate-400 transition duration-300 relative"
          >
            <motion.textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-transparent py-2 px-4 rounded-md text-right resize-none focus:outline-none"
              rows={4}
              placeholder="توضیحات حرکت را وارد کنید..."
            />
          </motion.div>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex justify-end gap-4 mt-6"
          variants={itemVariants}
        >
          {onCancel && (
            <motion.button
              onClick={onCancel}
              className="px-6 py-2 rounded-lg text-slate-600 font-medium bg-slate-100 hover:bg-slate-200 transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              انصراف
            </motion.button>
          )}
          <motion.button
            onClick={handleSubmit}
            className="px-6 py-2 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 transition-all"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            ذخیره
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExerciseMovementForm;
