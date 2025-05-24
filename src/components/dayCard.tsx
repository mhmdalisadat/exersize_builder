import type { DayCardPropsType } from "../types";
import { motion } from "framer-motion";
import MultiSelectMuscle from "./MultiSelectMuscle";

export const DayCard: React.FC<DayCardPropsType> = ({
  day,
  targetMuscles,
  onMuscleChange,
  getMuscleLabel,
  variants,
}) => (
  <motion.div
    className="bg-white p-3 sm:p-5 rounded-lg shadow-sm border border-slate-200"
    transition={{ duration: 0.2 }}
    variants={variants}
  >
    <div className="flex justify-between items-center mb-3 sm:mb-4">
      <div className="bg-indigo-50 text-indigo-700 rounded-full h-6 w-6 sm:h-7 sm:w-7 flex items-center justify-center text-xs sm:text-sm font-medium">
        {day}
      </div>
      <h3 className="text-right text-base sm:text-lg font-medium text-slate-800">
        روز {day}
      </h3>
    </div>

    <div className="mb-2 text-right text-slate-500 text-xs sm:text-sm">
      گروه‌های عضلانی
    </div>
    <div className="w-full">
      <MultiSelectMuscle
        value={targetMuscles}
        onChange={onMuscleChange}
        getMuscleLabel={getMuscleLabel}
      />
    </div>

    {targetMuscles.includes("rest") && (
      <div className="mt-2 sm:mt-3 text-right text-xs sm:text-sm text-amber-600">
        این روز به عنوان روز استراحت در نظر گرفته شده است.
      </div>
    )}
  </motion.div>
);

export default DayCard;
