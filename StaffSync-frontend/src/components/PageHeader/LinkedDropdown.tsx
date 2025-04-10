import { ChevronDownIcon } from '@heroicons/react/16/solid'
import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom'

type DropdownBtn = {
    name: string;
    link: string;
    classes?: string;
}

type DropdownBox = {
    name: string;
    icon?: ReactNode
    classes?: string;
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
                    <summary className={`btn btn-ghost btn-accent m-5 p-5 flex items-center gap-2 text-xl ${dropdownLink.classes ? dropdownLink.classes : ""}`}>
                        {dropdownLink.icon ? dropdownLink.icon : null}
                        {dropdownLink.name} <ChevronDownIcon className={`w-4 h-4 ${openIndex === index ? 'rotate-180' : ''}`} />
                    </summary>
                    
                    <ul className="menu dropdown-content bg-neutral rounded-box z-1 w-52 p-2 shadow-xl">
                        {dropdownLink.btns.map((btn, btnIndex) => (
                            <li className={`${btn.classes ? btn.classes : ""}`} key={btnIndex}><Link to={btn.link}>{btn.name}</Link></li>
                        ))}
                    </ul>
                </motion.details>
            ))}
        </>
    )
}

export default LinkedDropdown;
