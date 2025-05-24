import { motion } from "framer-motion";

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
      className="w-full max-w-2xl mx-auto mb-8"
    >
      <div className="bg-gradient-to-br from-indigo-50 to-white rounded-2xl shadow-lg overflow-hidden border border-indigo-100">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-500 p-4 text-white">
          <h2 className="text-xl font-bold text-center">مشخصات</h2>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* User Image Section */}
            <div className="flex-shrink-0 flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  {userImage ? (
                    <img
                      src={userImage}
                      alt={name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-indigo-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                  {name}
                </div>
              </div>
            </div>

            {/* User Details Section */}
            <div className="flex-grow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard
                  title="اطلاعات شخصی"
                  items={[
                    {
                      icon: (
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
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      ),
                      label: "قد",
                      value: `${height} سانتی‌متر`,
                      color: "text-blue-600",
                    },
                    {
                      icon: (
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
                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                          />
                        </svg>
                      ),
                      label: "وزن",
                      value: `${weight} کیلوگرم`,
                      color: "text-green-600",
                    },
                  ]}
                />

                <InfoCard
                  title="اطلاعات تمرین"
                  items={[
                    {
                      icon: (
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
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                          />
                        </svg>
                      ),
                      label: "سیستم تمرینی",
                      value: trainingSystem
                        ? getTrainingSystemLabel(trainingSystem)
                        : "-",
                      color: "text-purple-600",
                    },
                    {
                      icon: (
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
                            d="M13 10V3L4 14h7v7l9-11h-7z"
                          />
                        </svg>
                      ),
                      label: "هدف",
                      value: purpose ? getPurposeLabel(purpose) : "-",
                      color: "text-amber-600",
                    },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Description Section */}
          {description && (
            <div className="mt-6">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h7"
                    />
                  </svg>
                  <h3 className="text-sm font-semibold text-gray-600">
                    توضیحات
                  </h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
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
  <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
    <h3 className="text-sm font-semibold text-gray-600 mb-3">{title}</h3>
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-3">
          <span
            className={`p-2 rounded-lg bg-opacity-10 ${item.color} bg-current`}
          >
            {item.icon}
          </span>
          <div className="flex-grow">
            <div className="text-xs text-gray-500">{item.label}</div>
            <div className={`text-sm font-medium ${item.color}`}>
              {item.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default UserInfo;
