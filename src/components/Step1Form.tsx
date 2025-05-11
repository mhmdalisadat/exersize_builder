/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import React from "react";

interface Step1FormProps {
  workoutData: {
    programName: string;
    daysPerWeek: string;
    description: string;
    name: string;
    height: string;
    weight: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleNextStep: () => void;
  validateStep1: () => boolean;
  animations: {
    container: any;
    item: any;
    button: any;
  };
}

const Step1Form: React.FC<Step1FormProps> = ({
  workoutData,
  handleInputChange,
  handleNextStep,
  validateStep1,
  animations,
}) => {
  return (
    <motion.div
      className="w-full flex justify-center"
      variants={animations.container}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="w-4/5 flex flex-col">
        {/* Two columns, first row */}
        <div className="flex flex-row gap-4 mb-10">
          {/* Name - Left column */}
          <motion.div className="w-1/2" variants={animations.item}>
            <div className="text-right mb-2 text-slate-500 font-medium">
              اسم
            </div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md shadow-sm hover:border-slate-400 transition duration-300 relative"
            >
              <motion.input
                type="text"
                name="name"
                value={workoutData.name}
                onChange={handleInputChange}
                className="w-full bg-transparent py-2 px-4 rounded-md text-right focus:outline-none"
                placeholder="نام"
              />
            </motion.div>
          </motion.div>

          {/* Program Name - Right column */}
          <motion.div className="w-1/2" variants={animations.item}>
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
        </div>

        {/* Two columns, second row */}
        <div className="flex flex-row gap-4 mb-10">
          {/* Height - Left column */}
          <motion.div className="w-1/2" variants={animations.item}>
            <div className="text-right mb-2 text-slate-500 font-medium">قد</div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md shadow-sm hover:border-slate-400 transition duration-300 relative"
            >
              <motion.input
                type="number"
                name="height"
                value={workoutData.height}
                onChange={handleInputChange}
                className="w-full bg-transparent py-2 px-4 rounded-md text-right focus:outline-none"
                placeholder="قد (سانتی متر)"
              />
            </motion.div>
          </motion.div>

          {/* Weight - Right column */}
          <motion.div className="w-1/2" variants={animations.item}>
            <div className="text-right mb-2 text-slate-500 font-medium">
              وزن
            </div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md shadow-sm hover:border-slate-400 transition duration-300 relative"
            >
              <motion.input
                type="number"
                name="weight"
                value={workoutData.weight}
                onChange={handleInputChange}
                className="w-full bg-transparent py-2 px-4 rounded-md text-right focus:outline-none"
                placeholder="وزن (کیلوگرم)"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Days per week */}
        <motion.div className="w-full mb-10" variants={animations.item}>
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
        <motion.div className="w-full mb-10" variants={animations.item}>
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
          variants={animations.item}
        >
          <motion.button
            onClick={handleNextStep}
            disabled={!validateStep1()}
            className={`px-10 py-3 rounded-lg text-white font-medium shadow-md ${
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

export default Step1Form;
