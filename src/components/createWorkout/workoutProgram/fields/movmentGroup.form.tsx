// src/components/createWorkout/workoutProgram/setTypes/MovementGroupForm.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMovementStore } from "../../../../store/movement.store";
import { SetCountField, RestTimeField, MovementForm } from "../fields";
import type { SetType } from "../../../../constants/setsType";
import { setTypeOptions } from "../../../../constants/setsType";

interface Movement {
  id: string;
  name: string;
  type: SetType;
  set_count: number;
  rep_count: number;
  rest_time: number;
  weight: number;
  weight_unit: "kg" | "lb";
  tempo: string;
  movement_description: string;
}

interface GroupData {
  type: SetType;
  set_count: number;
  rest_time: number;
  movements: Movement[];
}

interface MovementGroupFormProps {
  type: SetType;
  onSave: (data: GroupData) => void;
}

// تعریف فیلدهای مورد نیاز برای هر نوع ست
const SET_TYPE_FIELDS: Record<
  SetType,
  {
    requiredFields: (keyof Movement)[];
    minMovements: number;
    maxMovements: number;
    description: string;
  }
> = {
  straight: {
    requiredFields: ["name", "set_count", "rep_count", "weight", "rest_time"],
    minMovements: 1,
    maxMovements: 1,
    description: "یک حرکت با تعداد ست و تکرار مشخص",
  },
  superset: {
    requiredFields: ["name", "set_count", "rep_count", "weight", "rest_time"],
    minMovements: 2,
    maxMovements: 2,
    description: "دو حرکت پشت سر هم بدون استراحت",
  },
  triset: {
    requiredFields: ["name", "set_count", "rep_count", "weight", "rest_time"],
    minMovements: 3,
    maxMovements: 3,
    description: "سه حرکت متوالی بدون استراحت",
  },
  giant: {
    requiredFields: ["name", "set_count", "rep_count", "weight", "rest_time"],
    minMovements: 4,
    maxMovements: 6,
    description: "4 تا 6 حرکت برای یک گروه عضلانی",
  },
  drop: {
    requiredFields: ["name", "set_count", "rep_count", "weight", "rest_time"],
    minMovements: 1,
    maxMovements: 1,
    description: "کاهش وزنه بعد از ناتوانی",
  },
  restPause: {
    requiredFields: ["name", "set_count", "rep_count", "weight", "rest_time"],
    minMovements: 1,
    maxMovements: 1,
    description: "استراحت کوتاه بین تکرارها",
  },
  pyramid: {
    requiredFields: ["name", "set_count", "rep_count", "weight", "rest_time"],
    minMovements: 1,
    maxMovements: 1,
    description: "تغییر وزنه و تکرار در هر ست",
  },
  fst7: {
    requiredFields: ["name", "set_count", "rep_count", "weight", "rest_time"],
    minMovements: 1,
    maxMovements: 1,
    description: "7 ست با استراحت کوتاه",
  },
  cluster: {
    requiredFields: ["name", "set_count", "rep_count", "weight", "rest_time"],
    minMovements: 1,
    maxMovements: 1,
    description: "شکستن یک ست سنگین به چند مینی‌ست",
  },
  circuit: {
    requiredFields: ["name", "set_count", "rep_count", "weight", "rest_time"],
    minMovements: 3,
    maxMovements: 6,
    description: "زنجیره‌ای از تمرینات مختلف",
  },
  hiit: {
    requiredFields: ["name", "set_count", "rep_count", "rest_time"],
    minMovements: 1,
    maxMovements: 2,
    description: "تناوب بین فاز شدید و استراحت",
  },
  preExhaust: {
    requiredFields: ["name", "set_count", "rep_count", "weight", "rest_time"],
    minMovements: 2,
    maxMovements: 2,
    description: "تمرین ایزوله قبل از ترکیبی",
  },
  postExhaust: {
    requiredFields: ["name", "set_count", "rep_count", "weight", "rest_time"],
    minMovements: 2,
    maxMovements: 2,
    description: "تمرین ترکیبی قبل از ایزوله",
  },
  tut: {
    requiredFields: ["name", "set_count", "rep_count", "weight", "tempo"],
    minMovements: 1,
    maxMovements: 1,
    description: "تمرکز بر زمان تحت فشار",
  },
  powerbuilding: {
    requiredFields: ["name", "set_count", "rep_count", "weight", "rest_time"],
    minMovements: 1,
    maxMovements: 1,
    description: "ترکیب قدرت و حجم",
  },
  mindMuscle: {
    requiredFields: ["name", "set_count", "rep_count", "weight", "tempo"],
    minMovements: 1,
    maxMovements: 1,
    description: "تمرکز بر ارتباط ذهن و عضله",
  },
};

