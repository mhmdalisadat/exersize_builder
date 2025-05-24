import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import WorkoutProgramPDFContent from "../WorkoutPerviewPdf";
import type { DayWorkout } from "../../../store/workoutStore";

interface PDFGeneratorProps {
  programName: string;
  description: string;
  dayWorkouts: DayWorkout[];
  getMuscleLabel: (value: string) => string;
  name: string;
  height: string;
  weight: string;
  trainingSystem?: string;
  getTrainingSystemLabel: (system: string) => string;
  purpose: string;
  getPurposeLabel: (purpose: string) => string;
  userImage?: string;
}

const PDFGenerator = ({
  programName,
  description,
  dayWorkouts,
  getMuscleLabel,
  name,
  height,
  weight,
  trainingSystem,
  getTrainingSystemLabel,
  purpose,
  getPurposeLabel,
  userImage,
}: PDFGeneratorProps) => {
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  const handleDownloadPDF = async () => {
    if (!pdfRef.current) return;

    try {
      setIsGeneratingPDF(true);
      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(pdfRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        removeContainer: true,
      });

      const imgWidth = 210; // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const pageHeight = 297; // A4 height in mm
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
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

      pdf.save(`${programName || "workout-program"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <>
      <div
        style={{
          position: isGeneratingPDF ? "relative" : "absolute",
          left: isGeneratingPDF ? "0" : "-9999px",
          top: isGeneratingPDF ? "0" : "-9999px",
          visibility: isGeneratingPDF ? "visible" : "hidden",
          width: "210mm",
          overflow: "hidden",
        }}
      >
        <WorkoutProgramPDFContent
          ref={pdfRef}
          programName={programName}
          description={description}
          dayWorkouts={dayWorkouts}
          getMuscleLabel={getMuscleLabel}
          name={name}
          height={height}
          weight={weight}
          trainingSystem={trainingSystem}
          getTrainingSystemLabel={getTrainingSystemLabel}
          purpose={purpose}
          getPurposeLabel={getPurposeLabel}
          userImage={userImage}
        />
      </div>
      <button
        onClick={handleDownloadPDF}
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
      </button>
    </>
  );
};

export default PDFGenerator;
