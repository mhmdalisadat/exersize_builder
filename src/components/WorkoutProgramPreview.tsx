import { motion } from "framer-motion";
import type { DayWorkout } from "../store/workoutStore";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";

interface WorkoutProgramPreviewProps {
  programName: string;
  description: string;
  dayWorkouts: DayWorkout[];
  getMuscleLabel: (value: string) => string;
  onBack: () => void;

  name: string;
  height: string;
  weight: string;
  trainingSystem?: string;
  getTrainingSystemLabel: (system: string) => string;
}

const WorkoutProgramPreview = ({
  programName,
  description,
  dayWorkouts,
  getMuscleLabel,
  onBack,

  name,
  height,
  weight,
  trainingSystem,
  getTrainingSystemLabel,
}: WorkoutProgramPreviewProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    try {
      // Create canvas from the content
      const canvas = await html2canvas(contentRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        removeContainer: true,
      });

      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = 297; // A4 height in mm

      // Create PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      // Add image to PDF with pagination
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      let heightLeft = imgHeight;
      let position = 0;

      while (heightLeft > 0) {
        pdf.addImage(imgData, "JPEG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        if (heightLeft > 0) {
          pdf.addPage();
          position -= pageHeight;
        }
      }

      // Download PDF
      pdf.save(`${programName || "workout-program"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white print:bg-white"
      style={{
        width: "210mm",
        minHeight: "297mm",
        margin: "0 auto",
        padding: "16mm 10mm",
        boxSizing: "border-box",
        borderRadius: "16px",
        boxShadow: "0 4px 24px 0 rgba(60,72,100,0.07)",
      }}
    >
      <div ref={contentRef}>
        {/* User Information */}
        <div className="mb-8 print:mb-6 flex flex-col items-center">
          <div
            className="w-full max-w-xl rounded-2xl shadow p-4 flex flex-wrap justify-between items-center gap-4 border"
            style={{
              background: "#fff",
              borderColor: "#e0e7ef",
              boxShadow: "0 4px 24px 0 rgba(60,72,100,0.07)",
            }}
          >
            {/* Name */}
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center justify-center w-8 h-8 rounded-full"
                style={{ backgroundColor: "#e0e7ff", color: "#3730a3" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </span>
              <span
                style={{
                  color: "#3730a3",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                {name}
              </span>
            </div>
            {/* Height */}
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center justify-center w-8 h-8 rounded-full"
                style={{ backgroundColor: "#dbeafe", color: "#2563eb" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18V6a2 2 0 012-2h8a2 2 0 012 2v12"
                  />
                </svg>
              </span>
              <span
                style={{
                  color: "#2563eb",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                {height}{" "}
                <span style={{ fontWeight: "normal", fontSize: "0.85rem" }}>
                  سانتی‌متر
                </span>
              </span>
            </div>
            {/* Weight */}
            <div className="flex items-center gap-2">
              <span
                className="inline-flex items-center justify-center w-8 h-8 rounded-full"
                style={{ backgroundColor: "#dcfce7", color: "#15803d" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 01-8 0"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v4"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 21h12"
                  />
                </svg>
              </span>
              <span
                style={{
                  color: "#15803d",
                  fontWeight: "bold",
                  fontSize: "1rem",
                }}
              >
                {weight}{" "}
                <span style={{ fontWeight: "normal", fontSize: "0.85rem" }}>
                  کیلوگرم
                </span>
              </span>
            </div>

            {trainingSystem && (
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full"
                  style={{ backgroundColor: "#ede9fe", color: "#7c3aed" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 17v-2a4 4 0 018 0v2"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 7a4 4 0 100 8 4 4 0 000-8z"
                    />
                  </svg>
                </span>
                <span
                  style={{
                    color: "#7c3aed",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                >
                  {getTrainingSystemLabel(trainingSystem)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6 print:mb-4">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#4338ca" }}>
            {programName}
          </h1>
          {description && (
            <>
              <div
                style={{
                  color: "#64748b",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                  marginBottom: 2,
                  textAlign: "right",
                }}
              >
                توضیحات برنامه
              </div>
              <p
                className="text-sm mt-1"
                style={{ color: "#475569", textAlign: "right" }}
              >
                {description}
              </p>
            </>
          )}
        </div>

        {/* Program Schedule */}
        <div style={{ marginTop: "32px" }}>
          {dayWorkouts.map((day) => (
            <div
              key={day.id}
              style={{
                border: "1px solid #e0e7ef",
                borderRadius: "12px",
                marginBottom: "28px",
                background: "#fff",
                overflow: "hidden",
                pageBreakInside: "avoid",
              }}
            >
              <div
                style={{
                  background: "#e6f1fa",
                  color: "#0077B5",
                  padding: "12px 20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                }}
              >
                <span style={{ color: "#0077B5" }}>روز {day.day}</span>
                <span
                  style={{ fontSize: "1rem", opacity: 0.95, color: "#0077B5" }}
                >
                  {day.targetMuscles.map(getMuscleLabel).join(" + ")}
                </span>
              </div>

              <div style={{ padding: "10px 10px" }}>
                {day.targetMuscles.includes("rest") ? (
                  <div
                    style={{
                      color: "#475569",
                      textAlign: "center",
                      fontSize: "0.95rem",
                      padding: "8px 0",
                    }}
                  >
                    <p>روز استراحت</p>
                  </div>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {day.exercises.map((exercise, index) => (
                      <div
                        key={index}
                        style={{
                          borderBottom:
                            index === day.exercises.length - 1
                              ? "none"
                              : "1px solid #e0e7ef",
                          paddingBottom: "7px",
                          marginBottom: "8px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            marginBottom: "6px",
                            gap: "10px",
                          }}
                        >
                          <span
                            style={{
                              color: "#0077B5",
                              fontWeight: 700,
                              fontSize: "1rem",
                              minWidth: "90px",
                              textAlign: "right",
                              flexShrink: 0,
                            }}
                          >
                            {exercise.name}
                          </span>
                          <div
                            style={{
                              flexGrow: 1,
                              borderBottom: "1px solid #cbd5e1",
                              margin: "0 8px",
                            }}
                          />
                          <span
                            style={{
                              color: "#222",
                              fontWeight: 500,
                              fontSize: "0.95rem",
                              minWidth: "90px",
                              textAlign: "left",
                              flexShrink: 0,
                            }}
                          >
                            ست: {exercise.sets} | تکرار: {exercise.reps}
                          </span>
                        </div>
                        {exercise.description && (
                          <span
                            style={{
                              color: "#444",
                              fontSize: "0.92rem",
                              background: "#f8fafc",
                              borderRadius: "8px",
                              padding: "6px 10px",
                              marginTop: "0",
                              marginBottom: "0",
                              width: "100%",
                              textAlign: "right",
                              display: "block",
                            }}
                          >
                            {exercise.description}
                          </span>
                        )}{" "}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-6 print:hidden">
        <div className="flex gap-2">
          <motion.button
            onClick={onBack}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-1.5 text-sm rounded hover:bg-gray-200 transition-colors"
            style={{ backgroundColor: "#f1f5f9", color: "#334155" }}
          >
            بازگشت
          </motion.button>
        </div>
        <div className="flex gap-2">
          <motion.button
            onClick={handleDownloadPDF}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-1.5 text-sm rounded transition-colors flex items-center gap-1"
            style={{ backgroundColor: "#4f46e5", color: "#ffffff" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            دانلود PDF
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkoutProgramPreview;
