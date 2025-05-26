import { useEffect } from "react";
import { MobileStepper, Stepper } from "../stepper";
import type { Step } from "../stepper/types";
import { useWorkoutStore } from "../store";
import { motion } from "framer-motion";
import {
  WorkoutDetails,
  WorkoutMuscleDays,
  WorkoutProgram,
  WorkoutPerview,
} from "../components";

const Workout = () => {
  const {
    workoutData,
    dayWorkouts,
    addDayWorkout,
    updateDayWorkout,
    removeDayWorkout,
    currentStep,
    goToStep,
    goToNextStep,
    goToPreviousStep,
    validateStep1,
    validateStep2,
    validateCurrentStep,
  } = useWorkoutStore();

  useEffect(() => {
    const daysCount = parseInt(workoutData.daysPerWeek) || 0;

    // Remove extra days if daysPerWeek is reduced
    if (daysCount < dayWorkouts.length) {
      const toKeep = dayWorkouts.slice(0, daysCount);
      toKeep.forEach((day) => updateDayWorkout(day));
      dayWorkouts.slice(daysCount).forEach((day) => removeDayWorkout(day.id));
    }

    // Add new days if needed
    if (daysCount > 0) {
      for (let i = 1; i <= daysCount; i++) {
        const existingDay = dayWorkouts.find((d) => d.day === i);
        if (!existingDay) {
          addDayWorkout({
            day: i,
            id: `day-${i}`,
            targetMuscles: [],
            exercises: [],
          });
        }
      }
    }
  }, [
    workoutData.daysPerWeek,
    dayWorkouts,
    addDayWorkout,
    updateDayWorkout,
    removeDayWorkout,
  ]);

  const handleStepClick = (index: number) => {
    goToStep(index);
  };

  const renderCurrentStepContent = () => {
    switch (currentStep) {
      case 0:
        return <WorkoutDetails />;
      case 1:
        return <WorkoutMuscleDays />;
      case 2:
        return <WorkoutProgram />;
      case 3:
        return <WorkoutPerview />;
      default:
        return null;
    }
  };

  const steps: Step[] = [
    {
      title: "اطلاعات برنامه",
      description: "تعداد روزها و نام برنامه",
      status: "default",
      validationFn: validateStep1,
    },
    {
      title: "تعیین عضلات",
      description: "برنامه‌ریزی روزانه",
      status: "default",
      validationFn: validateStep2,
    },
    {
      title: "حرکات تمرینی",
      description: "تعریف حرکات",
      status: "default",
    },
    {
      title: "پیش‌نمایش",
      description: "مشاهده و چاپ برنامه",
      status: "default",
    },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.h1
          className="text-3xl font-bold text-center mb-8 text-indigo-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          برنامه تمرینی
        </motion.h1>
        <motion.div
          className="bg-white rounded-xl shadow-lg p-8 border border-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Desktop Stepper */}
          <div className="hidden md:block">
            <Stepper
              steps={steps}
              currentStep={currentStep}
              onStepClick={handleStepClick}
              size="medium"
              stepSpacing="loose"
              orientation="horizontal"
            />
          </div>

          {/* Mobile Stepper */}
          <div className="md:hidden">
            <MobileStepper
              steps={steps}
              currentStep={currentStep}
              onBack={goToPreviousStep}
              onNext={goToNextStep}
              validateCurrentStep={validateCurrentStep}
            />
          </div>

          <div className="mt-16">{renderCurrentStepContent()}</div>
        </motion.div>
      </div>
    </div>
  );
};

export default Workout;
