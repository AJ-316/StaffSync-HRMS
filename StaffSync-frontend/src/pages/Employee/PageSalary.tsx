import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import EmployeeSalaryDisplay from '../../components/EmployeeSalaryDisplay';
import DynamicForm from '../../components/DynamicForm';
import DataTable from '../../components/DataTable';
import { allColumns, getAllSalaries } from '../../services/salaryService';
import Header from '../../components/PageHeader/Header';
import InnerHead from '../../components/InnerHead';
import LinkedDropdown from '../../components/PageHeader/LinkedDropdown';
import { BeakerIcon } from '@heroicons/react/24/outline';

function PageSalary() {
    const location = useLocation();

    const [id, setId] = useState<number>(-1);

    const [selectedColumns, setSelectedColumns] = useState<string[]>(allColumns.map(c => c.accessor));

    useEffect(() => {
        const paramId = new URLSearchParams(location.search).get("id");

        if (paramId) {
            setId(parseInt(paramId));
        }

    }, [location.pathname, location.search]);

    if (id > -1)
        return (
            <EmployeeSalaryDisplay
                id={id}
            />
        );

    return (
        <div className="flex flex-col h-screen bg-base-300">
            <Header />
            <InnerHead
                title="Employee Salaries"
                desc={["Manage employee salaries.", "Instantly download salary csv and notify employees through email"]}

                content={<div className='ml-10 mr-auto'>
                    <LinkedDropdown dropdownLinks={[
                        {
                            name: "Operations",
                            icon: <BeakerIcon className='w-6 h-6' />,
                            classes: "btn-soft",
                            btns: [
                                {
                                    name: "Download CSV",
                                    link: ``
                                },
                                {
                                    name: "Generate Salaries",
                                    link: ``
                                }
                            ]
                        }
                    ]} />
                    
                </div>}
            />
            <DataTable
                navigationHolder='employee/salary'
                allColumns={allColumns}
                selectedColumns={selectedColumns}
                apiGetAll={getAllSalaries}
            />
        </div>
    );
}

export default PageSalary
