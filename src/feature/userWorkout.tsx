import { useParams } from "react-router-dom";
import { useGetWorkout } from "../hooks";
import { UserExercises, UserProfile } from "../components";
import { Instagram, MessageCircle, User as UserIcon } from "lucide-react";

const UserWorkout = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useGetWorkout(String(id));
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="min-h-screen flex flex-col" dir="rtl">
      <div className="flex-grow">
        <UserProfile workout={data} />
        <UserExercises workout={data} />
      </div>

      {/* Footer */}
      <footer className="mt-4">
        <div className="max-w-4xl mx-auto">
          {/* Footer Header */}
          <div className="bg-[#5677BC] px-2 sm:px-3 py-1.5 sm:py-2 rounded-t-lg">
            <div className="flex items-center justify-between">
              <span className="text-white text-xs sm:text-sm font-medium">
                اطلاعات تماس
              </span>
            </div>
          </div>

          {/* Footer Content */}
          <div className="bg-white rounded-b-lg shadow-sm border border-gray-100 p-2 sm:p-3">
            <div className="grid grid-cols-2 gap-2">
              {/* Left Column */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <div className="bg-[#5677BC]/10 p-1 rounded">
                    <UserIcon className="w-4 h-4 text-[#5677BC]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">مربی</p>
                    <p className="text-xs font-medium text-gray-800">
                      علی سادات
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="bg-[#5677BC]/10 p-1 rounded">
                    <Instagram className="w-4 h-4 text-[#5677BC]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">اینستاگرام</p>
                    <p className="text-xs font-medium text-gray-800">
                      mhmd.ali.sadat@
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5">
                  <div className="bg-[#5677BC]/10 p-1 rounded">
                    <MessageCircle className="w-4 h-4 text-[#5677BC]" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">تلگرام</p>
                    <p className="text-xs font-medium text-gray-800">
                      M_A_SADAT@
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default UserWorkout;
