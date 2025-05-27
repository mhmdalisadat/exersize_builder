import { motion } from "framer-motion";
import {
  User,
  Scale,
  BarChart3,
  Zap,
  AlignLeft,
  Calendar,
  BookOpen,
} from "lucide-react";
import { trainingSystemOptions } from "../../../constants/systems";
import { purposeOptions } from "../../../constants/purposes";

interface WorkoutData {
  daysPerWeek: string;
  description: string;
  height: string;
  name: string;
  programId: string;
  programName: string;
  purpose: string;
  trainingSystem: string;
  updatedAt: string;
  userImage: string;
  weight: string;
  _id: string;
}

interface WorkoutResponse {
  success: boolean;
  message: string;
  data: WorkoutData;
}

interface Props {
  workout: WorkoutResponse;
}

const UserProfile = ({ workout }: Props) => {
  console.log("Workout:", workout);
  console.log("Data:", workout.data);

  const workoutData = workout.data;

  const getTrainingSystemLabel = (system: string) => {
    const found = trainingSystemOptions.find(
      (option) => option.value === system
    );
    return found ? found.label : system;
  };

  const getPurposeLabel = (purpose: string) => {
    const found = purposeOptions.find((option) => option.value === purpose);
    return found ? found.label : purpose;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto mb-4 sm:mb-8"
      dir="rtl"
    >
      <div className="bg-gradient-to-br from-[#5677BC]/10 to-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-[#5677BC]/20">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-[#5677BC] to-[#5677BC]/90 p-3 sm:p-4 text-white shadow-2xl rounded-t-xl rounded-b-xl">
          <h2 className="text-lg sm:text-xl font-bold text-center">مشخصات</h2>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
            {/* User Image Section */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  {workoutData?.userImage ? (
                    <img
                      src={workoutData.userImage}
                      alt={workoutData?.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#5677BC]/10 flex items-center justify-center">
                      <User className="h-12 w-12 sm:h-16 sm:w-16 text-[#5677BC]/40" />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#5677BC] text-white px-2 sm:px-3 py-1 rounded-full text-xs truncate max-w-[100px] font-medium">
                  {workoutData?.name || "نامشخص"}
                </div>
              </div>
            </div>

            {/* User Details Section */}
            <div className="flex-grow">
              <InfoCard
                title="اطلاعات"
                items={[
                  {
                    icon: <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />,
                    label: "قد",
                    value: `${workoutData?.height || "-"} سانتی‌متر`,
                    color: "text-[#5677BC]",
                  },
                  {
                    icon: (
                      <Scale className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    ),
                    label: "وزن",
                    value: `${workoutData?.weight || "-"} کیلوگرم`,
                    color: "text-[#5677BC]",
                  },
                  {
                    icon: (
                      <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    ),
                    label: "سیستم تمرینی",
                    value: workoutData?.trainingSystem
                      ? getTrainingSystemLabel(workoutData.trainingSystem)
                      : "-",
                    color: "text-[#5677BC]",
                  },
                  {
                    icon: <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />,
                    label: "هدف",
                    value: workoutData?.purpose
                      ? getPurposeLabel(workoutData.purpose)
                      : "-",
                    color: "text-[#5677BC]",
                  },
                  {
                    icon: (
                      <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    ),
                    label: "تعداد روزهای تمرین",
                    value: `${workoutData?.daysPerWeek || "-"} روز در هفته`,
                    color: "text-[#5677BC]",
                  },
                  {
                    icon: (
                      <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                    ),
                    label: "نام برنامه",
                    value: workoutData?.programName || "-",
                    color: "text-[#5677BC]",
                  },
                ]}
              />
            </div>
          </div>

          {/* Description Section */}
          {workoutData?.description && (
            <div className="mt-4 sm:mt-6">
              <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-[#5677BC]/20">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <AlignLeft className="h-4 w-4 sm:h-5 sm:w-5 text-[#5677BC]" />
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-600">
                    توضیحات
                  </h3>
                </div>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {workoutData.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

interface InfoCardProps {
  title: string;
  items: {
    icon: React.ReactNode;
    label: string;
    value: string;
    color: string;
  }[];
}

const InfoCard = ({ title, items }: InfoCardProps) => (
  <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-[#5677BC]/20">
    <h3 className="text-xs sm:text-sm font-semibold text-gray-600 mb-2 sm:mb-3">
      {title}
    </h3>
    <div className="grid grid-cols-2 gap-2 sm:gap-4">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-1 sm:gap-3">
          <span
            className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-opacity-100 ${item.color} bg-current`}
          >
            {item.icon}
          </span>
          <div className="flex-grow text-right">
            <div className="text-xs text-gray-500">{item.label}</div>
            <div className={`text-xs sm:text-sm font-medium ${item.color}`}>
              {item.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default UserProfile;
