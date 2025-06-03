import React, { useState } from "react";

interface RestPauseMiniSet {
  reps: number;
  weight: number;
  tempo: string;
}

export interface RestPauseData {
  mainSet: {
    weight: number;
    reps: number;
    tempo: string;
  };
  miniSets: RestPauseMiniSet[];
  sets: number;
  restBetweenSets: number;
  restBetweenMiniSets: number;
  targetReps: number;
}

interface RestPauseFormProps {
  onSave: (data: RestPauseData) => void;
}

const RestPauseForm: React.FC<RestPauseFormProps> = ({ onSave }) => {
  const [mainSet, setMainSet] = useState({
    weight: 0,
    reps: 0,
    tempo: "",
  });

  const [miniSets, setMiniSets] = useState<RestPauseMiniSet[]>([
    { reps: 0, weight: 0, tempo: "" },
  ]);

  const [settings, setSettings] = useState({
    sets: 1,
    restBetweenSets: 120,
    restBetweenMiniSets: 15,
    targetReps: 0,
  });

  const handleMainSetChange = (
    field: keyof typeof mainSet,
    value: string | number
  ) => {
    setMainSet({
      ...mainSet,
      [field]: value,
    });
  };

  const handleMiniSetChange = (
    index: number,
    field: keyof RestPauseMiniSet,
    value: string | number
  ) => {
    const newMiniSets = [...miniSets];
    newMiniSets[index] = {
      ...newMiniSets[index],
      [field]: value,
    };
    setMiniSets(newMiniSets);
  };

  const handleSettingsChange = (
    field: keyof typeof settings,
    value: number
  ) => {
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  const addMiniSet = () => {
    setMiniSets([...miniSets, { reps: 0, weight: 0, tempo: "" }]);
  };

  const removeMiniSet = (index: number) => {
    if (miniSets.length > 1) {
      const newMiniSets = miniSets.filter((_, i) => i !== index);
      setMiniSets(newMiniSets);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      mainSet,
      miniSets,
      ...settings,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-6 bg-white p-6 rounded-lg shadow-sm"
    >
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          تنظیمات رست-پاز
        </h3>

        {/* Common Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تعداد ست‌ها
            </label>
            <input
              type="number"
              min="1"
              value={settings.sets}
              onChange={(e) =>
                handleSettingsChange("sets", parseInt(e.target.value))
              }
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
              value={settings.restBetweenSets}
              onChange={(e) =>
                handleSettingsChange(
                  "restBetweenSets",
                  parseInt(e.target.value)
                )
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              زمان استراحت بین مینی‌ست‌ها (ثانیه)
            </label>
            <input
              type="number"
              min="0"
              value={settings.restBetweenMiniSets}
              onChange={(e) =>
                handleSettingsChange(
                  "restBetweenMiniSets",
                  parseInt(e.target.value)
                )
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              تعداد تکرار هدف
            </label>
            <input
              type="number"
              min="0"
              value={settings.targetReps}
              onChange={(e) =>
                handleSettingsChange("targetReps", parseInt(e.target.value))
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Main Set */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h4 className="text-md font-medium text-gray-800 mb-4">ست اصلی</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                وزنه (کیلوگرم)
              </label>
              <input
                type="number"
                min="0"
                value={mainSet.weight}
                onChange={(e) =>
                  handleMainSetChange("weight", parseInt(e.target.value))
                }
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
                value={mainSet.reps}
                onChange={(e) =>
                  handleMainSetChange("reps", parseInt(e.target.value))
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                تمپو (مثال: 2-1-2-0)
              </label>
              <input
                type="text"
                value={mainSet.tempo}
                onChange={(e) => handleMainSetChange("tempo", e.target.value)}
                placeholder="2-1-2-0"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Mini Sets */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-gray-800">مینی‌ست‌ها</h4>
          {miniSets.map((miniSet, index) => (
            <div
              key={index}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-md font-medium text-gray-800">
                  مینی‌ست {index + 1}
                </h5>
                {miniSets.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMiniSet(index)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    حذف مینی‌ست
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    وزنه (کیلوگرم)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={miniSet.weight}
                    onChange={(e) =>
                      handleMiniSetChange(
                        index,
                        "weight",
                        parseInt(e.target.value)
                      )
                    }
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
                    value={miniSet.reps}
                    onChange={(e) =>
                      handleMiniSetChange(
                        index,
                        "reps",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    تمپو (مثال: 2-1-2-0)
                  </label>
                  <input
                    type="text"
                    value={miniSet.tempo}
                    onChange={(e) =>
                      handleMiniSetChange(index, "tempo", e.target.value)
                    }
                    placeholder="2-1-2-0"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={addMiniSet}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors duration-200"
          >
            + افزودن مینی‌ست
          </button>
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

export default RestPauseForm;
