import { motion } from "framer-motion";
import React from "react";
import { FormField } from "../../common";
import { useWorkoutStore } from "../../../store";
import { animations } from "../../../animation";
import { useCreateWorkout } from "../../../hooks";
import toast from "react-hot-toast";

const WorkoutCreate: React.FC = () => {
  const { workoutData, setWorkoutData, setCurrentStep } = useWorkoutStore();
  const { mutate: createWorkout } = useCreateWorkout();

  const formfields = [
    {
      label: "نام برنامه",
      name: "workout_name",
      value: workoutData.workout_name,
      placeholder: "نام برنامه تمرینی",
    },
    {
      label: "تعداد روزهای تمرین در هفته",
      name: "workout_days_per_week",
      value: workoutData.workout_days_per_week,
      type: "number",
      min: 1,
      max: 7,
      placeholder: "تعداد روز",
    },
    {
      label: "تعداد هفته ها",
      name: "workout_weeks",
      value: workoutData.workout_weeks,
      type: "number",
      min: 1,
      max: 52,
      placeholder: "تعداد هفته ها",
    },
    {
      label: "توضیحات برنامه",
      name: "workout_description",
      value: workoutData.workout_description,
      type: "textarea",
      rows: 4,
      placeholder: "توضیحات برنامه را وارد کنید...",
      fullWidth: true,
    },
  ];

  const handleCreateWorkout = () => {
    if (!validateStep1()) return;

    createWorkout(
      {
        workout_name: workoutData.workout_name,
        workout_description: workoutData.workout_description,
        workout_weeks: workoutData.workout_weeks,
        workout_days_per_week: workoutData.workout_days_per_week,
      },
      {
        onSuccess: (response) => {
          if (response.success && response.data?.workout_id) {
            setWorkoutData({ workout_id: response.data.workout_id });
            setCurrentStep(1);
            toast.success("برنامه تمرینی با موفقیت ایجاد شد");
          }
        },
        onError: (error) => {
          console.error("Failed to create workout:", error);
          toast.error("خطا در ایجاد برنامه تمرینی");
        },
      }
    );
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setWorkoutData({ [name]: value });
  };

  const validateStep1 = (): boolean => {
    return Boolean(
      workoutData.workout_name &&
        workoutData.workout_days_per_week &&
        parseInt(workoutData.workout_days_per_week) > 0
    );
  };

  const handleNextStep = () => {
    handleCreateWorkout();
  };

  return (
    <motion.div
      className="w-full flex justify-center px-4 sm:px-6 lg:px-8"
      variants={animations.container}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="w-full max-w-[90rem] flex flex-col">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6 sm:mb-10"
          variants={animations.container}
        >
          {formfields.map((field, index) => (
            <motion.div
              key={field.name}
              className={`${field.fullWidth ? "md:col-span-2" : ""} w-full`}
              variants={animations.item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <FormField
                label={field.label}
                name={field.name}
                value={field.value}
                onChange={handleInputChange}
                type={field.type}
                min={field.min}
                max={field.max}
                rows={field.rows}
                placeholder={field.placeholder}
                variants={animations.item}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex justify-end w-full mt-6 sm:mt-8"
          variants={animations.item}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <motion.button
            onClick={handleNextStep}
            disabled={!validateStep1()}
            className={`px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-white font-medium shadow-md transition-all duration-300 ${
              validateStep1()
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            variants={animations.button}
            whileHover={validateStep1() ? { scale: 1.05 } : {}}
            whileTap={validateStep1() ? { scale: 0.95 } : {}}
          >
            مرحله بعد
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WorkoutCreate;
