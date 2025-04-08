import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom'

type DropdownBtn = {
    name: string;
    link: string;
}

type DropdownBox = {
    name: string;
    btns: DropdownBtn[];
}

interface LinkedDropdownProps {
    dropdownLinks: DropdownBox[];
}

function LinkedDropdown({ dropdownLinks }: LinkedDropdownProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(prevIndex => (prevIndex === index ? null : index));
    };

    return (
        <>
            {dropdownLinks.map((dropdownLink, index) => (
                <motion.details
                    key={index}
                    className="dropdown"
                    open={openIndex === index}
                    onMouseEnter={(e) => { e.preventDefault(); handleToggle(index); }}
                    onMouseLeave={() => handleToggle(-1)}
                    whileHover={{scale:1.1}}
                >
                    <summary className="btn btn-ghost btn-accent m-5 p-5 flex items-center gap-2 text-xl">
                        {dropdownLink.name} <ChevronDownIcon className={`w-4 h-4 ${openIndex === index ? 'rotate-180' : ''}`} />
                    </summary>

                    <ul className="menu dropdown-content bg-neutral rounded-box z-1 w-52 p-2 shadow-xl">
                        {dropdownLink.btns.map((btn, btnIndex) => (
                            <li key={btnIndex}><Link to={btn.link}>{btn.name}</Link></li>
                        ))}
                    </ul>
                </motion.details>
            ))}
        </>
    )
}

export default LinkedDropdown;
