import UserDataDisplay from '../../components/UserDataDisplay';
import { candidateService, columnConfig, employeeService } from '../../services/apiService';

interface UserDataProps {
    userType: string;
}

function PageUserData({ userType }: UserDataProps) {

    const allUserColumns = userType === "employee" ? columnConfig.employee : columnConfig.candidate;
    const apiGetById = userType === "employee" ? employeeService.getById : candidateService.getById;
    const apiUpdateData = userType === "employee" ? employeeService.update : candidateService.update;

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
