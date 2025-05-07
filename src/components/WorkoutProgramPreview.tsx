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
  onPrint: () => void;
}

const WorkoutProgramPreview = ({
  programName,
  description,
  dayWorkouts,
  getMuscleLabel,
  onBack,
  onPrint,
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
        removeContainer: true, // This helps with potential color issues
      });

      // Calculate dimensions
      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Create PDF
      const pdf = new jsPDF({
        orientation: imgHeight > imgWidth ? "portrait" : "landscape",
        unit: "mm",
      });

      // Add image to PDF
      const imgData = canvas.toDataURL("image/jpeg", 1.0);
      pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);

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
      className="w-full max-w-3xl mx-auto bg-white rounded-lg shadow-sm p-6 print:shadow-none print:p-0"
      style={{ backgroundColor: "#ffffff" }}
    >
      <div ref={contentRef}>
        {/* Header */}
        <div className="text-center mb-6 print:mb-4">
          <h1 className="text-2xl font-bold mb-2" style={{ color: "#4338ca" }}>
            {programName}
          </h1>
          {description && (
            <p className="text-sm mt-1" style={{ color: "#475569" }}>
              {description}
            </p>
          )}
        </div>

        {/* Program Schedule */}
        <div className="space-y-4">
          {dayWorkouts.map((day) => (
            <div
              key={day.id}
              className="border rounded-lg overflow-hidden print:break-inside-avoid"
              style={{ borderColor: "#f1f5f9", backgroundColor: "#ffffff" }}
            >
              {/* Day Header */}
              <div
                className="px-4 py-2 text-white flex justify-between items-center"
                style={{ backgroundColor: "#4f46e5" }}
              >
                <h2 className="text-base font-medium">روز {day.day}</h2>
                <div className="text-sm opacity-90">
                  {day.targetMuscles.map(getMuscleLabel).join(" + ")}
                </div>
              </div>

              {/* Exercises */}
              <div className="p-3">
                {day.targetMuscles.includes("rest") ? (
                  <div
                    className="text-center py-2"
                    style={{ color: "#475569" }}
                  >
                    <p className="text-sm">روز استراحت</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {day.exercises.map((exercise, index) => (
                      <div
                        key={index}
                        className="border-b pb-3 last:pb-0 last:border-0"
                        style={{ borderColor: "#f1f5f9" }}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span
                            className="text-sm font-medium"
                            style={{ color: "#1e293b" }}
                          >
                            {exercise.name}
                          </span>
                          <span
                            className="text-xs px-2 py-0.5 rounded"
                            style={{
                              backgroundColor: "#eef2ff",
                              color: "#4f46e5",
                            }}
                          >
                            {getMuscleLabel(exercise.targetMuscle)}
                          </span>
                        </div>
                        <div
                          className="flex items-center gap-4 text-xs"
                          style={{ color: "#475569" }}
                        >
                          <div className="flex items-center gap-1">
                            <span>ست:</span>
                            <span
                              className="font-medium"
                              style={{ color: "#334155" }}
                            >
                              {exercise.sets}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>تکرار:</span>
                            <span
                              className="font-medium"
                              style={{ color: "#334155" }}
                            >
                              {exercise.reps}
                            </span>
                          </div>
                          {exercise.description && (
                            <div
                              className="flex-1 text-left truncate"
                              style={{ color: "#64748b" }}
                            >
                              {exercise.description}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
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
          <motion.button
            onClick={onPrint}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-1.5 text-sm rounded transition-colors flex items-center gap-1"
            style={{ backgroundColor: "#475569", color: "#ffffff" }}
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
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            چاپ برنامه
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default WorkoutProgramPreview;
