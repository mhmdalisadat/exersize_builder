import type { DayCardPropsType } from "../../types";
import { motion } from "framer-motion";
import MultiSelectMuscle from "../createWorkout/workoutMuscleDays/MultiSelectMuscle";

export const DayCard: React.FC<DayCardPropsType> = ({
  day,
  targetMuscles,
  onMuscleChange,
  getMuscleLabel,
  variants,
}) => (
  <motion.div
    className="bg-white p-2 sm:p-3 rounded-lg shadow-sm border border-slate-200"
    transition={{ duration: 0.2 }}
    variants={variants}
  >
    <div className="flex justify-between items-center mb-2">
      <div className="bg-[#5677BC]/10 text-[#5677BC] rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center text-xs font-medium">
        {day}
      </div>
    </div>

    <div className="w-full">
      <MultiSelectMuscle
        value={targetMuscles}
        onChange={onMuscleChange}
        getMuscleLabel={getMuscleLabel}
      />
    </div>

    {targetMuscles.includes("rest") && (
      <div className="mt-1 text-right text-xs text-amber-600">
        این روز به عنوان روز استراحت در نظر گرفته شده است.
      </div>
    )}
  </motion.div>
);

export default DayCard;
