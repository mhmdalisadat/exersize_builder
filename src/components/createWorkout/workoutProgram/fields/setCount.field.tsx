import React from "react";
import { useMovementStore } from "../../../../store/movement.store";

interface SetCountFieldProps {
  className?: string;
  min?: number;
  max?: number;
}

const SetCountField: React.FC<SetCountFieldProps> = ({
  className = "",
  min = 1,
  max = 20,
}) => {
  const { currentSetData, setSetCount } = useMovementStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setSetCount(newValue);
  };

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        تعداد ست
      </label>
      <input
        type="number"
        value={currentSetData?.set_count ?? min}
        onChange={handleChange}
        min={min}
        max={max}
        className="w-full p-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      />
    </div>
  );
};

export default SetCountField;