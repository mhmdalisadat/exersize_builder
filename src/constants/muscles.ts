export interface MuscleOption {
  value: string;
  label: string;
}

export const muscleOptions: MuscleOption[] = [
  { value: "chest", label: "سینه" },
  { value: "back", label: "پشت" },
  { value: "shoulders", label: "شانه" },
  { value: "arms", label: "بازو" },
  { value: "legs", label: "پا" },
  { value: "abs", label: "شکم" },
  { value: "rest", label: "استراحت" },
] as const;
