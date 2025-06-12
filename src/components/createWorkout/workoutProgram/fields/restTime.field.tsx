import React from "react";
import { useMovementStore } from "../../../../store/movement.store";
import { motion } from "framer-motion";

interface RestTimeFieldProps {
  className?: string;
  min?: number;
  max?: number;
  step?: number;
  initialValue?: number;
  onChange?: (value: number) => void;
}

const RestTimeField: React.FC<RestTimeFieldProps> = ({
  className = "",
  min = 0,
  max = 300,
  initialValue,
  step = 5,
  onChange,
}) => {
  const { currentSetData, setRestTime } = useMovementStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setRestTime(newValue);
    onChange?.(newValue);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`w-full ${className}`}
    >
      <label className="block text-xs text-gray-600 mb-1">
        زمان استراحت (ثانیه)
      </label>
      <motion.div whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }}>
        <input
          type="number"
          value={initialValue ?? currentSetData?.rest_time ?? min}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          className="w-full px-2 py-1.5 rounded-md border border-gray-200 
            focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 
            transition-all duration-150
            text-sm text-gray-700
            bg-white/50
            hover:border-gray-300"
        />
      </motion.div>
    </motion.div>
  );
};

export default RestTimeField;
