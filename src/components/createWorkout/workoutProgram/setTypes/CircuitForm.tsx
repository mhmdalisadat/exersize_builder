import React, { useState } from 'react';

interface CircuitExercise {
  name: string;
  reps: number;
  weight: number;
  tempo: string;
  restAfter: number;
}

export interface CircuitData {
  exercises: CircuitExercise[];
  totalRounds: number;
  restBetweenRounds: number;
  targetMuscleGroups: string[];
  notes: string;
}

interface CircuitFormProps {
  onSave: (data: CircuitData) => void;
}

const CircuitForm: React.FC<CircuitFormProps> = ({ onSave }) => {
  const [exercises, setExercises] = useState<CircuitExercise[]>([
    { name: '', reps: 0, weight: 0, tempo: '', restAfter: 0 },
    { name: '', reps: 0, weight: 0, tempo: '', restAfter: 0 },
    { name: '', reps: 0, weight: 0, tempo: '', restAfter: 0 },
  ]);

  const [settings, setSettings] = useState({
    totalRounds: 3,
    restBetweenRounds: 60,
    targetMuscleGroups: [''],
    notes: '',
  });

  const handleExerciseChange = (
    index: number,
    field: keyof CircuitExercise,
    value: string | number
  ) => {
    const newExercises = [...exercises];
    newExercises[index] = {
      ...newExercises[index],
      [field]: value,
    };
    setExercises(newExercises);
  };

  const handleSettingsChange = (field: keyof typeof settings, value: string | number | string[]) => {
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  const addExercise = () => {
    setExercises([
      ...exercises,
      { name: '', reps: 0, weight: 0, tempo: '', restAfter: 0 },
    ]);
  };

  const removeExercise = (index: number) => {
    if (exercises.length > 1) {
      const newExercises = exercises.filter((_, i) => i !== index);
      setExercises(newExercises);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      exercises,
      ...settings,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">تنظیمات سیرکویت</h3>
        
        {/* Common Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تعداد دورها
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={settings.totalRounds}
              onChange={(e) => handleSettingsChange('totalRounds', parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              پیشنهاد: 3-5 دور
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              استراحت بین دورها (ثانیه)
            </label>
            <input
              type="number"
              min="0"
              max="300"
              value={settings.restBetweenRounds}
              onChange={(e) => handleSettingsChange('restBetweenRounds', parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              پیشنهاد: 1-2 دقیقه
            </p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              گروه‌های عضلانی هدف
            </label>
            <input
              type="text"
              value={settings.targetMuscleGroups.join(', ')}
              onChange={(e) => handleSettingsChange('targetMuscleGroups', e.target.value.split(',').map(s => s.trim()))}
              placeholder="مثال: سینه، پشت، پا"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              یادداشت‌ها
            </label>
            <input
              type="text"
              value={settings.notes}
              onChange={(e) => handleSettingsChange('notes', e.target.value)}
              placeholder="نکات مهم یا توضیحات"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Exercises */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-md font-medium text-gray-800">تمرینات سیرکویت</h4>
            <button
              type="button"
              onClick={addExercise}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
            >
              افزودن تمرین
            </button>
          </div>

          {exercises.map((exercise, index) => (
            <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-md font-medium text-gray-800">
                  تمرین {index + 1}
                </h5>
                {exercises.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeExercise(index)}
                    className="text-red-500 hover:text-red-600 focus:outline-none"
                  >
                    حذف
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    نام تمرین
                  </label>
                  <input
                    type="text"
                    value={exercise.name}
                    onChange={(e) => handleExerciseChange(index, 'name', e.target.value)}
                    placeholder="نام تمرین"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    تعداد تکرار
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={exercise.reps}
                    onChange={(e) => handleExerciseChange(index, 'reps', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    وزنه (کیلوگرم)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={exercise.weight}
                    onChange={(e) => handleExerciseChange(index, 'weight', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    تمپو (مثال: 2-1-2-0)
                  </label>
                  <input
                    type="text"
                    value={exercise.tempo}
                    onChange={(e) => handleExerciseChange(index, 'tempo', e.target.value)}
                    placeholder="2-1-2-0"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    استراحت بعد (ثانیه)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={exercise.restAfter}
                    onChange={(e) => handleExerciseChange(index, 'restAfter', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    پیشنهاد: 0-30 ثانیه
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="text-md font-medium text-blue-800 mb-2">نکات مهم سیرکویت</h4>
          <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
            <li>تمرینات را به ترتیب مشخص شده انجام دهید</li>
            <li>بین تمرینات استراحت کوتاه داشته باشید</li>
            <li>پس از اتمام یک دور کامل، استراحت طولانی‌تر کنید</li>
            <li>وزنه را طوری انتخاب کنید که بتوانید تمام تکرارها را انجام دهید</li>
            <li>تمرکز بر حفظ فرم صحیح و تنفس مناسب</li>
          </ul>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          ذخیره تنظیمات
        </button>
      </div>
    </form>
  );
};

export default CircuitForm;