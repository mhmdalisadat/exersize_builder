import React from "react";
import { useMovementStore } from "../../../../store/movement.store";

interface RestTimeFieldProps {
  className?: string;
  min?: number;
  max?: number;
  step?: number;
}

const RestTimeField: React.FC<RestTimeFieldProps> = ({
  className = "",
  min = 0,
  max = 300,
  step = 5,
}) => {
  const { currentSetData, setRestTime } = useMovementStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setRestTime(newValue);
  };

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        زمان استراحت (ثانیه)
      </label>
      <input
        type="number"
        value={currentSetData?.rest_time ?? min}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        className="w-full p-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      />
    </div>
  );
};

export default RestTimeField;