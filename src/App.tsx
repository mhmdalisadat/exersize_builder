import { useState, useEffect } from "react";
import Stepper from "./stepper/stepper";
import type { Step } from "./stepper/types/stepper.type";
import { useWorkoutStore } from "./store/workoutStore";
import { motion } from "framer-motion";
import type { ExerciseMovement } from "./components/ExerciseMovement";
import WorkoutProgramStep3 from "./components/WorkoutProgramStep3";
import WorkoutProgramPreview from "./components/WorkoutProgramPreview";

const App = () => {
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

  // Create or update day workouts when daysPerWeek changes
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

  const validateStep1 = (): boolean => {
    return Boolean(
      workoutData.programName &&
        workoutData.daysPerWeek &&
        parseInt(workoutData.daysPerWeek) > 0
    );
  };

  const validateStep2 = (): boolean => {
    // Check if all days have at least one muscle group assigned
    return (
      dayWorkouts.length > 0 &&
      dayWorkouts.every((day) => day.targetMuscles.length > 0)
    );
  };

  const handleStepClick = (index: number) => {
    if (index > currentStep) {
      if (index === 1 && !validateStep1()) {
        return;
      }
      if (index === 2 && !validateStep2()) {
        return;
      }
    }
    setCurrentStep(index);
  };

  const handleNextStep = () => {
    if (currentStep === 0 && validateStep1()) {
      setCurrentStep(1);
    } else if (currentStep === 1 && validateStep2()) {
      setCurrentStep(2);
    }
  };

  const muscleOptions = [
    { value: "chest", label: "سینه" },
    { value: "back", label: "پشت" },
    { value: "shoulders", label: "شانه" },
    { value: "arms", label: "بازو" },
    { value: "legs", label: "پا" },
    { value: "abs", label: "شکم" },
    { value: "rest", label: "استراحت" },
  ];

  // Get muscle label
  const getMuscleLabel = (value: string) => {
    const option = muscleOptions.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const buttonVariants = {
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
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
    disabled: {
      scale: 1,
      opacity: 0.7,
    },
  };

  // Step 1 content - Define program name and days per week
  const renderStep1Content = () => (
    <motion.div
      className="w-full flex justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="w-4/5 flex flex-col">
        {/* Program Name */}
        <motion.div className="w-full mb-10" variants={itemVariants}>
          <div className="text-right mb-2 text-slate-500 font-medium">
            نام برنامه
          </div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md shadow-sm hover:border-slate-400 transition duration-300 relative"
          >
            <motion.input
              type="text"
              name="programName"
              value={workoutData.programName}
              onChange={handleInputChange}
              className="w-full bg-transparent py-2 px-4 rounded-md text-right focus:outline-none"
              placeholder="نام برنامه تمرینی"
            />
          </motion.div>
        </motion.div>

        {/* Days per week */}
        <motion.div className="w-full mb-10" variants={itemVariants}>
          <div className="text-right mb-2 text-slate-500 font-medium">
            تعداد روزهای تمرین در هفته
          </div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md shadow-sm hover:border-slate-400 transition duration-300 relative"
          >
            <motion.input
              type="number"
              name="daysPerWeek"
              value={workoutData.daysPerWeek}
              onChange={handleInputChange}
              className="w-full bg-transparent py-2 px-4 rounded-md text-right focus:outline-none"
              min="1"
              max="7"
              placeholder="تعداد روز"
            />
          </motion.div>
        </motion.div>

        {/* Description */}
        <motion.div className="w-full mb-10" variants={itemVariants}>
          <div className="text-right mb-2 text-slate-500 font-medium">
            توضیحات برنامه
          </div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md shadow-sm hover:border-slate-400 transition duration-300 relative"
          >
            <motion.textarea
              name="description"
              value={workoutData.description}
              onChange={handleInputChange}
              className="w-full bg-transparent py-2 px-4 rounded-md text-right resize-none focus:outline-none"
              rows={4}
              placeholder="توضیحات برنامه را وارد کنید..."
            />
          </motion.div>
        </motion.div>

        {/* Next button */}
        <motion.div
          className="flex justify-end w-full mt-6"
          variants={itemVariants}
        >
          <motion.button
            onClick={handleNextStep}
            disabled={!validateStep1()}
            className={`px-10 py-3 rounded-lg text-white font-medium shadow-md ${
              validateStep1()
                ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            variants={buttonVariants}
            whileHover={validateStep1() ? "hover" : "disabled"}
            whileTap={validateStep1() ? "tap" : "disabled"}
          >
            مرحله بعد
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );

  // Custom component for multi-select muscle groups
  const MultiSelectMuscle = ({
    value = [],
    onChange,
  }: {
    value: string[];
    onChange: (val: string[]) => void;
  }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleSingleSelect = (val: string) => {
      // Rest day is exclusive
      if (val === "rest") {
        onChange(["rest"]);
      } else {
        // If selecting a muscle, remove 'rest' if present
        const newValue = value.filter((v) => v !== "rest");
        if (newValue.includes(val)) {
          onChange(newValue.filter((v) => v !== val));
        } else {
          onChange([...newValue, val]);
        }
      }
      setIsOpen(false);
    };

    return (
      <div className="relative w-full">
        <motion.div
          onClick={() => setIsOpen(!isOpen)}
          className="w-full bg-transparent py-2 px-4 border border-slate-200 rounded-md text-right cursor-pointer flex items-center justify-between hover:border-slate-400 transition"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex-1 text-right">
            {value.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {value.map((v) => (
                  <span
                    key={v}
                    className="bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-md text-sm"
                  >
                    {getMuscleLabel(v)}
                  </span>
                ))}
              </div>
            ) : (
              <span className="text-slate-400">عضلات را انتخاب کنید</span>
            )}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isOpen ? "transform rotate-180" : ""
            }`}
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>

        {isOpen && (
          <motion.div
            className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {muscleOptions.map((option) => (
              <div
                key={option.value}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-slate-100 text-right flex justify-between items-center ${
                  value.includes(option.value) ? "bg-slate-50" : ""
                }`}
                onClick={() => handleSingleSelect(option.value)}
              >
                <div
                  className={`h-4 w-4 rounded-sm border ${
                    value.includes(option.value)
                      ? "bg-indigo-500 border-indigo-500"
                      : "border-gray-300"
                  } flex items-center justify-center`}
                >
                  {value.includes(option.value) && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="#fff"
                      className="w-3 h-3"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span>{option.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    );
  };


  const renderStep2Content = () => (
    <motion.div
      className="w-full flex justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="w-4/5 flex flex-col">
        <motion.h2
          className="text-xl font-bold mb-6 text-right text-indigo-700"
          variants={itemVariants}
        >
          تعیین عضلات برای هر روز
        </motion.h2>

        <motion.div className="mb-8 space-y-6" variants={itemVariants}>
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
          variants={itemVariants}
        >
          <motion.button
            onClick={() => setCurrentStep(0)}
            className="px-10 py-3 rounded-lg text-white font-medium bg-gradient-to-r from-gray-500 to-gray-600 shadow-md"
            variants={buttonVariants}
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
            variants={buttonVariants}
            whileHover={validateStep2() ? "hover" : "disabled"}
            whileTap={validateStep2() ? "tap" : "disabled"}
          >
            مرحله بعد
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );

  // Step 3 content - Define exercises for each day
  const renderStep3Content = () => {
    return (
      <WorkoutProgramStep3
        programName={workoutData.programName}
        description={workoutData.description}
        dayWorkouts={dayWorkouts}
        currentSelectedDay={currentSelectedDay}
        handleDaySelect={handleDaySelect}
        handleExercisesChange={handleExercisesChange}
        getMuscleLabel={getMuscleLabel}
        goToPreviousStep={() => setCurrentStep(1)}
        onFinish={() => alert("برنامه تمرینی با موفقیت ایجاد شد!")}
      />
    );
  };

  const handlePrint = () => {
    window.print();
  };

  // Step 4 content - Preview the complete program
  const renderStep4Content = () => {
    return (
      <WorkoutProgramPreview
        programName={workoutData.programName}
        description={workoutData.description}
        dayWorkouts={dayWorkouts}
        getMuscleLabel={getMuscleLabel}
        onBack={() => setCurrentStep(2)}
        onPrint={handlePrint}
      />
    );
  };

  // Render the current step content
  const renderCurrentStepContent = () => {
    switch (currentStep) {
      case 0:
        return renderStep1Content();
      case 1:
        return renderStep2Content();
      case 2:
        return renderStep3Content();
      case 3:
        return renderStep4Content();
      default:
        return renderStep1Content();
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

export default App;
