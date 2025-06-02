export interface MuscleOption {
  value: string;
  label: string;
}

export const muscleOptions: MuscleOption[] = [
  { value: "chest", label: "سینه" },
  { value: "back", label: "پشت" },
  { value: "shoulders", label: "شانه" },
  { value: "triceps", label: "پشت بازو" },
  { value: "biceps", label: "جلو بازو" },
  { value: "legs", label: "پا" },
  { value: "abs", label: "شکم" },
  { value: "rest", label: "استراحت" },
] as const;
