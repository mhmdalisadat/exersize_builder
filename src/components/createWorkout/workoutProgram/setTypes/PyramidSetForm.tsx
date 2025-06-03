import React, { useState } from 'react';

interface PyramidSet {
  weight: number;
  reps: number;
  tempo: string;
}

export interface PyramidSetData {
  sets: PyramidSet[];
  restBetweenSets: number;
  pyramidType: 'ascending' | 'descending' | 'ascending-descending';
  totalSets: number;
}

interface PyramidSetFormProps {
  onSave: (data: PyramidSetData) => void;
}

const PyramidSetForm: React.FC<PyramidSetFormProps> = ({ onSave }) => {
  const [pyramidType, setPyramidType] = useState<'ascending' | 'descending' | 'ascending-descending'>('ascending');
  const [totalSets, setTotalSets] = useState(3);
  const [restBetweenSets, setRestBetweenSets] = useState(60);
  const [sets, setSets] = useState<PyramidSet[]>([
    { weight: 0, reps: 0, tempo: '' },
    { weight: 0, reps: 0, tempo: '' },
    { weight: 0, reps: 0, tempo: '' },
  ]);

  const handleSetChange = (index: number, field: keyof PyramidSet, value: string | number) => {
    const newSets = [...sets];
    newSets[index] = {
      ...newSets[index],
      [field]: value,
    };
    setSets(newSets);
  };

  const handleTotalSetsChange = (value: number) => {
    setTotalSets(value);
    // Adjust the number of sets in the array
    if (value > sets.length) {
      const newSets = [...sets];
      for (let i = sets.length; i < value; i++) {
        newSets.push({ weight: 0, reps: 0, tempo: '' });
      }
      setSets(newSets);
    } else if (value < sets.length) {
      setSets(sets.slice(0, value));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      sets,
      restBetweenSets,
      pyramidType,
      totalSets,
    });
  };

  const getSetLabel = (index: number) => {
    if (pyramidType === 'ascending') {
      return `ست ${index + 1} (صعودی)`;
    } else if (pyramidType === 'descending') {
      return `ست ${index + 1} (نزولی)`;
    } else {
      const midPoint = Math.ceil(totalSets / 2);
      if (index < midPoint) {
        return `ست ${index + 1} (صعودی)`;
      } else {
        return `ست ${index + 1} (نزولی)`;
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6 bg-white p-6 rounded-lg shadow-sm">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">تنظیمات ست هرمی</h3>
        
        {/* Common Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              نوع هرم
            </label>
            <select
              value={pyramidType}
              onChange={(e) => setPyramidType(e.target.value as 'ascending' | 'descending' | 'ascending-descending')}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="ascending">صعودی</option>
              <option value="descending">نزولی</option>
              <option value="ascending-descending">صعودی-نزولی</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تعداد ست‌ها
            </label>
            <input
              type="number"
              min="2"
              max="10"
              value={totalSets}
              onChange={(e) => handleTotalSetsChange(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              زمان استراحت بین ست‌ها (ثانیه)
            </label>
            <input
              type="number"
              min="0"
              value={restBetweenSets}
              onChange={(e) => setRestBetweenSets(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Sets */}
        <div className="space-y-4">
          {sets.map((set, index) => (
            <div key={index} className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
              <h4 className="text-md font-medium text-gray-800 mb-4">
                {getSetLabel(index)}
              </h4>
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
                    value={set.reps}
                    onChange={(e) => handleSetChange(index, 'reps', parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
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

export default PyramidSetForm;