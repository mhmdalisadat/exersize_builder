import { motion } from "framer-motion";
import React from "react";
import { FormField } from "../../common";
import Dropdown from "../../common/dropdown";
import { useWorkoutStore } from "../../../store";
import { animations } from "../../../animation";
import {
  TRAINING_EXPERIENCE_LEVELS,
  TRAINING_GOALS,
  MEDICAL_CONDITIONS,
  INJURIES,
} from "../../../constants/enum";
import { useUpdateWorkout } from "../../../hooks";
import toast from "react-hot-toast";

interface DropdownOption {
  value: string;
  label: string;
}

interface FormField {
  type: "text" | "number" | "dropdown";
  label: string;
  name: string;
  value: string | number | string[];
  options?: DropdownOption[];
  min?: number;
  max?: number;
  placeholder?: string;
  multiple?: boolean;
}

const UserDetails: React.FC = () => {
  const { userDetails, setUserDetails, setCurrentStep, workoutData } =
    useWorkoutStore();
  const workoutId = workoutData.workout_id;

  const { mutate: updateWorkout } = useUpdateWorkout(workoutId || "");

  React.useEffect(() => {
    if (!workoutId) {
      console.error("Workout ID is not available");
      setCurrentStep(0);
    }
  }, [workoutId, setCurrentStep]);

  const handleInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: string | string[] } }
  ) => {
    const { name, value } = e.target;
    setUserDetails({ [name]: value });
  };

  const formfields: FormField[] = [
    {
      type: "text",
      label: "نام",
      name: "name",
      value: userDetails.name,
      placeholder: "نام خود را وارد کنید",
    },
    {
      type: "text",
      label: "شماره تماس",
      name: "phoneNumber",
      value: userDetails.phoneNumber,
      placeholder: "شماره تماس خود را وارد کنید",
    },
    {
      type: "number",
      label: "سن",
      name: "age",
      value: userDetails.age,
      min: 15,
      max: 100,
      placeholder: "سن خود را وارد کنید",
    },
    {
      type: "number",
      label: "قد (سانتی‌متر)",
      name: "height",
      value: userDetails.height,
      min: 100,
      max: 250,
      placeholder: "قد خود را وارد کنید",
    },
    {
      type: "number",
      label: "وزن (کیلوگرم)",
      name: "weight",
      value: userDetails.weight,
      min: 30,
      max: 200,
      placeholder: "وزن خود را وارد کنید",
    },
    {
      type: "dropdown",
      label: "سطح تجربه",
      name: "trainingExperience",
      value: userDetails.trainingExperience,
      options: TRAINING_EXPERIENCE_LEVELS.map((level) => ({
        value: level,
        label:
          level === "beginner"
            ? "مبتدی"
            : level === "intermediate"
            ? "متوسط"
            : "پیشرفته",
      })),
    },
    {
      type: "dropdown",
      label: "اهداف تمرینی",
      name: "trainingGoals",
      value: userDetails.trainingGoals,
      options: TRAINING_GOALS.map((goal) => ({
        value: goal,
        label:
          goal === "weight_loss"
            ? "کاهش وزن"
            : goal === "muscle_gain"
            ? "افزایش عضله"
            : goal === "strength"
            ? "افزایش قدرت"
            : goal === "endurance"
            ? "استقامت"
            : goal === "flexibility"
            ? "انعطاف‌پذیری"
            : "تناسب اندام عمومی",
      })),
      multiple: true,
    },
    {
      type: "dropdown",
      label: "شرایط پزشکی",
      name: "medicalConditions",
      value: userDetails.medicalConditions,
      options: MEDICAL_CONDITIONS.map((condition) => ({
        value: condition,
        label:
          condition === "heart_disease"
            ? "بیماری قلبی"
            : condition === "diabetes"
            ? "دیابت"
            : condition === "hypertension"
            ? "فشار خون بالا"
            : condition === "asthma"
            ? "آسم"
            : condition === "arthritis"
            ? "آرتریت"
            : "هیچ کدام",
      })),
      multiple: true,
    },
    {
      type: "dropdown",
      label: "آسیب‌ها",
      name: "injuries",
      value: userDetails.injuries,
      options: INJURIES.map((injury) => ({
        value: injury,
        label:
          injury === "knee"
            ? "زانو"
            : injury === "shoulder"
            ? "شانه"
            : injury === "back"
            ? "کمر"
            : injury === "wrist"
            ? "مچ دست"
            : injury === "ankle"
            ? "مچ پا"
            : "هیچ کدام",
      })),
      multiple: true,
    },
  ];

  const validateUserDetails = (): boolean => {
    return Boolean(
      userDetails.name &&
        userDetails.phoneNumber &&
        userDetails.age > 0 &&
        userDetails.height > 0 &&
        userDetails.weight > 0 &&
        userDetails.trainingExperience
    );
  };

  const handleNextStep = () => {
    if (!workoutId) {
      console.error("Cannot proceed: Workout ID is missing");
      toast.error("خطا: شناسه برنامه یافت نشد");
      return;
    }

    if (validateUserDetails()) {
      updateWorkout(
        {
          user: {
            phoneNumber: userDetails.phoneNumber,
            name: userDetails.name,
            age: userDetails.age,
            height: userDetails.height,
            weight: userDetails.weight,
            trainingExperience: userDetails.trainingExperience,
            trainingGoals: userDetails.trainingGoals,
            medicalConditions: userDetails.medicalConditions,
            injuries: userDetails.injuries,
          },
        },
        {
          onSuccess: () => {
            setCurrentStep(2);
            toast.success("اطلاعات ورزشکار با موفقیت ثبت شد");
          },
          onError: (error) => {
            console.error("Failed to update workout:", error);
            toast.error("خطا در ثبت اطلاعات ورزشکار");
          },
        }
      );
    }
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
              className="w-full"
              variants={animations.item}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {field.type === "dropdown" ? (
                <Dropdown
                  label={field.label}
                  name={field.name}
                  value={field.value as string | string[]}
                  options={field.options || []}
                  onChange={(name: string, value: string | string[]) =>
                    handleInputChange({ target: { name, value } })
                  }
                  multiple={field.multiple}
                />
              ) : (
                <FormField
                  label={field.label}
                  name={field.name}
                  value={field.value}
                  onChange={handleInputChange}
                  type={field.type}
                  min={field.min}
                  max={field.max}
                  placeholder={field.placeholder}
                  variants={animations.item}
                />
              )}
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
            disabled={!validateUserDetails()}
            className={`px-8 sm:px-12 py-3 sm:py-4 rounded-lg text-white font-medium shadow-md transition-all duration-300 ${
              validateUserDetails()
                ? "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            variants={animations.button}
            whileHover={validateUserDetails() ? { scale: 1.05 } : {}}
            whileTap={validateUserDetails() ? { scale: 0.95 } : {}}
          >
            مرحله بعد
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UserDetails;
