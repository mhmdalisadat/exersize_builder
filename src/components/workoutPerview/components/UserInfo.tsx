import { motion } from "framer-motion";
import "./UserInfo.css";

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
      className="userinfo-root"
    >
      <div className="userinfo-container">
        {/* Header with solid background */}
        <div className="userinfo-header">
          <h2 className="userinfo-title">مشخصات</h2>
        </div>

        <div style={{ direction: "rtl" }} className="userinfo-content">
          <div className="userinfo-main-row">
            {/* User Image Section */}
            <div className="userinfo-image-section">
              <div className="userinfo-image-wrapper">
                <div className="userinfo-image-border">
                  {userImage ? (
                    <img
                      src={userImage}
                      alt={name}
                      className="userinfo-image"
                    />
                  ) : (
                    <div className="userinfo-image-placeholder">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="userinfo-image-icon"
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
                <div className="userinfo-image-name">{name}</div>
              </div>
            </div>

            {/* User Details Section */}
            <div className="userinfo-details-section">
              <div className="userinfo-details-grid">
                <InfoCard
                  title="اطلاعات شخصی"
                  items={[
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="userinfo-icon"
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
                      color: "rgb(86, 119, 188)",
                    },
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="userinfo-icon"
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
                      color: "rgb(86, 119, 188)",
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
                          className="userinfo-icon"
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
                      color: "rgb(86, 119, 188)",
                    },
                    {
                      icon: (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="userinfo-icon"
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
                      color: "rgb(86, 119, 188)",
                    },
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Description Section */}
          {description && (
            <div style={{ direction: "rtl" }} className="userinfo-description-section">
              <div className="userinfo-description-box">
                <div className="userinfo-description-header">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="userinfo-description-icon"
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
                  <h3 className="userinfo-description-title ">توضیحات</h3>
                </div>
                <p className="userinfo-description-text text-right">{description}</p>
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
  <div className="userinfo-infocard">
    <h3 className="userinfo-infocard-title">{title}</h3>
    <div className="userinfo-infocard-items">
      {items.map((item, index) => (
        <div key={index} className="userinfo-infocard-item">
          <span className="userinfo-infocard-icon">{item.icon}</span>
          <div className="userinfo-infocard-labels">
            <div className="userinfo-infocard-label">{item.label}</div>
            <div
              className="userinfo-infocard-value"
              style={{ color: item.color }}
            >
              {item.value}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default UserInfo;
