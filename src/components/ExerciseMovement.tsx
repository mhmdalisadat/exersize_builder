import { useState } from "react";
import { motion } from "framer-motion";
import SelectInput from "../selectInput";

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
      muscleGroup: "",
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

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.name && formData.sets && formData.reps && formData.muscleGroup
    );
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      onSave(formData);
    }
  };

  const muscleOptions = [
    { value: "chest", label: "سینه" },
    { value: "back", label: "پشت" },
    { value: "shoulders", label: "شانه" },
    { value: "arms", label: "پشت بازو" },
    { value: "frontArms", label: "جلو بازو" },
    { value: "legs", label: "پا" },
    { value: "abs", label: "شکم" },
  ];

  
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

        {/* Muscle Group */}
        <motion.div variants={itemVariants}>
          <div className="text-right mb-2 text-slate-500 font-medium">
            گروه عضلانی
          </div>
          <SelectInput
            options={muscleOptions}
            value={formData.muscleGroup}
            onChange={handleSelectChange("muscleGroup")}
            className="w-full"
            placeholder="انتخاب کنید"
          />
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
              rows={3}
              placeholder="توضیحات حرکت را وارد کنید..."
            />
          </motion.div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex justify-between pt-2"
          variants={itemVariants}
        >
          {onCancel && (
            <motion.button
              onClick={onCancel}
              className="px-4 py-2 rounded-md text-slate-700 font-medium border border-slate-300 hover:bg-slate-50 transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              انصراف
            </motion.button>
          )}

          <motion.button
            onClick={handleSubmit}
            disabled={!isFormValid()}
            className={`px-5 py-2 rounded-md text-white font-medium ${
              isFormValid()
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:shadow-md"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            whileHover={isFormValid() ? { scale: 1.03 } : {}}
            whileTap={isFormValid() ? { scale: 0.97 } : {}}
          >
            ذخیره حرکت
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExerciseMovementForm;
