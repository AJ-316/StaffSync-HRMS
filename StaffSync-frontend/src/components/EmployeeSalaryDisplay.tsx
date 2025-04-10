interface EmployeeSalaryProps {
    id: number;
}

function EmployeeSalaryDisplay({id}: EmployeeSalaryProps) {
    return (
        <div>
            Employee Salary = {id}
        </div>
    )
}

export default EmployeeSalaryDisplay
