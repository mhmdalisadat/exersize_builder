/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion } from "framer-motion";
import React from "react";
import type { FormFieldPropsType } from "../types";



const FormField: React.FC<FormFieldPropsType> = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  options,
  rows,
  min,
  max,
  variants,
}) => {
  const inputClasses =
    "w-full bg-transparent py-2 px-4 rounded-md text-right focus:outline-none text-base";
  const containerClasses =
    "w-full bg-transparent text-slate-700 text-sm border border-slate-200 rounded-md shadow-sm hover:border-slate-400 transition duration-300 relative focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500";

  return (
    <motion.div className="w-full sm:w-1/2" variants={variants}>
      <div className="text-right mb-2 text-slate-500 font-medium">{label}</div>
      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={containerClasses}
      >
        {type === "textarea" ? (
          <motion.textarea
            name={name}
            value={value}
            onChange={onChange}
            className={`${inputClasses} resize-none`}
            rows={rows}
            placeholder={placeholder}
          />
        ) : options ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className={inputClasses}
          >
            <option value="">انتخاب کنید...</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : (
          <motion.input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={inputClasses}
            placeholder={placeholder}
            min={min}
            max={max}
          />
        )}
      </motion.div>
    </motion.div>
  );
};

export default FormField;
