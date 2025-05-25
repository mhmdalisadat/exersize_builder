import { motion } from "framer-motion";
import { useRef } from "react";
// @ts-expect-error: No types for html2pdf.js
import html2pdf from "html2pdf.js";
import type { DayWorkout } from "../../store/workoutStore";
import UserInfo from "./components/UserInfo";
import WorkoutDay from "./components/WorkoutDay";

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
  purpose: string;
  getPurposeLabel: (purpose: string) => string;
  userImage?: string;
}

const WorkoutPerview = ({
  description,
  dayWorkouts,
  getMuscleLabel,
  onBack,
  name,
  height,
  weight,
  trainingSystem,
  getTrainingSystemLabel,
  purpose,
  getPurposeLabel,
  userImage,
}: WorkoutProgramPreviewProps) => {
  const previewRef = useRef<HTMLDivElement>(null);

  const convertColors = () => {
    const elements = document.querySelectorAll("*");
    elements.forEach((el) => {
      const style = window.getComputedStyle(el);
      if (style.color.includes("oklch")) {
        (el as HTMLElement).style.color = "rgb(0, 0, 0)";
      }
      if (style.backgroundColor.includes("oklch")) {
        (el as HTMLElement).style.backgroundColor = "rgb(255, 255, 255)";
      }
    });
  };

  const handleGeneratePDF = async () => {
    try {
      console.log("شروع تولید PDF");
      convertColors();

      const element = previewRef.current;
      if (!element) {
        throw new Error("عنصر پیش‌نمایش یافت نشد");
      }

      // اضافه کردن کلاس مخصوص PDF
      element.classList.add("pdf-export");

      await html2pdf()
        .set({
          margin: [10, 10, 10, 10],
          filename: "workout-plan.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
          pagebreak: { mode: ["css", "legacy"] },
        })
        .from(element)
        .save();

      // حذف کلاس بعد از تولید PDF
      element.classList.remove("pdf-export");
      console.log("PDF با موفقیت تولید شد");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : "خطای ناشناخته";
      console.error(`خطا در تولید PDF: ${errorMessage}`);
    }
  };

  return (
    <motion.div
      dir="rtl"
      style={{ direction: "rtl" }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full min-h-screen flex flex-col items-center bg-white print:bg-white px-2 sm:px-0"
    >
      <div className="sm:hidden text-center text-xs text-slate-500 mb-2">
        برای مشاهده کامل پیش‌نمایش، به چپ و راست اسکرول کنید
      </div>

      <div ref={previewRef} className="w-full max-w-4xl px-4 sm:px-6 mb-8">
        {/* Force RTL direction for PDF and screen */}
        <style>{`
          [data-rtl-pdf] {
            direction: rtl !important;
            text-align: right !important;
          }
        `}</style>
        <div data-rtl-pdf>
          {/* User Information */}
          <UserInfo
            name={name}
            description={description}
            userImage={userImage}
            height={height}
            weight={weight}
            trainingSystem={trainingSystem}
            getTrainingSystemLabel={getTrainingSystemLabel}
            purpose={purpose}
            getPurposeLabel={getPurposeLabel}
          />

          {/* Program Schedule */}
          <div className="space-y-4 sm:space-y-6">
            {dayWorkouts.map((day) => (
              <WorkoutDay
                key={day.id}
                day={day}
                getMuscleLabel={getMuscleLabel}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between w-full max-w-xl mt-6 gap-2 print:hidden">
        <motion.button
          onClick={onBack}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-1.5 text-sm rounded hover:bg-gray-200 transition-colors"
          style={{ backgroundColor: "#f1f5f9", color: "#334155" }}
        >
          بازگشت
        </motion.button>
        <motion.button
          onClick={handleGeneratePDF}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            backgroundColor: "rgb(86, 119, 188)",
            color: "rgb(255, 255, 255)",
          }}
          className="px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
        >
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
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
          دانلود PDF
        </motion.button>
      </div>
    </motion.div>
  );
};

export default WorkoutPerview;
