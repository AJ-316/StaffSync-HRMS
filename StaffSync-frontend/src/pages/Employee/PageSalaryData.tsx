import React, { useEffect, useState } from 'react'
import EmployeeSalaryDisplay from '../../components/EmployeeSalaryDisplay'
import { useLocation } from 'react-router-dom';

function PageSalaryData() {
    const location = useLocation();

    const [id, setId] = useState<number>(-1);

    useEffect(() => {
        const paramId = new URLSearchParams(location.search).get("id");

        if (paramId) {
            setId(parseInt(paramId));
        }

    }, [location.pathname, location.search]);

    return (
        <EmployeeSalaryDisplay
            id={id}
        />
    )
}

export default PageSalaryData
