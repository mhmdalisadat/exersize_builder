import React, { useState } from "react";
import type { SetType } from "../../../../constants/setsType";
import { setTypeOptions } from "../../../../constants/setsType";
import { useMovementStore } from "../../../../store/movement.store";
import {
  SetCountField,
  RepCountField,
  RestTimeField,
  WeightField,
  TempoField,
} from "../fields";

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

  const renderStraightSetForm = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SetCountField min={1} max={20} />
          <RepCountField min={1} max={100} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <RestTimeField min={0} max={300} step={5} />
          <WeightField min={0} max={500} step={2.5} />
        </div>
        <TempoField />
      </div>
    );
  };

  const renderForm = () => {
    if (!selectedSetType) return null;

    switch (selectedSetType) {
      case "straight":
        return renderStraightSetForm();
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex flex-wrap gap-3 justify-center">
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

      <div className="mt-6 space-y-6">{selectedSetType && renderForm()}</div>
    </div>
  );
};

export default SetTypeSelector;
