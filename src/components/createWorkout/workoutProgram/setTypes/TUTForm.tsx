import React, { useState } from 'react';

interface TUTExercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  tempo: {
    eccentric: number;  // Lowering phase
    pause: number;      // Pause at bottom
    concentric: number; // Lifting phase
    rest: number;       // Rest at top
  };
  restAfter: number;
}

export interface TUTData {
  exercise: TUTExercise;
  targetMuscle: string;
  notes: string;
  totalTimeUnderTension: number;
}

interface TUTFormProps {
  onSave: (data: TUTData) => void;
}

const TUTForm: React.FC<TUTFormProps> = ({ onSave }) => {
  const [exercise, setExercise] = useState<TUTExercise>({
    name: '',
    sets: 3,
    reps: 8,
    weight: 0,
    tempo: {
      eccentric: 3,
      pause: 1,
      concentric: 2,
      rest: 0,
    },
    restAfter: 60,
  });

  const [settings, setSettings] = useState({
    targetMuscle: '',
    notes: '',
  });

  const calculateTotalTUT = () => {
    const { eccentric, pause, concentric, rest } = exercise.tempo;
    const timePerRep = eccentric + pause + concentric + rest;
    return timePerRep * exercise.reps * exercise.sets;
  };

  const handleExerciseChange = (field: keyof TUTExercise, value: string | number) => {
    setExercise({
      ...exercise,
      [field]: value,
    });
  };

  const handleTempoChange = (field: keyof TUTExercise['tempo'], value: number) => {
    setExercise({
      ...exercise,
      tempo: {
        ...exercise.tempo,
        [field]: value,
      },
    });
  };

  const handleSettingsChange = (field: keyof typeof settings, value: string) => {
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      exercise,
      ...settings,
      totalTimeUnderTension: calculateTotalTUT(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">تنظیمات زمان تحت فشار (TUT)</h3>
        
        {/* Common Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              عضله هدف
            </label>
            <input
              type="text"
              value={settings.targetMuscle}
              onChange={(e) => handleSettingsChange('targetMuscle', e.target.value)}
              placeholder="مثال: سینه، پشت بازو، جلو بازو"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
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

        {/* Exercise Settings */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h4 className="text-md font-medium text-gray-800 mb-4">تنظیمات تمرین</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نام تمرین
              </label>
              <input
                type="text"
                value={exercise.name}
                onChange={(e) => handleExerciseChange('name', e.target.value)}
                placeholder="نام تمرین"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                تعداد ست
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={exercise.sets}
                onChange={(e) => handleExerciseChange('sets', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                پیشنهاد: 3-4 ست
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                تعداد تکرار
              </label>
              <input
                type="number"
                min="1"
                max="15"
                value={exercise.reps}
                onChange={(e) => handleExerciseChange('reps', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                پیشنهاد: 8-12 تکرار
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                وزنه (کیلوگرم)
              </label>
              <input
                type="number"
                min="0"
                value={exercise.weight}
                onChange={(e) => handleExerciseChange('weight', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                استراحت بین ست‌ها (ثانیه)
              </label>
              <input
                type="number"
                min="0"
                max="180"
                value={exercise.restAfter}
                onChange={(e) => handleExerciseChange('restAfter', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                پیشنهاد: 60-90 ثانیه
              </p>
            </div>
          </div>
        </div>

        {/* Tempo Settings */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h4 className="text-md font-medium text-gray-800 mb-4">تنظیمات تمپو (ثانیه)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                فاز منفی (پایین آوردن)
              </label>
              <input
                type="number"
                min="1"
                max="10"
                value={exercise.tempo.eccentric}
                onChange={(e) => handleTempoChange('eccentric', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                پیشنهاد: 3-4 ثانیه
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                مکث در پایین
              </label>
              <input
                type="number"
                min="0"
                max="5"
                value={exercise.tempo.pause}
                onChange={(e) => handleTempoChange('pause', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                پیشنهاد: 1-2 ثانیه
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                فاز مثبت (بلند کردن)
              </label>
              <input
                type="number"
                min="1"
                max="5"
                value={exercise.tempo.concentric}
                onChange={(e) => handleTempoChange('concentric', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                پیشنهاد: 1-2 ثانیه
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                مکث در بالا
              </label>
              <input
                type="number"
                min="0"
                max="3"
                value={exercise.tempo.rest}
                onChange={(e) => handleTempoChange('rest', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                پیشنهاد: 0-1 ثانیه
              </p>
            </div>
          </div>
        </div>

        {/* Total Time Under Tension */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-blue-800">کل زمان تحت فشار:</span>
            <span className="text-2xl font-bold text-blue-900">{calculateTotalTUT()} ثانیه</span>
          </div>
          <p className="text-sm text-blue-700 mt-2">
            این زمان شامل مجموع تمام فازهای حرکت در تمام ست‌ها و تکرارها می‌شود
          </p>
        </div>

        {/* Instructions */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-md font-medium text-gray-800 mb-2">نکات مهم TUT</h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>کنترل کامل حرکت در تمام فازها</li>
            <li>تمرکز بر احساس انقباض عضله</li>
            <li>اجتناب از حرکت‌های ناگهانی</li>
            <li>تنفس منظم و کنترل شده</li>
            <li>وزنه را متناسب با توانایی کنترل حرکت انتخاب کنید</li>
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

export default TUTForm;