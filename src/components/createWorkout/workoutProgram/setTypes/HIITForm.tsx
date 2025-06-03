import React, { useState } from "react";

interface HIITExercise {
  name: string;
  workIntensity: number; // 1-10 scale
  workDuration: number; // seconds
  restDuration: number; // seconds
  reps?: number;
  weight?: number;
  tempo?: string;
}

export interface HIITData {
  exercises: HIITExercise[];
  totalRounds: number;
  restBetweenRounds: number;
  targetMuscleGroups: string[];
  notes: string;
}

interface HIITFormProps {
  onSave: (data: HIITData) => void;
}

const HIITForm: React.FC<HIITFormProps> = ({ onSave }) => {
  const [exercises, setExercises] = useState<HIITExercise[]>([
    {
      name: "",
      workIntensity: 8,
      workDuration: 30,
      restDuration: 15,
      reps: 0,
      weight: 0,
      tempo: "",
    },
  ]);

  const [settings, setSettings] = useState({
    totalRounds: 4,
    restBetweenRounds: 60,
    targetMuscleGroups: [""],
    notes: "",
  });

  const handleExerciseChange = (
    index: number,
    field: keyof HIITExercise,
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
    value: string | number | string[]
  ) => {
    setSettings({
      ...settings,
      [field]: value,
    });
  };

  const addExercise = () => {
    setExercises([
      ...exercises,
      {
        name: "",
        workIntensity: 8,
        workDuration: 30,
        restDuration: 15,
        reps: 0,
        weight: 0,
        tempo: "",
      },
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
    <form
      onSubmit={handleSubmit}
      className="mt-6 space-y-6 bg-white p-6 rounded-lg shadow-sm"
    >
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          تنظیمات HIIT
        </h3>

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
              onChange={(e) =>
                handleSettingsChange("totalRounds", parseInt(e.target.value))
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">پیشنهاد: 4-8 دور</p>
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
              onChange={(e) =>
                handleSettingsChange(
                  "restBetweenRounds",
                  parseInt(e.target.value)
                )
              }
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="text-xs text-gray-500 mt-1">پیشنهاد: 1-2 دقیقه</p>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              گروه‌های عضلانی هدف
            </label>
            <input
              type="text"
              value={settings.targetMuscleGroups.join(", ")}
              onChange={(e) =>
                handleSettingsChange(
                  "targetMuscleGroups",
                  e.target.value.split(",").map((s) => s.trim())
                )
              }
              placeholder="مثال: کل بدن، پایین تنه، بالا تنه"
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
              onChange={(e) => handleSettingsChange("notes", e.target.value)}
              placeholder="نکات مهم یا توضیحات"
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Exercises */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-md font-medium text-gray-800">تمرینات HIIT</h4>
            <button
              type="button"
              onClick={addExercise}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200"
            >
              افزودن تمرین
            </button>
          </div>

          {exercises.map((exercise, index) => (
            <div
              key={index}
              className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm"
            >
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    نام تمرین
                  </label>
                  <input
                    type="text"
                    value={exercise.name}
                    onChange={(e) =>
                      handleExerciseChange(index, "name", e.target.value)
                    }
                    placeholder="نام تمرین"
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    شدت کار (1-10)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={exercise.workIntensity}
                    onChange={(e) =>
                      handleExerciseChange(
                        index,
                        "workIntensity",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">10 = حداکثر شدت</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    مدت زمان کار (ثانیه)
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="120"
                    value={exercise.workDuration}
                    onChange={(e) =>
                      handleExerciseChange(
                        index,
                        "workDuration",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    پیشنهاد: 20-60 ثانیه
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    مدت زمان استراحت (ثانیه)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="60"
                    value={exercise.restDuration}
                    onChange={(e) =>
                      handleExerciseChange(
                        index,
                        "restDuration",
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    پیشنهاد: 10-30 ثانیه
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    تعداد تکرار (اختیاری)
                  </label>
                  <input
                    type="number"
                    min="0"
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
                    وزنه (کیلوگرم) (اختیاری)
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
              </div>
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="text-md font-medium text-blue-800 mb-2">
            نکات مهم HIIT
          </h4>
          <ul className="list-disc list-inside text-sm text-blue-700 space-y-1">
            <li>در فاز کار با حداکثر شدت تمرین کنید</li>
            <li>استراحت باید کوتاه و فعال باشد</li>
            <li>نسبت کار به استراحت معمولاً 2:1 یا 1:1 است</li>
            <li>تمرکز بر حفظ فرم صحیح حتی در شدت بالا</li>
            <li>تنفس عمیق و منظم را فراموش نکنید</li>
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

export default HIITForm;
