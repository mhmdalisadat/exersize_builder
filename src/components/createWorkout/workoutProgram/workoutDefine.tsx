/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import { animations } from "../../../animation";

import type { DayWorkout } from "../../../store/workoutStore";
import MovementEditor from "./movmentEditor";


interface WorkoutHeaderProps {
  title: string;
  currentDay: DayWorkout;
  onExercisesChange: (exercises: any) => void;
}



const WorkoutDefine: React.FC<WorkoutHeaderProps> = ({ title, currentDay }) => {
  return (
    <div className="w-full max-w-3xl mx-auto px-2 sm:px-4 md:px-6 py-2">
      <motion.div
        className="bg-white rounded-xl shadow-sm p-3 sm:p-4 mb-4 sm:mb-6"
        variants={animations.item}
      >
        <motion.div
          className="flex flex-col gap-4 sm:gap-6"
          variants={animations.item}
        >
          <motion.h2
            className="text-lg sm:text-xl font-bold text-center text-indigo-700 mb-2"
            variants={animations.item}
          >
            {title}
          </motion.h2>

          {currentDay && !currentDay.targetMuscles.includes("rest") && (
            <motion.div
              variants={animations.item}
              className="bg-white rounded-xl shadow-sm p-3 sm:p-4"
            >
              <div className="flex flex-col mb-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-2 sm:mb-4 gap-1 sm:gap-0 px-2">
                <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                  <h2 className="text-base sm:text-sm font-medium text-gray-700">
                    تعریف حرکات
                  </h2>
                  <span className="text-xs text-gray-500 sm:hidden">
                    روز {currentDay.day}
                  </span>
                </div>
                <span className="text-xs text-gray-500 hidden sm:block">
                  روز {currentDay.day}
                </span>
              </div>
              <MovementEditor />
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WorkoutDefine;
