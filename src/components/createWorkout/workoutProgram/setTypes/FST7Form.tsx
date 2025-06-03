import React, { useState } from 'react';

interface FST7Set {
  weight: number;
  reps: number;
  tempo: string;
}

export interface FST7Data {
  sets: FST7Set[];
  restBetweenSets: number;
  stretchDuration: number;
  targetMuscle: string;
}

interface FST7FormProps {
  onSave: (data: FST7Data) => void;
}

const FST7Form: React.FC<FST7FormProps> = ({ onSave }) => {
  const [sets, setSets] = useState<FST7Set[]>(
    Array(7).fill({ weight: 0, reps: 0, tempo: '' })
  );

  const [settings, setSettings] = useState({
    restBetweenSets: 30,
    stretchDuration: 30,
    targetMuscle: '',
  });

  const handleSetChange = (index: number, field: keyof FST7Set, value: string | number) => {
    const newSets = [...sets];
    newSets[index] = {
      ...newSets[index],
      [field]: value,
    };
    setSets(newSets);
  };

  const handleSettingsChange = (field: keyof typeof settings, value: string | number) => {
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      sets,
      ...settings,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">تنظیمات FST-7</h3>
        
        {/* Common Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              زمان استراحت بین ست‌ها (ثانیه)
            </label>
            <input
              type="number"
              min="0"
              max="60"
              value={settings.restBetweenSets}
              onChange={(e) => handleSettingsChange('restBetweenSets', parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              پیشنهاد: 30-45 ثانیه
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              مدت زمان کشش (ثانیه)
            </label>
            <input
              type="number"
              min="0"
              max="60"
              value={settings.stretchDuration}
              onChange={(e) => handleSettingsChange('stretchDuration', parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">
              پیشنهاد: 30-60 ثانیه
            </p>
          </div>
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
        </div>

        {/* Sets */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-800 mb-4">7 ست FST-7</h4>
          {sets.map((set, index) => (
            <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h5 className="text-md font-medium text-gray-800 mb-4">
                ست {index + 1}
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    وزنه (کیلوگرم)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={set.weight}
                    onChange={(e) => handleSetChange(index, 'weight', parseInt(e.target.value))}
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
                    max="15"
                    value={set.reps}
                    onChange={(e) => handleSetChange(index, 'reps', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    پیشنهاد: 8-12 تکرار
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    تمپو (مثال: 2-1-2-0)
                  </label>
                  <input
                    type="text"
                    value={set.tempo}
                    onChange={(e) => handleSetChange(index, 'tempo', e.target.value)}
                    placeholder="2-1-2-0"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="text-md font-medium text-blue-800 mb-2">نکات مهم FST-7</h4>
          <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
            <li>این روش شامل 7 ست با استراحت کوتاه است</li>
            <li>بین هر ست، کشش عضله هدف را انجام دهید</li>
            <li>وزنه را طوری انتخاب کنید که بتوانید 8-12 تکرار انجام دهید</li>
            <li>استراحت بین ست‌ها باید کوتاه باشد (30-45 ثانیه)</li>
            <li>کشش عضله باید 30-60 ثانیه طول بکشد</li>
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

export default FST7Form;