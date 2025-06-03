import React, { useState } from "react";

interface DropSetExercise {
  weight: number;
  reps: number;
  tempo: string;
}

export interface DropSetData {
  exercises: DropSetExercise[];
  sets: number;
  restBetweenSets: number;
  restBetweenDrops: number;
}

interface DropSetFormProps {
  onSave: (data: DropSetData) => void;
}

const DropSetForm: React.FC<DropSetFormProps> = ({ onSave }) => {
  const [exercises, setExercises] = useState<DropSetExercise[]>([
    { weight: 0, reps: 0, tempo: "" },
    { weight: 0, reps: 0, tempo: "" },
  ]);

  const [settings, setSettings] = useState({
    sets: 1,
    restBetweenSets: 60,
    restBetweenDrops: 15,
  });

  const handleExerciseChange = (
    index: number,
    field: keyof DropSetExercise,
    value: string | number
  ) => {
    const newExercises = [...exercises];
    newExercises[index] = {
      ...newExercises[index],
      [field]: value,
    };
    setExercises(newExercises);
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

  const addDrop = () => {
    setExercises([...exercises, { weight: 0, reps: 0, tempo: "" }]);
  };

  const removeDrop = (index: number) => {
    if (exercises.length > 2) {
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
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-6 bg-white p-6 rounded-lg shadow-sm"
    >
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          تنظیمات دراپ‌ست
        </h3>

        {/* Common Settings */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
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
              زمان استراحت بین دراپ‌ها (ثانیه)
            </label>
            <input
              type="number"
              min="0"
              value={settings.restBetweenDrops}
              onChange={(e) =>
                handleSettingsChange(
                  "restBetweenDrops",
                  parseInt(e.target.value)
                )
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Drop Sets */}
        <div className="space-y-4">
          {exercises.map((exercise, index) => (
            <div
              key={index}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-md font-medium text-gray-800">
                  دراپ {index + 1}
                </h4>
                {exercises.length > 2 && (
                  <button
                    type="button"
                    onClick={() => removeDrop(index)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    حذف دراپ
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
                    value={exercise.weight}
                    onChange={(e) =>
                      handleExerciseChange(
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
                    value={exercise.reps}
                    onChange={(e) =>
                      handleExerciseChange(
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
                    value={exercise.tempo}
                    onChange={(e) =>
                      handleExerciseChange(index, "tempo", e.target.value)
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
            onClick={addDrop}
            className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-blue-500 hover:text-blue-500 transition-colors duration-200"
          >
            + افزودن دراپ
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

export default DropSetForm;
