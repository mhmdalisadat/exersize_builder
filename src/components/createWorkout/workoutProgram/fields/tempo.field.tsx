import React from "react";
import { useMovementStore } from "../../../../store/movement.store";
import { motion } from "framer-motion";

interface TempoFieldProps {
  className?: string;
  onChange?: (value: string) => void;
  initialValue?: string;
}

const TempoField: React.FC<TempoFieldProps> = ({
  className = "",
  initialValue,
  onChange,
}) => {
  const { currentSetData, setTempo } = useMovementStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempo(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`w-full ${className}`}
    >
      <label className="block text-xs text-gray-600 mb-1">تمپو</label>
      <motion.div whileHover={{ scale: 1.005 }} whileTap={{ scale: 0.995 }}>
        <input
          type="text"
          value={initialValue ?? currentSetData?.tempo ?? ""}
          onChange={handleChange}
          placeholder="مثال: 3-1-1-0"
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

export default TempoField;
