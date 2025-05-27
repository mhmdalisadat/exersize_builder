import { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus } from "lucide-react";

export type SetType =
  | "straight" // Straight Set
  | "superset" // Superset
  | "triset" // Tri-Set
  | "giant" // Giant Set
  | "drop" // Drop Set
  | "restPause" // Rest-Pause Set
  | "pyramid" // Pyramid Set
  | "fst7" // FST-7
  | "cluster" // Cluster Sets
  | "circuit" // Circuit Training
  | "hiit" // HIIT
  | "preExhaust" // Pre-Exhaust
  | "postExhaust" // Post-Exhaust
  | "tut" // Time Under Tension
  | "powerbuilding" // Powerbuilding
  | "mindMuscle"; // Mind-Muscle Connection

export interface SetConfig {
  type: SetType;
  restTime?: number; // Rest time in seconds
  targetReps?: number; // Target repetitions
  targetSets?: number; // Number of sets
  weight?: string; // Weight used
  tempo?: string; // Tempo of the movement (e.g., "2-1-2")
  notes?: string; // Additional notes
}

export interface ExerciseMovement {
  id: string;
  name: string;
  sets: string;
  reps: string;
  description: string;
  muscleGroup: string;
  setType: SetType;
  setConfig: SetConfig;
  isCompound?: boolean; // Whether it's a compound movement
  isIsolation?: boolean; // Whether it's an isolation movement
  relatedExercises?: RelatedExercise[]; // For supersets, trisets, etc.
}

export interface RelatedExercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
  restTime: number;
}

interface ExerciseMovementProps {
  exercise?: ExerciseMovement;
  onSave: (exercise: ExerciseMovement) => void;
  onCancel?: () => void;
}

