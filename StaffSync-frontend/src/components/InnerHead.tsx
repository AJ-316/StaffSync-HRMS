import React, { ReactNode } from 'react'

interface InnerHeadProps {
  title: string;
  desc: string[];
  content: ReactNode;
}

function InnerHead({ title, desc, content }: InnerHeadProps) {
  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between items-center sticky top-0 z-10 m-5">
        <p className="title ml-20">{title}</p>
        <p className="ml-10 mr-auto title-p-small text-left">
          {desc.map((line, index) => (
            <React.Fragment key={index}>{line}<br /></React.Fragment>
          ))}
        </p>
        {content}
      </div>
    </div>
  )
}

export default InnerHead
