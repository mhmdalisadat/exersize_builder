import type { Variants } from "framer-motion";

export interface FormFieldPropsType {
  label: string;
  name: string;
  value: string | number | string[];
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  placeholder?: string;
  type?: string;
  options?: Array<{
    value: string;
    label: string;
  }>;
  rows?: number;
  min?: number;
  max?: number;
  variants?: Variants;
}