const ExerciseMovementForm: React.FC<ExerciseMovementProps> = ({
  exercise,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<ExerciseMovement>(
    exercise || {
      id: Math.random().toString(36).substring(2, 9),
      name: "",
      sets: "",
      reps: "",
      description: "",
      muscleGroup: "chest",
      setType: "straight",
      setConfig: {
        type: "straight",
        restTime: 90,
        targetReps: 10,
        targetSets: 3,
      },
      isCompound: false,
      isIsolation: false,
      relatedExercises: [],
    }
  );

  const [relatedExercises, setRelatedExercises] = useState<RelatedExercise[]>(
    exercise?.relatedExercises || []
  );

  const setTypeOptions: {
    value: SetType;
    label: string;
    description: string;
  }[] = [
    {
      value: "straight",
      label: "ست معمولی",
      description: "اجرای یک تمرین خاص در چند ست با تعداد تکرار مشخص",
    },
    {
      value: "superset",
      label: "سوپرست",
      description: "اجرای دو تمرین پشت سر هم بدون استراحت",
    },
    {
      value: "triset",
      label: "تری‌ست",
      description: "انجام سه تمرین متوالی بدون استراحت",
    },
    {
      value: "giant",
      label: "جاینت ست",
      description: "اجرای 4 تمرین یا بیشتر برای یک گروه عضلانی",
    },
    {
      value: "drop",
      label: "دراپ‌ست",
      description: "شروع با وزنه سنگین و کاهش وزنه بعد از ناتوانی",
    },
    {
      value: "restPause",
      label: "رست-پاز",
      description: "انجام تا ناتوانی، استراحت کوتاه، و ادامه",
    },
    {
      value: "pyramid",
      label: "ست هرمی",
      description: "افزایش یا کاهش وزنه و تکرارها در هر ست",
    },
    {
      value: "fst7",
      label: "FST-7",
      description: "7 ست با استراحت کوتاه برای کشش فاشیا",
    },
    {
      value: "cluster",
      label: "کلسترال",
      description: "شکستن یک ست سنگین به چند مینی‌ست",
    },
    {
      value: "circuit",
      label: "سیرکویت",
      description: "زنجیره‌ای از تمرینات مختلف با حداقل استراحت",
    },
    {
      value: "hiit",
      label: "HIIT",
      description: "تناوب بین فاز شدید و فاز استراحت",
    },
    {
      value: "preExhaust",
      label: "پیش خستگی",
      description: "تمرین ایزوله قبل از تمرین ترکیبی",
    },
    {
      value: "postExhaust",
      label: "پس خستگی",
      description: "تمرین ترکیبی قبل از تمرین ایزوله",
    },
    {
      value: "tut",
      label: "زمان تحت فشار",
      description: "افزایش مدت زمانی که عضله تحت فشار است",
    },
    {
      value: "powerbuilding",
      label: "پاوربیلدینگ",
      description: "ترکیب قدرت و تمرینات حجمی",
    },
    {
      value: "mindMuscle",
      label: "تمرکز ذهن-عضله",
      description: "تمرکز بر ارتباط ذهن و عضله",
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      setConfig: {
        ...prev.setConfig,
        type: name === "setType" ? (value as SetType) : prev.setConfig.type,
      },
    }));
  };

  const handleAddRelatedExercise = () => {
    const newExercise: RelatedExercise = {
      id: Math.random().toString(36).substring(2, 9),
      name: "",
      sets: "",
      reps: "",
      restTime: 90,
    };
    setRelatedExercises([...relatedExercises, newExercise]);
  };

  const handleRemoveRelatedExercise = (id: string) => {
    setRelatedExercises(relatedExercises.filter((ex) => ex.id !== id));
  };

  const handleRelatedExerciseChange = (
    id: string,
    field: keyof RelatedExercise,
    value: string | number
  ) => {
    setRelatedExercises(
      relatedExercises.map((ex) =>
        ex.id === id ? { ...ex, [field]: value } : ex
      )
    );
  };

  const handleSubmit = () => {
    const finalData = {
      ...formData,
      relatedExercises: relatedExercises.filter((ex) => ex.name.trim() !== ""),
      setConfig: {
        ...formData.setConfig,
        type: formData.setType,
      },
    };
    onSave(finalData);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      y: 20,
      transition: { duration: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3 },
    },
  };

  const renderSetTypeSpecificFields = () => {
    switch (formData.setType) {
      case "superset":
        return (
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="text-right mb-2 text-slate-500 font-medium">
              حرکات سوپرست
            </div>
            {relatedExercises.map((exercise, index) => (
              <motion.div
                key={exercise.id}
                className="bg-slate-50 p-4 rounded-lg space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-slate-700">
                    حرکت {index + 1}
                  </h4>
                  <motion.button
                    onClick={() => handleRemoveRelatedExercise(exercise.id)}
                    className="text-red-500 hover:text-red-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      value={exercise.name}
                      onChange={(e) =>
                        handleRelatedExerciseChange(
                          exercise.id,
                          "name",
                          e.target.value
                        )
                      }
                      className="w-full bg-white py-1.5 px-3 rounded-md text-right focus:outline-none border border-slate-200"
                      placeholder="نام حرکت"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={exercise.sets}
                      onChange={(e) =>
                        handleRelatedExerciseChange(
                          exercise.id,
                          "sets",
                          e.target.value
                        )
                      }
                      className="w-full bg-white py-1.5 px-3 rounded-md text-right focus:outline-none border border-slate-200"
                      placeholder="تعداد ست"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={exercise.reps}
                      onChange={(e) =>
                        handleRelatedExerciseChange(
                          exercise.id,
                          "reps",
                          e.target.value
                        )
                      }
                      className="w-full bg-white py-1.5 px-3 rounded-md text-right focus:outline-none border border-slate-200"
                      placeholder="تعداد تکرار"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={exercise.restTime}
                      onChange={(e) =>
                        handleRelatedExerciseChange(
                          exercise.id,
                          "restTime",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full bg-white py-1.5 px-3 rounded-md text-right focus:outline-none border border-slate-200"
                      placeholder="زمان استراحت (ثانیه)"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.button
              onClick={handleAddRelatedExercise}
              className="w-full py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-all text-sm flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={16} />
              افزودن حرکت به سوپرست
            </motion.button>
          </motion.div>
        );

      case "triset":
        return (
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="text-right mb-2 text-slate-500 font-medium">
              حرکات تری‌ست
            </div>
            {relatedExercises.map((exercise, index) => (
              <motion.div
                key={exercise.id}
                className="bg-slate-50 p-4 rounded-lg space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-slate-700">
                    حرکت {index + 1}
                  </h4>
                  <motion.button
                    onClick={() => handleRemoveRelatedExercise(exercise.id)}
                    className="text-red-500 hover:text-red-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      value={exercise.name}
                      onChange={(e) =>
                        handleRelatedExerciseChange(
                          exercise.id,
                          "name",
                          e.target.value
                        )
                      }
                      className="w-full bg-white py-1.5 px-3 rounded-md text-right focus:outline-none border border-slate-200"
                      placeholder="نام حرکت"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={exercise.sets}
                      onChange={(e) =>
                        handleRelatedExerciseChange(
                          exercise.id,
                          "sets",
                          e.target.value
                        )
                      }
                      className="w-full bg-white py-1.5 px-3 rounded-md text-right focus:outline-none border border-slate-200"
                      placeholder="تعداد ست"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={exercise.reps}
                      onChange={(e) =>
                        handleRelatedExerciseChange(
                          exercise.id,
                          "reps",
                          e.target.value
                        )
                      }
                      className="w-full bg-white py-1.5 px-3 rounded-md text-right focus:outline-none border border-slate-200"
                      placeholder="تعداد تکرار"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={exercise.restTime}
                      onChange={(e) =>
                        handleRelatedExerciseChange(
                          exercise.id,
                          "restTime",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full bg-white py-1.5 px-3 rounded-md text-right focus:outline-none border border-slate-200"
                      placeholder="زمان استراحت (ثانیه)"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.button
              onClick={handleAddRelatedExercise}
              className="w-full py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-all text-sm flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={16} />
              افزودن حرکت به تری‌ست
            </motion.button>
          </motion.div>
        );

      case "giant":
        return (
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="text-right mb-2 text-slate-500 font-medium">
              حرکات جاینت ست
            </div>
            {relatedExercises.map((exercise, index) => (
              <motion.div
                key={exercise.id}
                className="bg-slate-50 p-4 rounded-lg space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-medium text-slate-700">
                    حرکت {index + 1}
                  </h4>
                  <motion.button
                    onClick={() => handleRemoveRelatedExercise(exercise.id)}
                    className="text-red-500 hover:text-red-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      value={exercise.name}
                      onChange={(e) =>
                        handleRelatedExerciseChange(
                          exercise.id,
                          "name",
                          e.target.value
                        )
                      }
                      className="w-full bg-white py-1.5 px-3 rounded-md text-right focus:outline-none border border-slate-200"
                      placeholder="نام حرکت"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={exercise.sets}
                      onChange={(e) =>
                        handleRelatedExerciseChange(
                          exercise.id,
                          "sets",
                          e.target.value
                        )
                      }
                      className="w-full bg-white py-1.5 px-3 rounded-md text-right focus:outline-none border border-slate-200"
                      placeholder="تعداد ست"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={exercise.reps}
                      onChange={(e) =>
                        handleRelatedExerciseChange(
                          exercise.id,
                          "reps",
                          e.target.value
                        )
                      }
                      className="w-full bg-white py-1.5 px-3 rounded-md text-right focus:outline-none border border-slate-200"
                      placeholder="تعداد تکرار"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      value={exercise.restTime}
                      onChange={(e) =>
                        handleRelatedExerciseChange(
                          exercise.id,
                          "restTime",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full bg-white py-1.5 px-3 rounded-md text-right focus:outline-none border border-slate-200"
                      placeholder="زمان استراحت (ثانیه)"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
            <motion.button
              onClick={handleAddRelatedExercise}
              className="w-full py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition-all text-sm flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={16} />
              افزودن حرکت به جاینت ست
            </motion.button>
          </motion.div>
        );

      case "drop":
        return (
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="text-right mb-2 text-slate-500 font-medium">
              تنظیمات دراپ ست
            </div>
            <div className="bg-slate-50 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    وزنه اولیه
                  </label>
                  <input
                    type="text"
                    value={formData.setConfig.weight || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        setConfig: {
                          ...prev.setConfig,
                          weight: e.target.value,
                        },
                      }))
                    }
                    className="w-full bg-white py-1.5 px-3 rounded-md text-right focus:outline-none border border-slate-200"
                    placeholder="وزنه اولیه"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    کاهش وزنه
                  </label>
                  <input
                    type="text"
                    value={formData.setConfig.notes || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        setConfig: { ...prev.setConfig, notes: e.target.value },
                      }))
                    }
                    className="w-full bg-white py-1.5 px-3 rounded-md text-right focus:outline-none border border-slate-200"
                    placeholder="مثال: 10kg -> 8kg -> 6kg"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case "restPause":
        return (
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="text-right mb-2 text-slate-500 font-medium">
              تنظیمات رست-پاز
            </div>
            <div className="bg-slate-50 p-4 rounded-lg space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    زمان استراحت بین ست‌ها
                  </label>
                  <input
                    type="number"
                    value={formData.setConfig.restTime || 20}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        setConfig: {
                          ...prev.setConfig,
                          restTime: parseInt(e.target.value),
                        },
                      }))
                    }
                    className="w-full bg-white py-1.5 px-3 rounded-md text-right focus:outline-none border border-slate-200"
                    placeholder="زمان استراحت (ثانیه)"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-1">
                    تعداد تکرار در هر مینی ست
                  </label>
                  <input
                    type="number"
                    value={formData.setConfig.targetReps || 3}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        setConfig: {
                          ...prev.setConfig,
                          targetReps: parseInt(e.target.value),
                        },
                      }))
                    }
                    className="w-full bg-white py-1.5 px-3 rounded-md text-right focus:outline-none border border-slate-200"
                    placeholder="تعداد تکرار"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      // Add more cases for other set types...

      default:
        return null;
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg p-4 sm:p-6 shadow-md border border-slate-200 w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <h3 className="text-base sm:text-lg font-medium text-indigo-700 mb-3 sm:mb-4 text-right">
        تعریف حرکت تمرینی
      </h3>

      <div className="space-y-4 sm:space-y-6">
        {/* Exercise Name */}
        <motion.div variants={itemVariants}>
          <div className="text-right mb-1.5 sm:mb-2 text-slate-500 font-medium text-sm sm:text-base">
            نام حرکت
          </div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-transparent text-slate-700 text-xs sm:text-sm border border-slate-200 rounded-md shadow-sm hover:border-slate-400 transition duration-300 relative"
          >
            <motion.input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full bg-transparent py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-right focus:outline-none"
              placeholder="نام حرکت"
            />
          </motion.div>
        </motion.div>

        {/* Set Type Selection */}
        <motion.div variants={itemVariants}>
          <div className="text-right mb-1.5 sm:mb-2 text-slate-500 font-medium text-sm sm:text-base">
            نوع ست
          </div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-transparent text-slate-700 text-xs sm:text-sm border border-slate-200 rounded-md shadow-sm hover:border-slate-400 transition duration-300 relative"
          >
            <motion.select
              name="setType"
              value={formData.setType}
              onChange={handleInputChange}
              className="w-full bg-transparent py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-right focus:outline-none"
            >
              {setTypeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label} - {option.description}
                </option>
              ))}
            </motion.select>
          </motion.div>
        </motion.div>

        {/* Sets and Reps */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 sm:gap-6"
          variants={itemVariants}
        >
          <div className="w-full sm:w-1/2">
            <div className="text-right mb-1.5 sm:mb-2 text-slate-500 font-medium text-sm sm:text-base">
              تعداد ست
            </div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-transparent text-slate-700 text-xs sm:text-sm border border-slate-200 rounded-md shadow-sm hover:border-slate-400 transition duration-300 relative"
            >
              <motion.input
                type="number"
                name="sets"
                value={formData.sets}
                onChange={handleInputChange}
                className="w-full bg-transparent py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-right focus:outline-none"
                min="1"
                placeholder="تعداد ست"
              />
            </motion.div>
          </div>

          <div className="w-full sm:w-1/2">
            <div className="text-right mb-1.5 sm:mb-2 text-slate-500 font-medium text-sm sm:text-base">
              تعداد تکرار
            </div>
            <motion.div
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-transparent text-slate-700 text-xs sm:text-sm border border-slate-200 rounded-md shadow-sm hover:border-slate-400 transition duration-300 relative"
            >
              <motion.input
                type="number"
                name="reps"
                value={formData.reps}
                onChange={handleInputChange}
                className="w-full bg-transparent py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-right focus:outline-none"
                min="1"
                placeholder="تعداد تکرار"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Rest Time */}
        <motion.div variants={itemVariants}>
          <div className="text-right mb-1.5 sm:mb-2 text-slate-500 font-medium text-sm sm:text-base">
            زمان استراحت (ثانیه)
          </div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-transparent text-slate-700 text-xs sm:text-sm border border-slate-200 rounded-md shadow-sm hover:border-slate-400 transition duration-300 relative"
          >
            <motion.input
              type="number"
              name="restTime"
              value={formData.setConfig.restTime}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  setConfig: {
                    ...prev.setConfig,
                    restTime: parseInt(e.target.value),
                  },
                }));
              }}
              className="w-full bg-transparent py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-right focus:outline-none"
              min="0"
              placeholder="زمان استراحت"
            />
          </motion.div>
        </motion.div>

        {/* Description */}
        <motion.div variants={itemVariants}>
          <div className="text-right mb-1.5 sm:mb-2 text-slate-500 font-medium text-sm sm:text-base">
            توضیحات
          </div>
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-transparent text-slate-700 text-xs sm:text-sm border border-slate-200 rounded-md shadow-sm hover:border-slate-400 transition duration-300 relative"
          >
            <motion.textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-transparent py-1.5 sm:py-2 px-3 sm:px-4 rounded-md text-right resize-none focus:outline-none"
              rows={4}
              placeholder="توضیحات حرکت را وارد کنید..."
            />
          </motion.div>
        </motion.div>

        {/* Set Type Specific Fields */}
        {renderSetTypeSpecificFields()}

        {/* Buttons */}
        <motion.div
          className="flex justify-end gap-3 sm:gap-4 mt-4 sm:mt-6"
          variants={itemVariants}
        >
          {onCancel && (
            <motion.button
              onClick={onCancel}
              className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-slate-600 font-medium bg-slate-100 hover:bg-slate-200 transition-all text-xs sm:text-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              انصراف
            </motion.button>
          )}
          <motion.button
            onClick={handleSubmit}
            className="px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg text-white font-medium bg-indigo-600 hover:bg-indigo-700 transition-all text-xs sm:text-sm"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            ذخیره
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ExerciseMovementForm;
