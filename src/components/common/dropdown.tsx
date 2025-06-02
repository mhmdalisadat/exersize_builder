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
      <div className="text-right mb-1 text-[#5677BC] text-sm font-medium">
        {label}
      </div>
      <motion.div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white dark:bg-white py-1.5 px-3 border border-[#5677BC] rounded-md text-right cursor-pointer flex flex-row-reverse items-center justify-between hover:border-[#5677BC]/80 transition-all duration-200"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <ChevronDown
          className={`w-4 h-4 text-[#5677BC] transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
        <div className="flex-1 text-right">
          <span
            className={
              !value || (Array.isArray(value) && value.length === 0)
                ? "text-gray-400 text-sm"
                : "text-[#5677BC] text-sm"
            }
          >
            {getSelectedLabels()}
          </span>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute z-10 mt-1 w-full bg-white dark:bg-white border border-[#5677BC] rounded-md shadow-lg max-h-48 overflow-auto"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={`px-3 py-1.5 text-xs cursor-pointer hover:bg-[#5677BC]/10 text-right flex flex-row-reverse items-center gap-2 transition-colors duration-200 ${
                  (multiple &&
                    Array.isArray(value) &&
                    value.includes(option.value)) ||
                  (!multiple && value === option.value)
                    ? "bg-[#5677BC]/5"
                    : ""
                }`}
                onClick={() => handleSelect(option.value)}
              >
                <span className="text-[#5677BC] flex-1">{option.label}</span>
                <div
                  className={`h-3.5 w-3.5 rounded-sm border transition-colors duration-200 flex-shrink-0 ${
                    (multiple &&
                      Array.isArray(value) &&
                      value.includes(option.value)) ||
                    (!multiple && value === option.value)
                      ? "bg-[#5677BC] border-[#5677BC]"
                      : "border-[#5677BC]"
                  } flex items-center justify-center`}
                >
                  {((multiple &&
                    Array.isArray(value) &&
                    value.includes(option.value)) ||
                    (!multiple && value === option.value)) && (
                    <Check className="w-2.5 h-2.5 text-white" />
                  )}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dropdown;
