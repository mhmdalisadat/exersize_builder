import React from "react";
import type { SetType } from "../../../constants/setsType";
import SetTypeSelector from "./setTypes/SetTypeSelector";


const MovementEditor: React.FC = () => {
  const handleSetTypeSelect = (setType: SetType) => {
    console.log("Selected set type:", setType);
  };

  return (
    <div className="w-full">
      <SetTypeSelector onSelect={handleSetTypeSelect} />
    </div>
  );
};

export default MovementEditor;
