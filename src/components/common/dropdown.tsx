import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

interface DropdownOption {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  label: string;
  name: string;
  value: string | string[];
  options: DropdownOption[];
  onChange: (name: string, value: string | string[]) => void;
  multiple?: boolean;
}

const Dropdown: React.FC<CustomDropdownProps> = ({
  label,
  name,
  value,
  options,
  onChange,
  multiple = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (optionValue: string) => {
    if (multiple) {
      const currentValue = Array.isArray(value) ? value : [];
      const newValue = currentValue.includes(optionValue)
        ? currentValue.filter((v) => v !== optionValue)
        : [...currentValue, optionValue];
      onChange(name, newValue);
    } else {
      onChange(name, optionValue);
      setIsOpen(false);
    }
  };

  const getSelectedLabels = () => {
    if (multiple) {
      const selectedValues = Array.isArray(value) ? value : [];
      return selectedValues
        .map((v) => options.find((opt) => opt.value === v)?.label)
        .filter(Boolean)
        .join(", ");
    }
    return (
      options.find((opt) => opt.value === value)?.label || "انتخاب کنید..."
    );
  };

  return (
    <div className="relative w-full">
      <div className="text-right mb-2 text-slate-500 font-medium">{label}</div>
      <motion.div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-transparent py-2 px-4 border border-slate-200 rounded-md text-right cursor-pointer flex items-center justify-between hover:border-slate-400 transition"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex-1 text-right">
          <span
            className={
              !value || (Array.isArray(value) && value.length === 0)
                ? "text-slate-400"
                : "text-slate-700"
            }
          >
            {getSelectedLabels()}
          </span>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-slate-400 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute z-10 mt-1 w-full bg-white border border-slate-200 rounded-md shadow-lg max-h-60 overflow-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-slate-100 text-right flex justify-between items-center ${
                  (multiple &&
                    Array.isArray(value) &&
                    value.includes(option.value)) ||
                  (!multiple && value === option.value)
                    ? "bg-slate-50"
                    : ""
                }`}
                onClick={() => handleSelect(option.value)}
              >
                <div
                  className={`h-4 w-4 rounded-sm border ${
                    (multiple &&
                      Array.isArray(value) &&
                      value.includes(option.value)) ||
                    (!multiple && value === option.value)
                      ? "bg-indigo-500 border-indigo-500"
                      : "border-gray-300"
                  } flex items-center justify-center`}
                >
                  {((multiple &&
                    Array.isArray(value) &&
                    value.includes(option.value)) ||
                    (!multiple && value === option.value)) && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <span>{option.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
