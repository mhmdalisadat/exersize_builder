import React, { useState } from "react";

interface MindMuscleExercise {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  focusPoints: string[];
  visualization: string;
  restAfter: number;
}

export interface MindMuscleData {
  exercise: MindMuscleExercise;
  targetMuscle: string;
  notes: string;
  breathingPattern: string;
}

interface MindMuscleFormProps {
  onSave: (data: MindMuscleData) => void;
}

const MindMuscleForm: React.FC<MindMuscleFormProps> = ({ onSave }) => {
  const [exercise, setExercise] = useState<MindMuscleExercise>({
    name: "",
    sets: 3,
    reps: 12,
    weight: 0,
    focusPoints: [""],
    visualization: "",
    restAfter: 90,
  });

  const [settings, setSettings] = useState({
    targetMuscle: "",
    notes: "",
    breathingPattern: "",
  });

  const handleExerciseChange = (
    field: keyof MindMuscleExercise,
    value: string | number | string[]
  ) => {
    setExercise({
      ...exercise,
      [field]: value,
    });
  };

  const handleSettingsChange = (
    field: keyof typeof settings,
    value: string
  ) => {
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  const addFocusPoint = () => {
    setExercise({
      ...exercise,
      focusPoints: [...exercise.focusPoints, ""],
    });
  };

  const removeFocusPoint = (index: number) => {
    const newFocusPoints = exercise.focusPoints.filter((_, i) => i !== index);
    setExercise({
      ...exercise,
      focusPoints: newFocusPoints,
    });
  };

  const updateFocusPoint = (index: number, value: string) => {
    const newFocusPoints = [...exercise.focusPoints];
    newFocusPoints[index] = value;
    setExercise({
      ...exercise,
      focusPoints: newFocusPoints,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      exercise,
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
          تنظیمات تمرکز ذهن-عضله
        </h3>

        {/* Common Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              عضله هدف
            </label>
            <input
              type="text"
              value={settings.targetMuscle}
              onChange={(e) =>
                handleSettingsChange("targetMuscle", e.target.value)
              }
              placeholder="مثال: سینه، پشت بازو، جلو بازو"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              الگوی تنفس
            </label>
            <input
              type="text"
              value={settings.breathingPattern}
              onChange={(e) =>
                handleSettingsChange("breathingPattern", e.target.value)
              }
              placeholder="مثال: دم در فاز منفی، بازدم در فاز مثبت"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Exercise Settings */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h4 className="text-md font-medium text-gray-800 mb-4">
            تنظیمات تمرین
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                نام تمرین
              </label>
              <input
                type="text"
                value={exercise.name}
                onChange={(e) => handleExerciseChange("name", e.target.value)}
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
                onChange={(e) =>
                  handleExerciseChange("sets", parseInt(e.target.value))
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">پیشنهاد: 3-4 ست</p>
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
                onChange={(e) =>
                  handleExerciseChange("reps", parseInt(e.target.value))
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">پیشنهاد: 12-15 تکرار</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                وزنه (کیلوگرم)
              </label>
              <input
                type="number"
                min="0"
                value={exercise.weight}
                onChange={(e) =>
                  handleExerciseChange("weight", parseInt(e.target.value))
                }
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
                onChange={(e) =>
                  handleExerciseChange("restAfter", parseInt(e.target.value))
                }
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">
                پیشنهاد: 90-120 ثانیه
              </p>
            </div>
          </div>
        </div>

        {/* Focus Points */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h4 className="text-md font-medium text-gray-800 mb-4">نقاط تمرکز</h4>
          <div className="space-y-4">
            {exercise.focusPoints.map((point, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={point}
                  onChange={(e) => updateFocusPoint(index, e.target.value)}
                  placeholder="نقطه تمرکز (مثال: احساس انقباض در میانه حرکت)"
                  className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  type="button"
                  onClick={() => removeFocusPoint(index)}
                  className="px-3 py-2 text-red-600 hover:text-red-700"
                >
                  حذف
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addFocusPoint}
              className="px-4 py-2 text-blue-600 hover:text-blue-700 border border-blue-600 rounded-md"
            >
              افزودن نقطه تمرکز
            </button>
          </div>
        </div>

        {/* Visualization */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h4 className="text-md font-medium text-gray-800 mb-4">تجسم ذهنی</h4>
          <textarea
            value={exercise.visualization}
            onChange={(e) =>
              handleExerciseChange("visualization", e.target.value)
            }
            placeholder="توضیح تجسم ذهنی مورد نظر (مثال: تصور کشش و انقباض عضله)"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
          />
        </div>

        {/* Notes */}
        <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <h4 className="text-md font-medium text-gray-800 mb-4">یادداشت‌ها</h4>
          <textarea
            value={settings.notes}
            onChange={(e) => handleSettingsChange("notes", e.target.value)}
            placeholder="نکات مهم یا توضیحات اضافی"
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-32"
          />
        </div>

        {/* Instructions */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h4 className="text-md font-medium text-gray-800 mb-2">
            نکات مهم تمرکز ذهن-عضله
          </h4>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            <li>تمرکز کامل بر احساس انقباض عضله</li>
            <li>اجرای آهسته و کنترل شده حرکات</li>
            <li>تنفس عمیق و منظم</li>
            <li>تصویرسازی ذهنی از انقباض عضله</li>
            <li>اجتناب از وزنه‌های سنگین</li>
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

export default MindMuscleForm;
