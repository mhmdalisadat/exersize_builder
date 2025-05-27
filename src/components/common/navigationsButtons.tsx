import { motion } from "framer-motion";
import type { NavigationButtonsPropsType } from "../../types";

const NavigationButtons: React.FC<NavigationButtonsPropsType> = ({
  onPrevious,
  onNext,
  isNextDisabled,
  variants,
  nextButtonText = "مرحله بعد",
  nextButtonClassName = "bg-gradient-to-r from-blue-500 to-indigo-600",
}) => (
  <motion.div
    className="flex justify-between w-full mt-4 sm:mt-6 gap-2 sm:gap-4"
    variants={variants}
  >
    <motion.button
      onClick={onPrevious}
      className="flex-1 px-4 sm:px-10 py-2 sm:py-3 rounded-lg text-white text-sm sm:text-base font-medium bg-gradient-to-r from-gray-500 to-gray-600 shadow-md"
      variants={variants}
      whileHover="hover"
      whileTap="tap"
    >
      مرحله قبل
    </motion.button>

    <motion.button
      onClick={onNext}
      disabled={isNextDisabled}
      className={`flex-1 px-4 sm:px-10 py-2 sm:py-3 rounded-lg text-white text-sm sm:text-base font-medium shadow-md ${
        !isNextDisabled ? nextButtonClassName : "bg-gray-400 cursor-not-allowed"
      }`}
      variants={variants}
      whileHover={!isNextDisabled ? "hover" : "disabled"}
      whileTap={!isNextDisabled ? "tap" : "disabled"}
    >
      {nextButtonText}
    </motion.button>
  </motion.div>
);

export default NavigationButtons;
