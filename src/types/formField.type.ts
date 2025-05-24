/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FormFieldPropsType {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  placeholder?: string;
  type?: string;
  options?: { value: string; label: string }[];
  rows?: number;
  min?: number;
  max?: number;
  variants: any;
}
