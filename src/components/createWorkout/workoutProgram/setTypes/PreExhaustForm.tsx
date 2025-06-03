import React, { useState } from 'react';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  tempo: string;
  restAfter: number;
}

export interface PreExhaustData {
  isolationExercise: Exercise;
  compoundExercise: Exercise;
  targetMuscle: string;
  notes: string;
}

interface PreExhaustFormProps {
  onSave: (data: PreExhaustData) => void;
}

const PreExhaustForm: React.FC<PreExhaustFormProps> = ({ onSave }) => {
  const [isolationExercise, setIsolationExercise] = useState<Exercise>({
    name: '',
    sets: 3,
    reps: 12,
    weight: 0,
    tempo: '',
    restAfter: 30,
  });

  const [compoundExercise, setCompoundExercise] = useState<Exercise>({
    name: '',
    sets: 3,
    reps: 8,
    weight: 0,
    tempo: '',
    restAfter: 60,
  });

  const [settings, setSettings] = useState({
    targetMuscle: '',
    notes: '',
  });

  const handleIsolationChange = (field: keyof Exercise, value: string | number) => {
    setIsolationExercise({
      ...isolationExercise,
      [field]: value,
    });
  };

  const handleCompoundChange = (field: keyof Exercise, value: string | number) => {
    setCompoundExercise({
      ...compoundExercise,
      [field]: value,
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
      isolationExercise,
      compoundExercise,
      ...settings,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">تنظیمات پیش خستگی</h3>
        
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

        {/* Isolation Exercise */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h4 className="text-md font-medium text-gray-800 mb-4">تمرین ایزوله (پیش خستگی)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نام تمرین
              </label>
              <input
                type="text"
                value={isolationExercise.name}
                onChange={(e) => handleIsolationChange('name', e.target.value)}
                placeholder="نام تمرین ایزوله"
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
                value={isolationExercise.sets}
                onChange={(e) => handleIsolationChange('sets', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                پیشنهاد: 2-3 ست
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                تعداد تکرار
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={isolationExercise.reps}
                onChange={(e) => handleIsolationChange('reps', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                پیشنهاد: 12-15 تکرار
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                وزنه (کیلوگرم)
              </label>
              <input
                type="number"
                min="0"
                value={isolationExercise.weight}
                onChange={(e) => handleIsolationChange('weight', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                تمپو (مثال: 2-1-2-0)
              </label>
              <input
                type="text"
                value={isolationExercise.tempo}
                onChange={(e) => handleIsolationChange('tempo', e.target.value)}
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
                max="120"
                value={isolationExercise.restAfter}
                onChange={(e) => handleIsolationChange('restAfter', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                پیشنهاد: 30-45 ثانیه
              </p>
            </div>
          </div>
        </div>

        {/* Compound Exercise */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h4 className="text-md font-medium text-gray-800 mb-4">تمرین ترکیبی</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نام تمرین
              </label>
              <input
                type="text"
                value={compoundExercise.name}
                onChange={(e) => handleCompoundChange('name', e.target.value)}
                placeholder="نام تمرین ترکیبی"
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
                value={compoundExercise.sets}
                onChange={(e) => handleCompoundChange('sets', parseInt(e.target.value))}
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
                value={compoundExercise.reps}
                onChange={(e) => handleCompoundChange('reps', parseInt(e.target.value))}
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
                value={compoundExercise.weight}
                onChange={(e) => handleCompoundChange('weight', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                تمپو (مثال: 2-1-2-0)
              </label>
              <input
                type="text"
                value={compoundExercise.tempo}
                onChange={(e) => handleCompoundChange('tempo', e.target.value)}
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
                max="180"
                value={compoundExercise.restAfter}
                onChange={(e) => handleCompoundChange('restAfter', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                پیشنهاد: 60-90 ثانیه
              </p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="text-md font-medium text-blue-800 mb-2">نکات مهم پیش خستگی</h4>
          <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
            <li>ابتدا تمرین ایزوله را انجام دهید</li>
            <li>وزنه تمرین ایزوله را طوری انتخاب کنید که بتوانید 12-15 تکرار انجام دهید</li>
            <li>استراحت کوتاه بین تمرین ایزوله و ترکیبی (30-45 ثانیه)</li>
            <li>در تمرین ترکیبی، وزنه را متناسب با خستگی عضله تنظیم کنید</li>
            <li>تمرکز بر فرم صحیح در هر دو تمرین</li>
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

export default PreExhaustForm;