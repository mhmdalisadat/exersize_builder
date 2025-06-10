import React from "react";
import { useMovementStore } from "../../../../store/movement.store";

interface TempoFieldProps {
  className?: string;
}

const TempoField: React.FC<TempoFieldProps> = ({ className = "" }) => {
  const { currentSetData, setTempo } = useMovementStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempo(e.target.value);
  };

  return (
    <div className={`w-full ${className}`}>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        تمپو
      </label>
      <input
        type="text"
        value={currentSetData?.tempo ?? ""}
        onChange={handleChange}
        placeholder="مثال: 3-1-1-0"
        className="w-full p-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
      />
    </div>
  );
};

export default TempoField;