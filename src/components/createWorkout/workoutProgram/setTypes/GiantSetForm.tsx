import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface GiantSetExercise {
  name: string;
  reps: number;
  weight: number;
  tempo: string;
}

export interface GiantSetData {
  exercises: GiantSetExercise[];
  sets: number;
  restTime: number;
}

interface GiantSetFormProps {
  onSave: (data: GiantSetData) => void;
}

const GiantSetForm: React.FC<GiantSetFormProps> = ({ onSave }) => {
  const [formData, setFormData] = useState<GiantSetData>({
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

  const handleExerciseChange = (index: number, field: keyof GiantSetExercise, value: string | number) => {
    setFormData(prev => {
      const newExercises = [...prev.exercises];
      newExercises[index] = { ...newExercises[index], [field]: value };
      return {
        ...prev,
        exercises: newExercises
      };
    });
  };

  const handleCommonChange = (field: keyof Omit<GiantSetData, 'exercises'>, value: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const addExercise = () => {
    setFormData(prev => ({
      ...prev,
      exercises: [
        ...prev.exercises,
        {
          name: '',
          reps: 10,
          weight: 0,
          tempo: '2010'
        }
      ]
    }));
  };

  const removeExercise = (index: number) => {
    if (formData.exercises.length > 4) {
      setFormData(prev => ({
        ...prev,
        exercises: prev.exercises.filter((_, i) => i !== index)
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg mt-4"
    >
      <h3 className="text-lg font-semibold mb-4 text-gray-800">تنظیمات جاینت ست</h3>
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

        {/* Exercises */}
        {formData.exercises.map((exercise, index) => (
          <div key={index} className="border-t pt-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-gray-800">تمرین {index + 1}</h4>
              {formData.exercises.length > 4 && (
                <button
                  onClick={() => removeExercise(index)}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  حذف تمرین
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">نام تمرین</label>
                <input
                  type="text"
                  value={exercise.name}
                  onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="نام تمرین را وارد کنید"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">تعداد تکرار</label>
                <input
                  type="number"
                  value={exercise.reps}
                  onChange={(e) => handleExerciseChange(index, 'reps', Number(e.target.value))}
                  min="1"
                  max="100"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">وزنه (کیلوگرم)</label>
                <input
                  type="number"
                  value={exercise.weight}
                  onChange={(e) => handleExerciseChange(index, 'weight', Number(e.target.value))}
                  min="0"
                  step="0.5"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">تمپو</label>
                <input
                  type="text"
                  value={exercise.tempo}
                  onChange={(e) => handleExerciseChange(index, 'tempo', e.target.value)}
                  pattern="[0-9]{4}"
                  placeholder="2010"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Add Exercise Button */}
        <button
          onClick={addExercise}
          className="w-full border-2 border-dashed border-gray-300 text-gray-600 py-2 px-4 rounded-md hover:border-blue-500 hover:text-blue-500 transition-colors"
        >
          + افزودن تمرین
        </button>

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

export default GiantSetForm;