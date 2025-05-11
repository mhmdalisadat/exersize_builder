import { useState } from "react";
import { motion } from "framer-motion";
import { muscleOptions } from "../feature/program";

interface MuscleOption {
  value: string;
  label: string;
}

interface MultiSelectMuscleProps {
  value: string[];
  onChange: (val: string[]) => void;
  getMuscleLabel: (value: string) => string;
}

const MultiSelectMuscle: React.FC<MultiSelectMuscleProps> = ({
  value = [],
  onChange,
  getMuscleLabel,
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
          {muscleOptions.map((option: MuscleOption) => (
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

export default MultiSelectMuscle;
