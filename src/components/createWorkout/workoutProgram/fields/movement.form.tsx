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
import NameField from "./name.field";

interface MovementFormProps {
  movement: any; // نوع دقیق را از استور بگیرید
  onChange: (data: any) => void;
}

const MovementForm: React.FC<MovementFormProps> = ({ movement, onChange }) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <NameField
          initialValue={movement.name}
          onChange={(value: string) => onChange({ name: value })}
        />
        <SetCountField
          initialValue={movement?.set_count ?? 3}
          onChange={(value: number) => onChange({ set_count: value })}
          min={1}
          max={20}
        />
        <RepCountField
          initialValue={movement.rep_count}
          onChange={(value: number) => onChange({ rep_count: value })}
          min={1}
          max={100}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WeightField
          initialValue={movement.weight}
          onChange={(value: number) => onChange({ weight: value })}
          min={0}
          max={500}
          step={0.5}
        />
        <RestTimeField
          initialValue={movement.rest_time}
          onChange={(value: number) => onChange({ rest_time: value })}
          min={0}
          max={300}
          step={5}
        />
      </div>

      <TempoField
        initialValue={movement.tempo}
        onChange={(value: string) => onChange({ tempo: value })}
      />
      <SetDescField
        initialValue={movement.movement_description}
        onChange={(value: string) => onChange({ movement_description: value })}
      />
    </div>
  );
};

export default MovementForm;
