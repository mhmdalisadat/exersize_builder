import { motion } from "framer-motion";
import type { Step } from "./types/stepper.type";

interface MobileStepperProps {
  steps: Step[];
  currentStep: number;
  onBack: () => void;
  onNext: () => void;
  validateCurrentStep: () => boolean;
  isSubmitting?: boolean;
}

const MobileStepper = ({
  steps,
  currentStep,
  onBack,
  onNext,
  validateCurrentStep,
  isSubmitting = false,
}: MobileStepperProps) => {
  const currentStepData = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="w-full">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-gray-200 mb-6">
        <motion.div
          className="h-full bg-[#5677BC]"
          initial={{ width: 0 }}
          animate={{
            width: `${((currentStep + 1) / steps.length) * 100}%`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Current Step Info */}
      <div className="text-center mb-8">
        <h3 className="text-lg font-medium text-[#5677BC] mb-2">
          {currentStepData.title}
        </h3>
        {currentStepData.description && (
          <p className="text-sm text-gray-500">{currentStepData.description}</p>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        {!isFirstStep && (
          <motion.button
            onClick={onBack}
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium disabled:opacity-50"
          >
            مرحله قبل
          </motion.button>
        )}
        {!isLastStep && (
          <motion.button
            onClick={onNext}
            disabled={!validateCurrentStep() || isSubmitting}
            whileHover={
              validateCurrentStep() && !isSubmitting
                ? { scale: 1.02 }
                : undefined
            }
            whileTap={
              validateCurrentStep() && !isSubmitting
                ? { scale: 0.98 }
                : undefined
            }
            className={`flex-1 px-4 py-2.5 rounded-lg font-medium ${
              validateCurrentStep() && !isSubmitting
                ? "bg-[#5677BC] text-white"
                : "bg-gray-200 text-gray-500 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? "در حال پردازش..." : "مرحله بعد"}
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default MobileStepper;
