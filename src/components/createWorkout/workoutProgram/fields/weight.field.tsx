import React from "react";
import { useMovementStore } from "../../../../store/movement.store";
import { motion } from "framer-motion";

interface WeightFieldProps {
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
}

const WeightField: React.FC<WeightFieldProps> = ({
  className = "",
  min = 0,
  max = 500,
  step = 2.5,
  initialValue,
  onChange,
}) => {
  const { currentSetData, setWeight, setWeightUnit } = useMovementStore();
  const weight = currentSetData?.weight ?? min;
  const weightUnit = currentSetData?.weight_unit ?? "kg";

  const handleChange = (newValue: number) => {
    setWeight(newValue);
    onChange?.(newValue);
  };

  const handleIncrement = () => {
    if (weight < max) {
      handleChange(weight + step);
    }
  };

  const handleDecrement = () => {
    if (weight > min) {
      handleChange(weight - step);
    }
  };

  const toggleUnit = () => {
    setWeightUnit(weightUnit === "kg" ? "lb" : "kg");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`w-full ${className}`}
    >
      <div className="flex justify-between items-center mb-1">
        <label className="block text-xs text-gray-600">وزن</label>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={toggleUnit}
          className="text-xs text-indigo-500 hover:text-indigo-600 transition-colors duration-150"
        >
          {weightUnit === "kg" ? "کیلوگرم" : "پوند"}
        </motion.button>
      </div>

      <div className="flex items-center space-x-2 rtl:space-x-reverse">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDecrement}
          disabled={weight <= min}
          className="p-1.5 rounded-md border border-gray-200 hover:border-gray-300 
            disabled:opacity-50 disabled:cursor-not-allowed 
            transition-all duration-150 bg-white/50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>

        <motion.div whileHover={{ scale: 1.005 }} className="flex-1">
          <input
            type="number"
            value={initialValue ?? weight}
            onChange={(e) => handleChange(Number(e.target.value))}
            min={min}
            max={max}
            step={step}
            className="w-full px-2 py-1.5 text-center text-sm rounded-md 
              border border-gray-200 focus:border-indigo-400 focus:ring-1 
              focus:ring-indigo-400 transition-all duration-150
              text-gray-700 bg-white/50 hover:border-gray-300"
          />
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleIncrement}
          disabled={weight >= max}
          className="p-1.5 rounded-md border border-gray-200 hover:border-gray-300 
            disabled:opacity-50 disabled:cursor-not-allowed 
            transition-all duration-150 bg-white/50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-gray-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </motion.button>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={weight}
        onChange={(e) => handleChange(Number(e.target.value))}
        className="w-full mt-2 h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer
          [&::-webkit-slider-thumb]:appearance-none
          [&::-webkit-slider-thumb]:w-3
          [&::-webkit-slider-thumb]:h-3
          [&::-webkit-slider-thumb]:rounded-full
          [&::-webkit-slider-thumb]:bg-indigo-400
          [&::-webkit-slider-thumb]:hover:bg-indigo-500
          [&::-webkit-slider-thumb]:transition-colors
          [&::-webkit-slider-thumb]:duration-150"
      />

      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>
          {min} {weightUnit}
        </span>
        <span>
          {max} {weightUnit}
        </span>
      </div>
    </motion.div>
  );
};

export default WeightField;
