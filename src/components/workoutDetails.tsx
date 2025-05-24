import { motion } from "framer-motion";
import React from "react";
import type { WorkoutDetailsPropsType } from "../types";
import { FormField } from ".";
import { purposeOptions, trainingSystemOptions } from "../constants";

const WorkoutDetails: React.FC<WorkoutDetailsPropsType> = ({
  workoutData,
  handleInputChange,
  handleNextStep,
  validateStep1,
  animations,
}) => {
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

  return (
    <motion.div
      className="w-full flex justify-center px-4 sm:px-6 lg:px-8"
      variants={animations.container}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="w-full max-w-4xl flex flex-col">
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
