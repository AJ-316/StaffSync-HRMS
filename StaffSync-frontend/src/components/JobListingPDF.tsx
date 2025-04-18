// JobListingPDF.tsx
import html2pdf from 'html2pdf.js';
import { useRef } from 'react';
import { DepartmentData } from './DepartmentListing';

export default function JobListingPDF({ departments }: { departments: DepartmentData[] }) {
  const pdfRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (pdfRef.current) {
      html2pdf()
        .from(pdfRef.current)
        .set({
          margin: 0.5,
          filename: 'job_listing.pdf',
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        })
        .save();
    }
  };

  return (
    <>
      <button onClick={handleDownloadPDF} className="btn btn-primary mb-4">
        Download PDF
      </button>

      {/* Hidden or printable preview */}
      <div ref={pdfRef} className="p-4 bg-white text-black">
        {departments.map((dept) => (
          <div key={dept.name} className="mb-6 border-b pb-4">
            <h2 className="text-xl font-bold mb-2">Department: {dept.name}</h2>
            {dept.profiles.map((profile) => (
              <div key={profile.name} className="ml-4 mb-4">
                <h3 className="text-lg font-semibold">Profile: {profile.name}</h3>
                <p>Experience: {profile.experience}</p>
                <p>Vacancy: {profile.vacancy}</p>

                <div>
                  <h4 className="font-semibold">Job Description:</h4>
                  <div dangerouslySetInnerHTML={{ __html: profile.jobDescription || '' }} />
                </div>
                <div>
                  <h4 className="font-semibold">Responsibilities:</h4>
                  <div dangerouslySetInnerHTML={{ __html: profile.responsibilities || '' }} />
                </div>
                <div>
                  <h4 className="font-semibold">Requirements:</h4>
                  <div dangerouslySetInnerHTML={{ __html: profile.requirements || '' }} />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
