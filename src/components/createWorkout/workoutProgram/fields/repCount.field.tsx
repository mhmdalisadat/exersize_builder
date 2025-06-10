import React from "react";
import { useMovementStore } from "../../../../store/movement.store";

interface RepCountFieldProps {
  className?: string;
  min?: number;
  max?: number;
}

const RepCountField: React.FC<RepCountFieldProps> = ({
  className = "",
  min = 1,
  max = 100,
}) => {
  const { currentSetData, setRepCount } = useMovementStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setRepCount(newValue);
  };

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        تعداد تکرار
      </label>
      <input
        type="number"
        value={currentSetData?.rep_count ?? min}
        onChange={handleChange}
        min={min}
        max={max}
        className="w-full p-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      />
    </div>
  );
};

export default RepCountField;