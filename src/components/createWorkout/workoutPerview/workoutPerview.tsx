import { motion } from "framer-motion";
import { useRef } from "react";
// import toast from "react-hot-toast";
// import UserInfo from "./components/UserInfo";
// import WorkoutDay from "./components/WorkoutDay";
// import { useWorkoutStore } from "../../../store";
// import { muscleOptions } from "../../../constants";
// import { useCreateWorkout } from "../../../hooks";


const WorkoutPerview = () => {
  const previewRef = useRef<HTMLDivElement>(null);
  // const { mutateAsync: createWorkout, isPending: isCreating } =
  //   useCreateWorkout();
  // const { workoutData, dayWorkouts, setCurrentStep, resetWorkoutData } =
  //   useWorkoutStore();
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [error, setError] = useState<string | null>(null);

  // const getMuscleLabel = (value: string) => {
  //   const option = muscleOptions.find((opt) => opt.value === value);
  //   return option ? option.label : value;
  // };

  // // const getTrainingSystemLabel = (system: string) => {
  // //   switch (system) {
  // //     case "fullbody":
  // //       return "فول‌بادی";
  // //     case "split":
  // //       return "اسپلیت";
  // //     case "upper-lower":
  // //       return "بالا/پایین‌تنه";
  // //     case "push-pull-legs":
  // //       return "پوش/پول/لگ";
  // //     case "custom":
  // //       return "سفارشی";
  // //     default:
  // //       return system;
  // //   }
  // // };

  // // const getPurposeLabel = (purpose: string) => {
  // //   switch (purpose) {
  // //     case "weight-loss":
  // //       return "کاهش وزن";
  // //     case "muscle-gain":
  // //       return "افزایش حجم عضلات";
  // //     case "strength":
  // //       return "افزایش قدرت";
  // //     case "endurance":
  // //       return "افزایش استقامت";
  // //     case "general-fitness":
  // //       return "تناسب اندام عمومی";
  // //     default:
  // //       return purpose;
  // //   }
  // // };

  // const handleBack = () => {
  //   setCurrentStep(2);
  // };

  // const handleSubmit = async () => {
  //   try {
  //     setIsSubmitting(true);
  //     setError(null);

  //     // Create the workout data object
  //     const workoutPayload = {
  //       ...workoutData,
  //       days: dayWorkouts.map((day) => ({
  //         day: day.day,
  //         targetMuscles: day.targetMuscles,
  //         exercises: day.exercises.map((exercise) => ({
  //           ...exercise,
  //           sets: exercise.sets,
  //           reps: exercise.reps,
  //           setConfig: {
  //             ...exercise.setConfig,
  //             weight: exercise.setConfig.weight,
  //             targetReps: Number(exercise.setConfig.targetReps),
  //             targetSets: Number(exercise.setConfig.targetSets),
  //             restTime: Number(exercise.setConfig.restTime),
  //           },
  //         })),
  //       })),
  //     };

  //     // Use the createWorkout mutation
  //     const response = (await createWorkout(
  //       workoutPayload
  //     )) as unknown as WorkoutCreateResponse;

  //     // Show success toast with the message from the response
  //     if (response?.success && response?.message) {
  //       toast.success(response.message);
  //     } else {
  //       toast.success("برنامه تمرینی با موفقیت ثبت شد");
  //     }

  //     // Reset store data after successful submission
  //     resetWorkoutData();

  //     // If successful, reset to first step
  //     setCurrentStep(1);
  //   } catch (err) {
  //     const errorMessage =
  //       err instanceof Error ? err.message : "خطا در ثبت برنامه";
  //     setError(errorMessage);
  //     toast.error(errorMessage);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  return (
    <motion.div
      dir="rtl"
      style={{ direction: "rtl" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full min-h-screen flex flex-col items-center bg-white print:bg-white px-2 sm:px-0"
    >
      <div ref={previewRef} className="w-full max-w-4xl px-4 sm:px-6 mb-8">
        {/* Force RTL direction for PDF and screen */}
        <style>{`
          [data-rtl-pdf] {
            direction: rtl !important;
            text-align: right !important;
          }
        `}</style>
        <div data-rtl-pdf>
          {/* User Information
          <UserInfo
            name={workoutData.workout_name}
            description={workoutData.workout_description}
            height={workoutData.user_height}
            weight={workoutData.user_weight}
            trainingSystem={workoutData.training_system}
            getTrainingSystemLabel={getTrainingSystemLabel}
            purpose={workoutData.purpose}
            getPurposeLabel={getPurposeLabel}
          /> */}

          {/* Program Schedule */}
          {/* <div className="space-y-4 sm:space-y-6">
            {dayWorkouts.map((day) => (
              <WorkoutDay
                key={day.id}
                day={day}
                getMuscleLabel={getMuscleLabel}
              />
            ))}
          </div> */}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between w-full max-w-xl mt-6 gap-2 print:hidden">
        {/* <motion.button
          onClick={handleBack}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-1.5 text-sm rounded hover:bg-gray-200 transition-colors"
          style={{ backgroundColor: "#f1f5f9", color: "#334155" }}
        >
          بازگشت
        </motion.button> */}
        <div className="flex gap-2">
          {/* <motion.button
            onClick={handleSubmit}
            disabled={isSubmitting || isCreating}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              backgroundColor: "rgb(34, 197, 94)",
              color: "rgb(255, 255, 255)",
            }}
            className="px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2 disabled:opacity-50"
          >
            {isSubmitting || isCreating ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                در حال ثبت...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                ثبت برنامه
              </>
            )}
          </motion.button> */}
        </div>
      </div>
      {/* {error && <div className="mt-4 text-red-500 text-sm">{error}</div>} */}
    </motion.div>
  );
};

export default WorkoutPerview;
