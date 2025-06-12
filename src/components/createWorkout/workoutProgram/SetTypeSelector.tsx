import React, { useState } from "react";
import type { SetType } from "../../../constants/setsType";
import { setTypeOptions } from "../../../constants/setsType";
import { useMovementStore } from "../../../store/movement.store";
import { MovementGroupForm } from "./fields";

interface Movement {
  id: string;
  name: string;
  type: SetType;
  set_count: number;
  rep_count: number;
  rest_time: number;
  weight: number;
  weight_unit: "kg" | "lb";
  tempo: string;
  movement_description: string;
}

interface GroupData {
  type: SetType;
  set_count: number;
  rest_time: number;
  movements: Movement[];
}

interface SetTypeSelectorProps {
  onSelect: (setType: SetType) => void;
}

const SetTypeSelector: React.FC<SetTypeSelectorProps> = ({ onSelect }) => {
  const { setCurrentSetType } = useMovementStore();
  const [selectedSetType, setSelectedSetType] = useState<SetType | null>(null);

  const handleSetTypeClick = (setType: SetType) => {
    setSelectedSetType(setType);
    setCurrentSetType(setType);
    onSelect(setType);
  };

  const handleSave = (data: GroupData) => {
    console.log("Saved set data:", data);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        {setTypeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSetTypeClick(option.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${
                selectedSetType === option.value
                  ? "bg-indigo-600 text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-md"
              }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-6">
        {selectedSetType && (
          <MovementGroupForm type={selectedSetType} onSave={handleSave} />
        )}
      </div>
    </div>
  );
};

export default SetTypeSelector;
