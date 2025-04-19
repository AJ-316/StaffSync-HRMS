import { DepartmentData } from './DepartmentListing';
import jsPDF from 'jspdf';
import { ProfileData } from './ProfileListing';

export default function JobListingPDF({ departments, disabled }: { departments: DepartmentData[], disabled: boolean }) {

  const generateStyledPDF = (departments: DepartmentData[]) => {
    const doc = new jsPDF();
    const margin = 15;
    const contentIndent = margin + 5;
    const lineHeight = 7;
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = margin;

    const wrapText = (text: string, fontStyle: string = "normal", maxWidth = 180) => {
      doc.setFont("helvetica", fontStyle);
      return doc.splitTextToSize(text, maxWidth);
    };

    // fix this
    const measureMarkdownHeight = (text: string) => {
      const lines = text.split("\n");
      let height = 0;

      lines.forEach((line) => {
        let fontStyle = "normal";
        if (line.startsWith("- ")) fontStyle = "normal";
        else if (/\*\*(.*?)\*\*/.test(line)) fontStyle = "bold";
        else if (/\*(.*?)\*/.test(line)) fontStyle = "italic";

        const content = line.replace(/\*+/g, "");
        const wrapped = wrapText(content, fontStyle, 170);
        height += wrapped.length * lineHeight;
      });

      return height + 2;
    };

    const renderMarkdownText = (title: string, text: string) => {
      doc.setFont("helvetica", "bold");
      doc.text(`${title}:`, contentIndent, y);
      y += lineHeight;

      const lines = text.split("\n");

      for (const rawLine of lines) {
        if (y > pageHeight - margin) {
          doc.addPage();
          y = margin;
        }

        if (rawLine.startsWith("- ")) {
          const content = rawLine.slice(2).trim();
          doc.setFont("helvetica", "normal");

          const wrapped = wrapText(content, "normal", 170);
          doc.text("•", contentIndent + 5, y);

          wrapped.forEach((line: string | string[]) => {
            doc.text(line, contentIndent + 10, y);
            y += lineHeight;
          });
        } else if (/\*\*(.*?)\*\*/.test(rawLine)) {
          const content = rawLine.replace(/\*\*(.*?)\*\*/g, "$1");
          doc.setFont("helvetica", "bold");
          const wrapped = wrapText(content, "bold", 170);
          wrapped.forEach((line: string | string[]) => {
            doc.text(line, contentIndent + 10, y);
            y += lineHeight;
          });
        } else if (/\*(.*?)\*/.test(rawLine)) {
          const content = rawLine.replace(/\*(.*?)\*/g, "$1");
          doc.setFont("helvetica", "italic");
          const wrapped = wrapText(content, "italic", 170);
          wrapped.forEach((line: string | string[]) => {
            doc.text(line, contentIndent + 10, y);
            y += lineHeight;
          });
        } else {
          doc.setFont("helvetica", "normal");
          const wrapped = wrapText(rawLine, "normal", 170);
          wrapped.forEach((line: string | string[]) => {
            doc.text(line, contentIndent + 10, y);
            y += lineHeight;
          });
        }
      }

      y += 2;
    };

    const calculateProfileHeight = (profile: ProfileData) => {
      if (!profile) return 0;

      let height = 3 * lineHeight; // experience vacancy
      height += measureMarkdownHeight(profile.jobDescription || "*No description provided.*");
      height += measureMarkdownHeight(profile.responsibilities || "*No description provided.*");
      height += measureMarkdownHeight(profile.requirements || "*No description provided.*");

      return height;
    };


    const text = "Job Listings";
    const pageWidth = doc.internal.pageSize.getWidth();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(text, (pageWidth - doc.getTextWidth(text)) / 2, y);
    y += lineHeight;

    departments.forEach((dept, dIndex) => {
      const deptTitleHeight = lineHeight;
      const firstProfileHeight = calculateProfileHeight(dept.profiles[0]);
      const totalNeeded = deptTitleHeight + firstProfileHeight;

      if (y + totalNeeded > pageHeight - margin) {
        doc.addPage();
        y = margin;
      }

      doc.setFont("helvetica", "bold");
      doc.setFontSize(18);
      doc.text(`${dIndex + 1}) Department: ${dept.name}`, margin, y);
      y += lineHeight;

      doc.setFontSize(12);
      dept.profiles.forEach((profile, pIndex) => {
        const profileHeight = calculateProfileHeight(profile);
        const fitsOnPage = profileHeight < (pageHeight - margin);
        const enoughSpace = y + profileHeight <= pageHeight - margin;

        if (!enoughSpace && fitsOnPage) {
          doc.addPage();
          y = margin;
        }

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text(`(${pIndex + 1}) Profile: ${profile.name}`, contentIndent, y);
        y += lineHeight;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Experience: ${profile.experience}`, contentIndent + 10, y);
        y += lineHeight;
        doc.text(`Vacancy: ${profile.vacancy}`, contentIndent + 10, y);
        y += lineHeight;

        renderMarkdownText("Job Description", profile.jobDescription || "*No description provided.*");
        renderMarkdownText("Responsibilities", profile.responsibilities || "*No description provided.*");
        renderMarkdownText("Requirements", profile.requirements || "*No description provided.*");

        y += 6;
      });

      y += 8;
    });

    doc.save("job-listings-pretty.pdf");
  };


  /*  const getDescriptionMarkdown = (title: string, description: string) => {
     return (
       <div className="mr-10 my-4 prose">
         <Markdown
           components={{
             p: ({ children }) => <p className="mb-2 text-black">{children}</p>,
             ul: ({ children }) => (
               <ul className="text-black [&>li::marker]:text-black">
                 {children}
               </ul>
             ),
             strong: ({ children }) => <strong className="text-black">{children}</strong>,
             li: ({ children }) => <li className="ml-4 text-black">{children}</li>,
           }}
           remarkPlugins={[remarkGfm]}
           rehypePlugins={[rehypeHighlight]}
         >
           {"**" + title + "**:  \n\n" + (description || "*No description provided.*")}
         </Markdown>
       </div>
     )
   } */

  return (
    <div className="p-4">
      <button
        type="button"
        className='btn btn-soft btn-accent'
        onClick={() => generateStyledPDF(departments)}
        disabled={disabled}
      >
        Download PDF
      </button >
      {/* <div ref={contentRef} className="p-6 bg-white rounded shadow-md text-black w-[800px]">
        {departments.map((dept) => (
          <div key={dept.name} className="mb-6 border-b-4 pb-4">
            <h2 className="text-xl mb-2">
              <span className='font-bold'>Department: </span>
              {dept.name || "No Department"}
            </h2>

            {dept.profiles.map((profile) => (
              <div key={profile.name} className="ml-4 mb-4 border-b">

                <h3 className="text-lg">
                  <span className='font-bold'>Profile: </span>
                  {profile.name || "No Profile"}
                </h3>

                <p>Experience: {profile.experience}</p>
                <p>Vacancy: {profile.vacancy}</p>

                {getDescriptionMarkdown("Job Description", profile.jobDescription)}
                {getDescriptionMarkdown("Responsibilities", profile.responsibilities)}
                {getDescriptionMarkdown("Requirements", profile.requirements)}
              </div>
            ))}
          </div>
        ))}
      </div> */}
    </div>
  );
}