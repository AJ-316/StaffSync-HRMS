import { allColumns as allEmployeeColumns, getEmployeeById, updateEmployee } from '../../services/employeeService';
import { allColumns as allCandidateColumns, getCandidateById, updateCandidate } from '../../services/candidateService';
import UserDataDisplay from '../../components/UserDataDisplay';

interface UserDataProps {
    userType: string;
}

function PageUserData({ userType }: UserDataProps) {

    const allUserColumns = userType === "employee" ? allEmployeeColumns : allCandidateColumns;
    const apiGetById = userType === "employee" ? getEmployeeById : getCandidateById;
    const apiUpdateData = userType === "employee" ? updateEmployee : updateCandidate;

    return (
        <UserDataDisplay
            userType={userType}
            allUserColumns={allUserColumns}
            apiGetById={apiGetById}
            apiUpdateData={apiUpdateData}
        />
    )
}

export default PageUserData
