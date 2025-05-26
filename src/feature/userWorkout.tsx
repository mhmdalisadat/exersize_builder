import { motion } from "framer-motion";
import UserInfo from "../components/workoutPerview/components/UserInfo";
import WorkoutDay from "../components/workoutPerview/components/WorkoutDay";
import { muscleOptions } from "../constants";
import type { ExerciseMovement } from "../components/workoutProgram/ExerciseMovement";

const UserWorkout = () => {
  // Static data for demonstration
  const workoutData = {
    name: "برنامه تمرینی فول بادی",
    description: "برنامه تمرینی مناسب برای افراد مبتدی تا متوسط",
    height: "175",
    weight: "75",
    trainingSystem: "fullbody",
    purpose: "muscle-gain",
    userImage: "",
  };

  const dayWorkouts = [
    {
      day: 1,
      id: "day-1",
      targetMuscles: ["chest", "back", "legs"],
      exercises: [
        {
          id: "ex1",
          name: "پرس سینه",
          sets: "3",
          reps: "12",
          setType: "straight",
          description: "حرکت اصلی برای تقویت عضلات سینه",
          muscleGroup: "chest",
          setConfig: {
            type: "straight",
            restTime: 90,
            targetReps: 12,
            targetSets: 3,
          },
        },
        {
          id: "ex2",
          name: "ددلیفت",
          sets: "3",
          reps: "10",
          setType: "straight",
          description: "حرکت اصلی برای تقویت عضلات پشت و پاها",
          muscleGroup: "back",
          setConfig: {
            type: "straight",
            restTime: 120,
            targetReps: 10,
            targetSets: 3,
          },
        },
      ] as ExerciseMovement[],
    },
    {
      day: 2,
      id: "day-2",
      targetMuscles: ["rest"],
      exercises: [],
    },
  ];

  const getMuscleLabel = (value: string) => {
    const option = muscleOptions.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const getTrainingSystemLabel = (system: string) => {
    switch (system) {
      case "fullbody":
        return "فول‌بادی";
      case "split":
        return "اسپلیت";
      case "upper-lower":
        return "بالا/پایین‌تنه";
      case "push-pull-legs":
        return "پوش/پول/لگ";
      case "custom":
        return "سفارشی";
      default:
        return system;
    }
  };

  const getPurposeLabel = (purpose: string) => {
    switch (purpose) {
      case "weight-loss":
        return "کاهش وزن";
      case "muscle-gain":
        return "افزایش حجم عضلات";
      case "strength":
        return "افزایش قدرت";
      case "endurance":
        return "افزایش استقامت";
      case "general-fitness":
        return "تناسب اندام عمومی";
      default:
        return purpose;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Workout Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6"
        >
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {workoutData.name}
          </h1>
          <p className="text-gray-600 mb-4">{workoutData.description}</p>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
              {getTrainingSystemLabel(workoutData.trainingSystem)}
            </span>
            <span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">
              {getPurposeLabel(workoutData.purpose)}
            </span>
          </div>
        </motion.div>

        {/* User Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <UserInfo
            name={workoutData.name}
            height={workoutData.height}
            weight={workoutData.weight}
            userImage={workoutData.userImage}
            description={workoutData.description}
            purpose={workoutData.purpose}
            getTrainingSystemLabel={getTrainingSystemLabel}
            getPurposeLabel={getPurposeLabel}
          />
        </motion.div>

        {/* Workout Days */}
        <div className="space-y-4">
          {dayWorkouts.map((day, index) => (
            <motion.div
              key={day.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <WorkoutDay day={day} getMuscleLabel={getMuscleLabel} />
            </motion.div>
          ))}
        </div>

        {/* Workout Notes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: dayWorkouts.length * 0.1 }}
          className="mt-6 bg-white rounded-lg shadow-sm border border-gray-100 p-6"
        >
          <h2 className="text-lg font-semibold text-gray-800 mb-3">نکات مهم</h2>
          <div className="prose prose-sm text-gray-600">
            <ul className="list-disc list-inside space-y-2">
              <li>قبل از شروع تمرین حتماً بدن را گرم کنید</li>
              <li>بین ست‌ها 60 تا 90 ثانیه استراحت کنید</li>
              <li>حرکات را با فرم صحیح انجام دهید</li>
              <li>در صورت احساس درد غیرعادی، تمرین را متوقف کنید</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UserWorkout;
