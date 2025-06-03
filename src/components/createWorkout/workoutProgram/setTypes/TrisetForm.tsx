import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface TrisetExercise {
  name: string;
  reps: number;
  weight: number;
  tempo: string;
}

export interface TrisetData {
  exercises: [TrisetExercise, TrisetExercise, TrisetExercise];
  sets: number;
  restTime: number;
}

interface TrisetFormProps {
  onSave: (data: TrisetData) => void;
}

const TrisetForm: React.FC<TrisetFormProps> = ({ onSave }) => {
  const [formData, setFormData] = useState<TrisetData>({
    exercises: [
      {
        name: '',
        reps: 10,
        weight: 0,
        tempo: '2010'
      },
      {
        name: '',
        reps: 10,
        weight: 0,
        tempo: '2010'
      },
      {
        name: '',
        reps: 10,
        weight: 0,
        tempo: '2010'
      }
    ],
    sets: 3,
    restTime: 60
  });

  const handleExerciseChange = (index: number, field: keyof TrisetExercise, value: string | number) => {
    setFormData(prev => {
      const newExercises = [...prev.exercises] as [TrisetExercise, TrisetExercise, TrisetExercise];
      newExercises[index] = { ...newExercises[index], [field]: value };
      return {
        ...prev,
        exercises: newExercises
      };
    });
  };

  const handleCommonChange = (field: keyof Omit<TrisetData, 'exercises'>, value: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg mt-4"
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800">تنظیمات تری‌ست</h3>
      <div className="space-y-6">
        {/* Common Settings */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">تعداد ست‌ها</label>
            <input
              type="number"
              value={formData.sets}
              onChange={(e) => handleCommonChange('sets', Number(e.target.value))}
              min="1"
              max="20"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">زمان استراحت بین ست‌ها (ثانیه)</label>
            <input
              type="number"
              value={formData.restTime}
              onChange={(e) => handleCommonChange('restTime', Number(e.target.value))}
              min="0"
              step="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Exercise 1 */}
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-800 mb-3">تمرین اول</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نام تمرین</label>
              <input
                type="text"
                value={formData.exercises[0].name}
                onChange={(e) => handleExerciseChange(0, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="نام تمرین را وارد کنید"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تعداد تکرار</label>
              <input
                type="number"
                value={formData.exercises[0].reps}
                onChange={(e) => handleExerciseChange(0, 'reps', Number(e.target.value))}
                min="1"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">وزنه (کیلوگرم)</label>
              <input
                type="number"
                value={formData.exercises[0].weight}
                onChange={(e) => handleExerciseChange(0, 'weight', Number(e.target.value))}
                min="0"
                step="0.5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تمپو</label>
              <input
                type="text"
                value={formData.exercises[0].tempo}
                onChange={(e) => handleExerciseChange(0, 'tempo', e.target.value)}
                pattern="[0-9]{4}"
                placeholder="2010"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Exercise 2 */}
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-800 mb-3">تمرین دوم</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نام تمرین</label>
              <input
                type="text"
                value={formData.exercises[1].name}
                onChange={(e) => handleExerciseChange(1, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="نام تمرین را وارد کنید"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تعداد تکرار</label>
              <input
                type="number"
                value={formData.exercises[1].reps}
                onChange={(e) => handleExerciseChange(1, 'reps', Number(e.target.value))}
                min="1"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">وزنه (کیلوگرم)</label>
              <input
                type="number"
                value={formData.exercises[1].weight}
                onChange={(e) => handleExerciseChange(1, 'weight', Number(e.target.value))}
                min="0"
                step="0.5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تمپو</label>
              <input
                type="text"
                value={formData.exercises[1].tempo}
                onChange={(e) => handleExerciseChange(1, 'tempo', e.target.value)}
                pattern="[0-9]{4}"
                placeholder="2010"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Exercise 3 */}
        <div className="border-t pt-4">
          <h4 className="font-medium text-gray-800 mb-3">تمرین سوم</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">نام تمرین</label>
              <input
                type="text"
                value={formData.exercises[2].name}
                onChange={(e) => handleExerciseChange(2, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="نام تمرین را وارد کنید"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تعداد تکرار</label>
              <input
                type="number"
                value={formData.exercises[2].reps}
                onChange={(e) => handleExerciseChange(2, 'reps', Number(e.target.value))}
                min="1"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">وزنه (کیلوگرم)</label>
              <input
                type="number"
                value={formData.exercises[2].weight}
                onChange={(e) => handleExerciseChange(2, 'weight', Number(e.target.value))}
                min="0"
                step="0.5"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">تمپو</label>
              <input
                type="text"
                value={formData.exercises[2].tempo}
                onChange={(e) => handleExerciseChange(2, 'tempo', e.target.value)}
                pattern="[0-9]{4}"
                placeholder="2010"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
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

export default TrisetForm;