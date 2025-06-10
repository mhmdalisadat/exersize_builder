import React from "react";
import { useMovementStore } from "../../../../store/movement.store";

interface WeightFieldProps {
  className?: string;
  min?: number;
  max?: number;
  step?: number;
}

const WeightField: React.FC<WeightFieldProps> = ({
  className = "",
  min = 0,
  max = 500,
  step = 2.5,
}) => {
  const { currentSetData, setWeight, setWeightUnit } = useMovementStore();
  const weight = currentSetData?.weight ?? min;
  const weightUnit = currentSetData?.weight_unit ?? "kg";

  const handleChange = (newValue: number) => {
    setWeight(newValue);
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
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm font-medium text-gray-700">وزن</label>
        <button
          onClick={toggleUnit}
          className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors duration-200"
        >
          {weightUnit === "kg" ? "کیلوگرم" : "پوند"}
        </button>
      </div>

      <div className="flex items-center space-x-3 rtl:space-x-reverse">
        <button
          onClick={handleDecrement}
          disabled={weight <= min}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="flex-1">
          <input
            type="number"
            value={weight}
            onChange={(e) => handleChange(Number(e.target.value))}
            min={min}
            max={max}
            step={step}
            className="w-full p-2 text-center text-lg font-medium rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={handleIncrement}
          disabled={weight >= max}
          className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={weight}
        onChange={(e) => handleChange(Number(e.target.value))}
        className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />

      <div className="flex justify-between text-xs text-gray-500 mt-1">
        <span>
          {min} {weightUnit}
        </span>
        <span>
          {max} {weightUnit}
        </span>
      </div>
    </div>
  );
};

export default WeightField;