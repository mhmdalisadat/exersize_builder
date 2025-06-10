import React from "react";
import { useMovementStore } from "../../../../store/movement.store";

interface SetDescFieldProps {
  className?: string;
}

const SetDescField: React.FC<SetDescFieldProps> = ({ className = "" }) => {
  const { currentSetData, setMovementDescription } = useMovementStore();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMovementDescription(e.target.value);
  };

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        توضیحات
      </label>
      <textarea
        value={currentSetData?.movement_description ?? ""}
        onChange={handleChange}
        placeholder="توضیحات تکمیلی..."
        className="w-full p-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 min-h-[100px]"
      />
    </div>
  );
};

export default SetDescField;