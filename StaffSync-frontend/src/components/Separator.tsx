import React from 'react'

interface SeparatorProps {
    classes ?: string;
}

function Separator({classes=""}: SeparatorProps) {
  return (
    <div className={`mt-4 mb-4 text-info-content border-2 decoration-dashed rounded-2xl ${classes}`}/>
  )
}

export default Separator
