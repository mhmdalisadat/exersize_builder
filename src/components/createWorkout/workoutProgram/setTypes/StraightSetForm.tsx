import React, { useState } from "react";
import { motion } from "framer-motion";

export interface StraightSetData {
  sets: number;
  reps: number;
  weight: number;
  restTime: number;
  tempo: string;
}

interface StraightSetFormProps {
  onSave: (data: StraightSetData) => void;
}

const StraightSetForm: React.FC<StraightSetFormProps> = ({ onSave }) => {
  const [formData, setFormData] = useState<StraightSetData>({
    sets: 3,
    reps: 10,
    weight: 0,
    restTime: 60,
    tempo: "2010",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "tempo" ? value : Number(value),
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg mt-4"
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800">
        تنظیمات ست معمولی
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تعداد ست‌ها
            </label>
            <input
              type="number"
              name="sets"
              value={formData.sets}
              onChange={handleChange}
              min="1"
              max="20"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تعداد تکرار
            </label>
            <input
              type="number"
              name="reps"
              value={formData.reps}
              onChange={handleChange}
              min="1"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              وزنه (کیلوگرم)
            </label>
            <input
              type="number"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              min="0"
              step="0.5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              زمان استراحت (ثانیه)
            </label>
            <input
              type="number"
              name="restTime"
              value={formData.restTime}
              onChange={handleChange}
              min="0"
              step="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            تمپو (مثلاً: 2010)
          </label>
          <input
            type="text"
            name="tempo"
            value={formData.tempo}
            onChange={handleChange}
            pattern="[0-9]{4}"
            placeholder="2010"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            چهار رقم: پایین رفتن، مکث پایین، بالا رفتن، مکث بالا (به ثانیه)
          </p>
        </div>

        <button
          onClick={() => onSave(formData)}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          ذخیره تنظیمات
        </button>
      </div>
    </motion.div>
  );
};

export default StraightSetForm;
