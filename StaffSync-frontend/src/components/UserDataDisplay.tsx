import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import DynamicForm, { APIKeyValues } from './DynamicForm';
import Header from './PageHeader/Header';
import { Column } from './DataTable';
import { AxiosResponse } from 'axios';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import LinkedDropdown from './PageHeader/LinkedDropdown';
import { BeakerIcon } from '@heroicons/react/24/outline';

interface UserDataProps {
    userType: string;
    allUserColumns: Column[]
    apiGetById: (id: number) => (Promise<AxiosResponse<unknown, unknown>>);
    apiUpdateData: (user: unknown) => (Promise<AxiosResponse<unknown, unknown>>);
}

function UserDataDisplay({ userType, allUserColumns, apiGetById, apiUpdateData }: UserDataProps) {

    const location = useLocation();
    const searchParam = new URLSearchParams(location.search);

    const [id, setId] = useState<number>(-1);

    const onFormSubmit = async (formValues: APIKeyValues) => {
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
            <div className='flex justify-center items-center h-screen'>
                <div className='font-["Poiret_One"] flex flex-row justify-center items-center text-error text-5xl'>
                    <ExclamationCircleIcon className='w-10 h-10 m-2' /> Invalid Data Id: {id}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col h-screen bg-base-300">
            <Header />
            <div className="w-full flex flex-col">
                <div className="flex justify-between items-center p-2 sticky top-0 z-10">
                    <p className="title ml-20 pt-4">{`${userType.charAt(0).toUpperCase() + userType.slice(1)}`} Data</p>
                    {userType === "employee" &&
                        <div className='ml-10 mt-4 mr-auto'>
                            <LinkedDropdown dropdownLinks={[
                                {
                                    name: "Operations",
                                    icon: <BeakerIcon className='w-6 h-6' />,
                                    classes: "btn-soft",
                                    btns: [
                                        {
                                            name: "View Salary",
                                            link: `/employee/salary?id=${id}`
                                        }
                                    ]
                                }
                            ]} />
                        </div>
                    }
                </div>
            </div>
            <DynamicForm
                allColumns={allUserColumns}
                id={id}
                apiGetById={apiGetById}
                onSubmit={onFormSubmit}
            />
        </div>
    )
}

export default UserDataDisplay
