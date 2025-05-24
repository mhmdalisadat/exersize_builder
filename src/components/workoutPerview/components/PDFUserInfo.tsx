import React from "react";

interface PDFUserInfoProps {
  programName: string;
  description?: string;
  name: string;
  height: string;
  weight: string;
  trainingSystem?: string;
  getTrainingSystemLabel: (system: string) => string;
  purpose: string;
  getPurposeLabel: (purpose: string) => string;
  userImage?: string;
}

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}

const InfoItem = ({ icon, label, value, color }: InfoItemProps) => (
  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
    <span
      style={{
        padding: "8px",
        borderRadius: "8px",
        background: `${color}10`,
        color: color,
      }}
    >
      {icon}
    </span>
    <div style={{ flexGrow: 1 }}>
      <div
        style={{
          fontSize: "12px",
          color: "#6b7280",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: "14px",
          fontWeight: "500",
          color: color,
        }}
      >
        {value}
      </div>
    </div>
  </div>
);

const PDFUserInfo = ({
  programName,
  description,
  name,
  height,
  weight,
  trainingSystem,
  getTrainingSystemLabel,
  purpose,
  getPurposeLabel,
  userImage,
}: PDFUserInfoProps) => (
  <div
    style={{
      marginBottom: "32px",
      background: "linear-gradient(to-br, #eef2ff, #ffffff)",
      borderRadius: "16px",
      overflow: "hidden",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
      border: "1px solid #e0e7ff",
    }}
  >
    {/* Header with gradient background */}
    <div
      style={{
        padding: "16px",
        textAlign: "center",
        background: "linear-gradient(to-r, #4f46e5, #3b82f6)",
        color: "white",
      }}
    >
      <h1
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          margin: 0,
          color: "white",
        }}
      >
        {programName}
      </h1>
    </div>

    <div style={{ padding: "24px" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "24px",
        }}
      >
        {/* User Image and Info Section */}
        <div
          style={{
            display: "flex",
            gap: "24px",
            alignItems: "flex-start",
          }}
        >
          {/* User Image */}
          <div style={{ flexShrink: 0 }}>
            <div
              style={{
                position: "relative",
                width: "128px",
                height: "128px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "4px solid white",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                }}
              >
                {userImage ? (
                  <img
                    src={userImage}
                    alt={name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "#eef2ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#818cf8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "-8px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#4f46e5",
                  color: "white",
                  padding: "4px 12px",
                  borderRadius: "9999px",
                  fontSize: "12px",
                  fontWeight: "500",
                }}
              >
                {name}
              </div>
            </div>
          </div>

          {/* User Details */}
          <div style={{ flexGrow: 1 }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
              }}
            >
              {/* Personal Info Card */}
              <div
                style={{
                  background: "white",
                  borderRadius: "12px",
                  padding: "16px",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                  border: "1px solid #f3f4f6",
                }}
              >
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#4b5563",
                    marginBottom: "12px",
                  }}
                >
                  اطلاعات شخصی
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <InfoItem
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    }
                    label="قد"
                    value={`${height} سانتی‌متر`}
                    color="#2563eb"
                  />
                  <InfoItem
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                      </svg>
                    }
                    label="وزن"
                    value={`${weight} کیلوگرم`}
                    color="#16a34a"
                  />
                </div>
              </div>

              {/* Training Info Card */}
              <div
                style={{
                  background: "white",
                  borderRadius: "12px",
                  padding: "16px",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                  border: "1px solid #f3f4f6",
                }}
              >
                <h3
                  style={{
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#4b5563",
                    marginBottom: "12px",
                  }}
                >
                  اطلاعات تمرین
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <InfoItem
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    }
                    label="سیستم تمرینی"
                    value={
                      trainingSystem
                        ? getTrainingSystemLabel(trainingSystem)
                        : "-"
                    }
                    color="#9333ea"
                  />
                  <InfoItem
                    icon={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    }
                    label="هدف"
                    value={getPurposeLabel(purpose)}
                    color="#d97706"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Section */}
        {description && (
          <div
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "16px",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
              border: "1px solid #f3f4f6",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#4f46e5"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              <h3
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#4b5563",
                  margin: 0,
                }}
              >
                توضیحات
              </h3>
            </div>
            <p
              style={{
                color: "#374151",
                fontSize: "14px",
                lineHeight: "1.6",
                margin: 0,
                whiteSpace: "pre-line",
              }}
            >
              {description}
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
);

export default PDFUserInfo;
