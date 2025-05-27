import { motion } from "framer-motion";
import { User, Scale, BarChart3, Zap, AlignLeft } from "lucide-react";

interface UserInfoProps {
  name: string;
  height: string;
  weight: string;
  trainingSystem?: string;
  getTrainingSystemLabel: (system: string) => string;
  purpose: string;
  getPurposeLabel: (purpose: string) => string;
  userImage?: string;
  description: string;
}

const UserInfo = ({
  name,
  height,
  weight,
  trainingSystem,
  getTrainingSystemLabel,
  purpose,
  getPurposeLabel,
  userImage,
  description,
}: UserInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-2xl mx-auto mb-4 sm:mb-8"
    >
      <div className="bg-gradient-to-br from-[#5677BC]/10 to-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-[#5677BC]/20">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-[#5677BC] to-[#5677BC]/90 p-3 sm:p-4 text-white">
          <h2 className="text-lg sm:text-xl font-bold text-center">مشخصات</h2>
        </div>

        <div className="p-4 sm:p-6">
          <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
            {/* User Image Section */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  {userImage ? (
                    <img
                      src={userImage}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#5677BC]/10 flex items-center justify-center">
                      <User className="h-12 w-12 sm:h-16 sm:w-16 text-[#5677BC]/40" />
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-[#5677BC] text-white px-2 sm:px-3 py-1 rounded-full text-xs truncate max-w-[100px] font-medium">
                  {name}
                </div>
              </div>
            </div>

            {/* User Details Section */}
            <div className="flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <InfoCard
                  title="اطلاعات شخصی"
                  items={[
                    {
                      icon: <User className="h-4 w-4 sm:h-5 sm:w-5 text-white" />,
                      label: "قد",
                      value: `${height} سانتی‌متر`,
                      color: "text-[#5677BC]",
                    },
                    {
                      icon: <Scale className="h-4 w-4 sm:h-5 sm:w-5 text-white" />,
                      label: "وزن",
                      value: `${weight} کیلوگرم`,
                      color: "text-[#5677BC]",
                    },
                  ]}
                />

                <InfoCard
                  title="اطلاعات تمرین"
                  items={[
                    {
                      icon: <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />,
                      label: "سیستم تمرینی",
                      value: trainingSystem
                        ? getTrainingSystemLabel(trainingSystem)
                        : "-",
                      color: "text-[#5677BC]",
                    },
                    {
                      icon: <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-white" />,
                      label: "هدف",
                      value: purpose ? getPurposeLabel(purpose) : "-",
                      color: "text-[#5677BC]",
                    },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Description Section */}
          {description && (
            <div className="mt-4 sm:mt-6">
              <div className="bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-sm border border-[#5677BC]/20">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <AlignLeft className="h-4 w-4 sm:h-5 sm:w-5 text-[#5677BC]" />
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-600">
                    توضیحات
                  </h3>
                </div>
                <p className="text-gray-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                  {description}
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
    <div className="space-y-2 sm:space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2 sm:gap-3">
          <span
            className={`flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-opacity-100 ${item.color} bg-current`}
          >
            {item.icon}
          </span>
          <div className="flex-grow">
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

export default UserInfo;
