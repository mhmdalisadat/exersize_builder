import React from "react";
import { useMovementStore } from "../../../../store/movement.store";
import { motion } from "framer-motion";

interface SetDescFieldProps {
  className?: string;
  initialValue?: string;
  onChange?: (value: string) => void;
}

const SetDescField: React.FC<SetDescFieldProps> = ({
  className = "",
  initialValue,
  onChange,
}) => {
  const { currentSetData, setMovementDescription } = useMovementStore();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMovementDescription(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`w-full ${className}`}
    >
      <label className="block text-xs text-gray-600 mb-1">توضیحات</label>
      <motion.div whileHover={{ scale: 1.005 }} className="relative">
        <textarea
          value={initialValue ?? currentSetData?.movement_description ?? ""}
          onChange={handleChange}
          placeholder=" ..."
          className="w-full px-2 py-1.5 rounded-md border border-gray-200 
            focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 
            transition-all duration-150
            text-sm text-gray-700
            bg-white/50
            hover:border-gray-300
            min-h-[100px]
            resize-none
            placeholder:text-gray-400"
        />
      </motion.div>
    </motion.div>
  );
};

export default SetDescField;
