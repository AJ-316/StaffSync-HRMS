import { motion } from 'framer-motion'
import LinkedDropdown from './LinkedDropdown'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <motion.header
            className='ticky w-full h-[100px] flex justify-between items-center bg-base-100 z-50'
            initial={{ y: -50 }}
            animate={{ y: 0 }}
        >
            <div className='ml-10 '>
                <LinkedDropdown dropdownLinks={[
                    {
                        name: "Recruitment",
                        btns: [
                            {
                                name: "Job Listings",
                                link: "/recruitment/job-listings"
                            },
                            {
                                name: "Candidate Pools",
                                link: "/recruitment/candidate-pools"
                            },
                            {
                                name: "Candidate Joinings",
                                link: "/recruitment/candidate-joinings"
                            }
                        ]
                    },
                    {
                        name: "Employee",
                        btns: [
                            {
                                name: "Database",
                                link: "/employee/database"
                            },
                            {
                                name: "Attendance",
                                link: "/employee/attendance"
                            },
                            {
                                name: "Performance",
                                link: "/employee/performance"
                            },
                            {
                                name: "Salary",
                                link: "/employee/salary"
                            }
                        ]
                    },
                    {
                        name: "Engagement",
                        btns: [
                            {
                                name: "Meetings",
                                link: "/engagement/meetings"
                            },
                            {
                                name: "Trainings",
                                link: "/engagement/trainings"
                            },
                            {
                                name: "Events",
                                link: "/engagement/events"
                            }
                        ]
                    }
                ]} />
            </div>
            <p className='title-small mr-10 hover:scale-110 hover:underline hover:text-accent transition-all'><Link to={'/'}>StaffSync</Link></p>
        </motion.header>
    )
}

export default Header
