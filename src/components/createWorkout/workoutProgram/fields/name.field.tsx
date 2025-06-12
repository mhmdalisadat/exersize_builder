import React from "react";
import { useMovementStore } from "../../../../store/movement.store";
import { motion } from "framer-motion";

interface NameFieldProps {
  className?: string;
  initialValue?: string;
  onChange?: (value: string) => void;
}

const NameField: React.FC<NameFieldProps> = ({
  className = "",
  initialValue,
  onChange,
}) => {
  const { currentSetData, setMovementName } = useMovementStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovementName(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`w-full ${className}`}
    >
      <label className="block text-xs text-gray-600 mb-1">نام حرکت </label>
      <motion.div whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }}>
        <input
          type="text"
          value={initialValue ?? currentSetData?.name ?? ""}
          onChange={handleChange}
          placeholder="..."
          className="w-full px-2 py-1.5 rounded-md border border-gray-200 
            focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 
            transition-all duration-150
            text-sm text-gray-700
            bg-white/50
            hover:border-gray-300
            placeholder:text-gray-400"
        />
      </motion.div>
    </motion.div>
  );
};

export default NameField;
