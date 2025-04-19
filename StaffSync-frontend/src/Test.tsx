import React, { useRef } from "react";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";

const Test = () => {
  const contentRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!contentRef.current) return;

    const canvas = await html2canvas(contentRef.current, {
      useCORS: true,
      scale: 2, // High-quality output
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("download.pdf");
  };

  return (
    <div className="p-4">
      <div ref={contentRef} className="p-6 bg-white rounded shadow-md text-black w-[800px]">
        <h2 className="text-2xl font-bold">PDF Content</h2>
        <p>This content will be exported to PDF using `html2canvas-pro` and `jsPDF`.</p>
      </div>

      <button onClick={generatePDF} className="mt-4 btn btn-accent btn-soft">
        Download PDF
      </button>
    </div>
  );
};

export default Test;
