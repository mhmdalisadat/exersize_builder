import { motion } from "framer-motion";
import WorkoutDefine from "./workoutDefine";
import { NavigationButtons } from "../../common";
import { useWorkoutStore } from "../../../store";
import { muscleOptions } from "../../../constants";
import { animations } from "../../../animation";
import ExerciseEditor from "./movementsDays";

const WorkoutProgram: React.FC = () => {
  const {
    dayWorkouts,
    currentSelectedDay,
    setCurrentSelectedDay,
    updateDayWorkout,
    setCurrentStep,
  } = useWorkoutStore();

  const handleDaySelect = (day: number) => {
    setCurrentSelectedDay(day);
  };

  const handleExercisesChange = (exercises) => {
    const dayWorkout = dayWorkouts.find((d) => d.day === currentSelectedDay);
    if (dayWorkout) {
      updateDayWorkout({
        ...dayWorkout,
        exercises,
      });
    }
  };

  const getMuscleLabel = (value: string) => {
    const option = muscleOptions.find((opt) => opt.value === value);
    return option ? option.label : value;
  };

  const goToPreviousStep = () => {
    setCurrentStep(1);
  };

  const handleFinish = () => {
    setCurrentStep(3);
  };

  const currentDay = dayWorkouts.find((day) => day.day === currentSelectedDay);

  return (
    <motion.div
      className="w-full flex justify-center px-2 sm:px-4 lg:px-8 py-3"
      variants={animations.container}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="w-full max-w-4xl flex flex-col gap-4 sm:gap-6">
        <ExerciseEditor
          dayWorkouts={dayWorkouts}
          currentSelectedDay={currentSelectedDay}
          handleDaySelect={handleDaySelect}
          getMuscleLabel={getMuscleLabel}
        />
        <WorkoutDefine
          title="تعریف حرکات تمرینی"
          currentDay={currentDay!}
          onExercisesChange={handleExercisesChange}
        />

        <div className="flex flex-col sm:flex-row gap-3 mt-4">
          <NavigationButtons
            onPrevious={goToPreviousStep}
            onNext={handleFinish}
            isNextDisabled={false}
            variants={animations.button}
            nextButtonText="پایان و ذخیره"
            nextButtonClassName="bg-gradient-to-r from-green-500 to-green-600"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default WorkoutProgram;
