import { useState } from 'react'
import DepartmentListing from '../../components/DepartmentListing'
import InnerHead from '../../components/InnerHead'
import Header from '../../components/PageHeader/Header'
import { APIKeyValues } from '../../components/FetchResult';

function PageJobListings() {

    const [departments, setDepartments] = useState(["0"]);
    const [departmentList, setDepartmentList] = useState<APIKeyValues>({
        "1": "Engineering",
        "2": "Marketing",
        "3": "Finance",
        "4": "HR"
    });

    const onCreateDepartment = (newName: string) => {

        // new department id returned from backend
        const id = Object.values(departmentList).length + 1;
        console.log("Adding", newName, "to", id)
        setDepartmentList((prevList) => ({
            ...prevList, [id]: newName,
        }));
    };

    const onAddDepartment = () => {
        setDepartments([...departments, `${departments.length}`])
    }

    return (
        <div className='main-div'>
            <Header />
            <InnerHead
                title={'Job Listing'}
                desc={['Job listing made easy with StaffSync', 'Create job lists and download for use']}
                content={undefined}
            />
            <div className='scroll-content-div p-5 h-full'>
                {departments.map((prop, key) =>
                    <DepartmentListing
                        key={key}
                        onAddDepartment={onAddDepartment}
                        onCreateDepartment={onCreateDepartment}
                        departmentList={departmentList}
                    />
                )}
            </div>
        </div>
    )
}

export default PageJobListings
