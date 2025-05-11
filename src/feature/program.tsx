import { useState, useEffect } from "react";
import Stepper from "../stepper/stepper";
import type { Step } from "../stepper/types";
import { useWorkoutStore } from "../store/workoutStore";
import { motion } from "framer-motion";
import type { ExerciseMovement } from "../components/ExerciseMovement";
import WorkoutProgramStep3 from "../components/WorkoutProgramStep3";
import WorkoutProgramPreview from "../components/WorkoutProgramPreview";
import Step1Form from "../components/Step1Form";
import Step2MuscleSelection from "../components/Step2MuscleSelection";

const animations = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  },
  button: {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.6,
        type: "spring",
        stiffness: 500,
      },
    },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } },
    disabled: { scale: 1, opacity: 0.7 },
  },
};

export const muscleOptions = [
  { value: "chest", label: "سینه" },
  { value: "back", label: "پشت" },
  { value: "shoulders", label: "شانه" },
  { value: "arms", label: "بازو" },
  { value: "legs", label: "پا" },
  { value: "abs", label: "شکم" },
  { value: "rest", label: "استراحت" },
];

const Program = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const {
    workoutData,
    setWorkoutData,
    dayWorkouts,
    addDayWorkout,
    updateDayWorkout,
    removeDayWorkout,
    currentSelectedDay,
    setCurrentSelectedDay,
  } = useWorkoutStore();

  // Sync dayWorkouts with daysPerWeek
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

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setWorkoutData({ [name]: value });
  };

  const handleDayMuscleChange = (day: number) => (muscles: string[]) => {
    const dayWorkout = dayWorkouts.find((d) => d.day === day);
    if (dayWorkout) {
      updateDayWorkout({
        ...dayWorkout,
        targetMuscles: muscles,
      });
    }
  };

  const handleDaySelect = (day: number) => {
    setCurrentSelectedDay(day);
  };

  const handleExercisesChange = (exercises: ExerciseMovement[]) => {
    const dayWorkout = dayWorkouts.find((d) => d.day === currentSelectedDay);
    if (dayWorkout) {
      updateDayWorkout({
        ...dayWorkout,
        exercises,
      });
    }
  };

  // Step validation functions
  const validateStep1 = (): boolean => {
    return Boolean(
      workoutData.programName &&
        workoutData.daysPerWeek &&
        parseInt(workoutData.daysPerWeek) > 0
    );
  };

  const validateStep2 = (): boolean => {
    return (
      dayWorkouts.length > 0 &&
      dayWorkouts.every((day) => day.targetMuscles.length > 0)
    );
  };

  // Step navigation
  const handleStepClick = (index: number) => {
    if (index > currentStep) {
      if (index === 1 && !validateStep1()) return;
      if (index === 2 && !validateStep2()) return;
    }
    setCurrentStep(index);
  };

  const handleNextStep = () => {
    if (currentStep === 0 && validateStep1()) {
      setCurrentStep(1);
    } else if (currentStep === 1 && validateStep2()) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(3);
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Helper function for muscle label lookup
  const getMuscleLabel = (value: string) => {
    const option = muscleOptions.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const handlePrint = () => {
    window.print();
  };

  // Step content rendering
  const renderCurrentStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1Form
            workoutData={workoutData}
            handleInputChange={handleInputChange}
            handleNextStep={handleNextStep}
            validateStep1={validateStep1}
            animations={animations}
          />
        );
      case 1:
        return (
          <Step2MuscleSelection
            dayWorkouts={dayWorkouts}
            handleDayMuscleChange={handleDayMuscleChange}
            getMuscleLabel={getMuscleLabel}
            validateStep2={validateStep2}
            goToPreviousStep={() => setCurrentStep(0)}
            handleNextStep={handleNextStep}
            animations={animations}
          />
        );
      case 2:
        return (
          <WorkoutProgramStep3
            programName={workoutData.programName}
            description={workoutData.description}
            dayWorkouts={dayWorkouts}
            currentSelectedDay={currentSelectedDay}
            handleDaySelect={handleDaySelect}
            handleExercisesChange={handleExercisesChange}
            getMuscleLabel={getMuscleLabel}
            goToPreviousStep={goToPreviousStep}
            onFinish={handleNextStep}
          />
        );
      case 3:
        return (
          <WorkoutProgramPreview
            programName={workoutData.programName}
            description={workoutData.description}
            dayWorkouts={dayWorkouts}
            getMuscleLabel={getMuscleLabel}
            onBack={goToPreviousStep}
            onPrint={handlePrint}
          />
        );
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
          <Stepper
            steps={steps}
            currentStep={currentStep}
            onStepClick={handleStepClick}
            size="medium"
            stepSpacing="loose"
            orientation="horizontal"
          />

          <div className="mt-16">{renderCurrentStepContent()}</div>
        </motion.div>
      </div>
    </div>
  );
};

export default Program;
