import { motion } from "framer-motion";
import React from "react";
import MultiSelectMuscle from "./MultiSelectMuscle";

interface Step2MuscleSelectionProps {
  dayWorkouts: Array<{
    id: string;
    day: number;
    targetMuscles: string[];
    exercises: any[];
  }>;
  handleDayMuscleChange: (day: number) => (muscles: string[]) => void;
  getMuscleLabel: (value: string) => string;
  validateStep2: () => boolean;
  goToPreviousStep: () => void;
  handleNextStep: () => void;
  animations: {
    container: any;
    item: any;
    button: any;
  };
}

const Step2MuscleSelection: React.FC<Step2MuscleSelectionProps> = ({
  dayWorkouts,
  handleDayMuscleChange,
  getMuscleLabel,
  validateStep2,
  goToPreviousStep,
  handleNextStep,
  animations,
}) => {
  return (
    <motion.div
      className="w-full flex justify-center"
      variants={animations.container}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="w-4/5 flex flex-col">
        <motion.h2
          className="text-xl font-bold mb-6 text-right text-indigo-700"
          variants={animations.item}
        >
          تعیین عضلات برای هر روز
        </motion.h2>

        <motion.div className="mb-8 space-y-6" variants={animations.item}>
          {dayWorkouts.map((day) => (
            <motion.div
              key={day.id}
              className="bg-white p-5 rounded-lg shadow-sm border border-slate-200"
              transition={{ duration: 0.2 }}
            >
              <div className="flex justify-between items-center mb-4">
                <div className="bg-indigo-50 text-indigo-700 rounded-full h-7 w-7 flex items-center justify-center text-sm font-medium">
                  {day.day}
                </div>
                <h3 className="text-right text-lg font-medium text-slate-800">
                  روز {day.day}
                </h3>
              </div>

              <div className="mb-2 text-right text-slate-500 text-sm">
                گروه‌های عضلانی
              </div>
              <MultiSelectMuscle
                value={day.targetMuscles}
                onChange={handleDayMuscleChange(day.day)}
                getMuscleLabel={getMuscleLabel}
              />

              {day.targetMuscles.includes("rest") && (
                <div className="mt-3 text-right text-sm text-amber-600">
                  این روز به عنوان روز استراحت در نظر گرفته شده است.
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Navigation buttons */}
        <motion.div
          className="flex justify-between w-full mt-6"
          variants={animations.item}
        >
          <motion.button
            onClick={goToPreviousStep}
            className="px-10 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-gray-500 to-gray-600 shadow-md"
            variants={animations.button}
            whileHover="hover"
            whileTap="tap"
          >
            مرحله قبل
          </motion.button>

          <motion.button
            onClick={handleNextStep}
            disabled={!validateStep2()}
            className={`px-10 py-3 rounded-lg text-white font-medium shadow-md ${
              validateStep2()
                ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            variants={animations.button}
            whileHover={validateStep2() ? "hover" : "disabled"}
            whileTap={validateStep2() ? "tap" : "disabled"}
          >
            مرحله بعد
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Step2MuscleSelection;
