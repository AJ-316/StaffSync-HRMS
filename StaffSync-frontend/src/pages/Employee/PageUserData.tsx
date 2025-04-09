import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Header from '../../components/PageHeader/Header';
import { allColumns as allEmployeeColumns, getEmployeeById, updateEmployee } from '../../services/employeeService';
import { allColumns as allCandidateColumns, getCandidateById, updateCandidate } from '../../services/candidateService';
import DynamicForm, { FormValues } from '../../components/DynamicForm';

interface UserDataProps {
    userType: string;
}

function PageUserData({ userType }: UserDataProps) {

    const allUserColumns = userType == "employee" ? allEmployeeColumns : allCandidateColumns;
    const apiGetById = userType == "employee" ? getEmployeeById : getCandidateById;
    const apiUpdateData = userType == "employee" ? updateEmployee : updateCandidate;
    

    const location = useLocation();
    const searchParam = new URLSearchParams(location.search);

    const [id, setId] = useState<number>(-1);
    const [isEditable, setIsEditable] = useState<boolean>(false);

    const onFormSubmit = async (formValues: FormValues) => {
        setIsEditable(false);
        console.log("Sending Update Request:", JSON.stringify(formValues))
        
        await apiUpdateData(formValues);
    }

    useEffect(() => {

        const paramId = searchParam.get("id");
        if (paramId) {
            setId(parseInt(paramId));
        }

    }, []);

    if (id == -1) {
        return (
            <>Invalid Data Id</>
        )
    }

    return (
        <div className="flex flex-col h-screen bg-base-300">
            <Header />
            <div className="w-full flex flex-col">
                <div className="flex justify-between items-center p-4 sticky top-0 z-10">
                    <p className="title ml-20">Employee Data</p>
                    <div className="flex justify-between items-center mb-4">
                        <div className="relative">
                            <button
                                className='btn btn-soft btn-accent'
                                onClick={() => setIsEditable(prev => !prev)}
                            >
                                {isEditable ? "Cancel Edit ❌" : "Edit ✏️"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <DynamicForm
                allColumns={allUserColumns}
                id={id}
                apiGetById={apiGetById}
                onSubmit={onFormSubmit}
                isEditable={isEditable} // Pass isEditable prop
            />
        </div>
    )
}

export default PageUserData