const MovementGroupForm: React.FC<MovementGroupFormProps> = ({
  type,
  onSave,
}) => {
  const {
    addGroup,
    getGroup,
    updateGroup,
    addMovementToGroup,
    removeMovementFromGroup,
  } = useMovementStore();
  const [groupId] = useState(() => {
    const id = crypto.randomUUID();
    addGroup(type);
    return id;
  });

  const group = getGroup(groupId);
  const setTypeConfig = SET_TYPE_FIELDS[type];

  const handleAddMovement = () => {
    if (!group || group.movements.length >= setTypeConfig.maxMovements) {
      return;
    }

    const newMovement: Movement = {
      id: crypto.randomUUID(),
      name: "",
      type: "straight",
      set_count: 3,
      rep_count: 10,
      rest_time: 60,
      weight: 0,
      weight_unit: "kg",
      tempo: "2010",
      movement_description: "",
    };
    addMovementToGroup(groupId, newMovement);
  };

  const getGroupTitle = () => {
    const setType = setTypeOptions.find((option) => option.value === type);
    return setType ? setType.label : "گروه حرکت";
  };

  const getGroupDescription = () => {
    return setTypeConfig.description;
  };

  const validateMovement = (movement: Movement): boolean => {
    return setTypeConfig.requiredFields.every((field) => {
      const value = movement[field];
      return value !== undefined && value !== null && value !== "";
    });
  };

  const handleSave = () => {
    if (!group) return;

    const isValid =
      group.movements.every(validateMovement) &&
      group.movements.length >= setTypeConfig.minMovements &&
      group.movements.length <= setTypeConfig.maxMovements;

    if (!isValid) {
      // نمایش پیام خطا
      return;
    }

    onSave({
      type: group.type,
      set_count: group.set_count,
      rest_time: group.rest_time,
      movements: group.movements,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-lg mt-4"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          {getGroupTitle()}
        </h3>
        <p className="text-sm text-gray-600 mt-1">{getGroupDescription()}</p>
        <p className="text-xs text-gray-500 mt-1">
          تعداد حرکات مورد نیاز: {setTypeConfig.minMovements} تا{" "}
          {setTypeConfig.maxMovements}
        </p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SetCountField
            initialValue={group?.set_count || 3}
            onChange={(value) => updateGroup(groupId, { set_count: value })}
            min={1}
            max={20}
          />
          <RestTimeField
            initialValue={group?.rest_time || 60}
            onChange={(value) => updateGroup(groupId, { rest_time: value })}
            min={0}
            max={300}
            step={5}
          />
        </div>

        <div className="space-y-4">
          <AnimatePresence>
            {group?.movements.map((movement, index) => (
              <motion.div
                key={movement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">حرکت {index + 1}</h4>
                  {group.movements.length > setTypeConfig.minMovements && (
                    <button
                      onClick={() =>
                        removeMovementFromGroup(groupId, movement.id)
                      }
                      className="text-red-500 hover:text-red-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                <MovementForm
                  movement={movement}
                  onChange={(data) =>
                    updateGroup(groupId, {
                      movements: group.movements.map((m) =>
                        m.id === movement.id ? { ...m, ...data } : m
                      ),
                    })
                  }
                />
              </motion.div>
            ))}
          </AnimatePresence>

          {group && group.movements.length < setTypeConfig.maxMovements && (
            <button
              onClick={handleAddMovement}
              className="w-full p-3 text-center text-indigo-600 border-2 border-dashed border-indigo-300 rounded-lg hover:bg-indigo-50 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mx-auto mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              افزودن حرکت جدید
            </button>
          )}
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          ذخیره تنظیمات
        </button>
      </div>
    </motion.div>
  );
};

export default MovementGroupForm;
