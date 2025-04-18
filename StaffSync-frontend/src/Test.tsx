import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Test = () => {

  const generatePDF = () => {
    const input = document.getElementById("pdf-content");
    if(!input) return;
  
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      //.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("download.pdf");
      alert("saved");
    });
  };

  const generate = () => {
    const pdf = new jsPDF("p", "mm", "a4");
    pdf.save("download.pdf");
  };

  return (
    <div>
      <div id="pdf-content" className="p-4 bg-white">
        <h1>My Content to Print</h1>
        <p>This will be saved as a PDF!</p>
      </div>

      <button onClick={generate} className="btn btn-primary mt-4">Download PDF</button>
    </div>
  )
}

export default Test;