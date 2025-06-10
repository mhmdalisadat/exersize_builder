/* eslint-disable @typescript-eslint/no-explicit-any */
// src/components/createWorkout/workoutProgram/setTypes/MovementForm.tsx
import React from "react";
import {
  SetCountField,
  RepCountField,
  WeightField,
  RestTimeField,
  TempoField,
  SetDescField,
} from "../fields";

interface MovementFormProps {
  movement: any; // نوع دقیق را از استور بگیرید
  onChange: (data: any) => void;
}

const MovementForm: React.FC<MovementFormProps> = ({ movement, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SetCountField
          value={movement?.set_count ?? 3}
          onChange={(value) => onChange({ set_count: value })}
          min={1}
          max={20}
        />
        <RepCountField
          value={movement.rep_count}
          onChange={(value) => onChange({ rep_count: value })}
          min={1}
          max={100}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WeightField
          value={movement.weight}
          onChange={(value) => onChange({ weight: value })}
          min={0}
          max={500}
          step={0.5}
        />
        <RestTimeField
          value={movement.rest_time}
          onChange={(value) => onChange({ rest_time: value })}
          min={0}
          max={300}
          step={5}
        />
      </div>

      <TempoField
        value={movement.tempo}
        onChange={(value) => onChange({ tempo: value })}
      />
      <SetDescField
        value={movement.movement_description}
        onChange={(value) => onChange({ movement_description: value })}
      />
    </div>
  );
};

export default MovementForm;
