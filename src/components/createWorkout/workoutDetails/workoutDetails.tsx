import { motion } from "framer-motion";
import React from "react";
import { FormField } from "../../common";
import { purposeOptions, trainingSystemOptions } from "../../../constants";
import { useWorkoutStore } from "../../../store";
import { animations } from "../../../animation";

const WorkoutDetails: React.FC = () => {
  const { workoutData, setWorkoutData, setCurrentStep } = useWorkoutStore();

  const formfields = [
    {
      label: "اسم",
      name: "name",
      value: workoutData.name,
      placeholder: "نام",
      section: "personal",
    },
    {
      label: "نام برنامه",
      name: "programName",
      value: workoutData.programName,
      placeholder: "نام برنامه تمرینی",
      section: "personal",
    },
    {
      label: "قد",
      name: "height",
      value: workoutData.height,
      type: "number",
      placeholder: "قد (سانتی متر)",
      section: "physical",
    },
    {
      label: "وزن",
      name: "weight",
      value: workoutData.weight,
      type: "number",
      placeholder: "وزن (کیلوگرم)",
      section: "physical",
    },
    {
      label: "سیستم تمرینی",
      name: "trainingSystem",
      value: workoutData.trainingSystem,
      options: trainingSystemOptions,
      section: "training",
    },
    {
      label: "هدف از تمرین",
      name: "purpose",
      value: workoutData.purpose,
      options: purposeOptions,
      section: "training",
    },
    {
      label: "تعداد روزهای تمرین در هفته",
      name: "daysPerWeek",
      value: workoutData.daysPerWeek,
      type: "number",
      min: 1,
      max: 7,
      placeholder: "تعداد روز",
      section: "program",
    },
    {
      label: "توضیحات برنامه",
      name: "description",
      value: workoutData.description,
      type: "textarea",
      rows: 4,
      placeholder: "توضیحات برنامه را وارد کنید...",
      section: "program",
    },
  ];

  // Group fields by section
  const personalFields = formfields.filter(
    (field) => field.section === "personal"
  );
  const physicalFields = formfields.filter(
    (field) => field.section === "physical"
  );
  const trainingFields = formfields.filter(
    (field) => field.section === "training"
  );
  const programFields = formfields.filter(
    (field) => field.section === "program"
  );

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setWorkoutData({ [name]: value });
  };

  const handleImageChange = (img: string) => {
    setWorkoutData({ userImage: img });
  };

  const validateStep1 = (): boolean => {
    return Boolean(
      workoutData.programName &&
        workoutData.daysPerWeek &&
        parseInt(workoutData.daysPerWeek) > 0
    );
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setCurrentStep(1);
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
      <div className="w-full max-w-4xl flex flex-col">
        <div className="mb-6 flex flex-col items-center w-full">
          <label
            htmlFor="userImage"
            className="flex flex-col items-center cursor-pointer w-28 h-28 rounded-full border-2 border-dashed border-blue-300 bg-blue-50 hover:bg-blue-100 transition mb-2"
          >
            {workoutData.userImage ? (
              <img
                src={workoutData.userImage}
                alt="User"
                className="w-28 h-28 rounded-full object-cover"
              />
            ) : (
              <span className="flex flex-col items-center justify-center h-full text-blue-400">
                <svg
                  className="w-8 h-8 mb-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <span className="text-xs text-blue-500">افزودن تصویر</span>
              </span>
            )}
            <input
              id="userImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) => {
                    handleImageChange((ev.target?.result as string) || "");
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
          <span className="text-xs text-slate-500 mt-1">
            عکس پروفایل (اختیاری)
          </span>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-10">
          {personalFields.map((field) => (
            <FormField
              key={field.name}
              label={field.label}
              name={field.name}
              value={field.value}
              onChange={handleInputChange}
              placeholder={field.placeholder}
              variants={animations.item}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-10">
          {physicalFields.map((field) => (
            <FormField
              key={field.name}
              label={field.label}
              name={field.name}
              value={field.value}
              onChange={handleInputChange}
              type={field.type}
              placeholder={field.placeholder}
              variants={animations.item}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6 sm:mb-10">
          {trainingFields.map((field) => (
            <FormField
              key={field.name}
              label={field.label}
              name={field.name}
              value={field.value}
              onChange={handleInputChange}
              options={field.options}
              variants={animations.item}
            />
          ))}
        </div>

        {/* Program Details Section */}
        <div className="flex flex-col gap-4 mb-6 sm:mb-10">
          {programFields.map((field) => (
            <FormField
              key={field.name}
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
          ))}
        </div>

        {/* Navigation */}
        <motion.div
          className="flex justify-end w-full mt-6 sm:mt-8"
          variants={animations.item}
        >
          <motion.button
            onClick={handleNextStep}
            disabled={!validateStep1()}
            className={`px-6 sm:px-10 py-2.5 sm:py-3 rounded-lg text-white font-medium shadow-md ${
              validateStep1()
                ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                : "bg-gray-400 cursor-not-allowed"
            }`}
            variants={animations.button}
            whileHover={validateStep1() ? "hover" : "disabled"}
            whileTap={validateStep1() ? "tap" : "disabled"}
          >
            مرحله بعد
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WorkoutDetails;
