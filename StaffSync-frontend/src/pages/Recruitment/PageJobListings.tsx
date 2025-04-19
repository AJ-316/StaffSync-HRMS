import { set } from 'lodash';
import { createContext, useEffect, useState } from 'react';
import DepartmentListing, { DepartmentData } from '../../components/DepartmentListing';
import InnerHead from '../../components/InnerHead';
import Header from '../../components/PageHeader/Header';
import Separator from '../../components/Separator';
import { APIKeyValues, departmentService, getNestedValue, isArrayOfAPIKeyValues, profileService, useFetchData } from '../../services/apiService';
import { v7 as uuid } from 'uuid';
import JobListingPDF from '../../components/JobListingPDF';
import { ProfileData } from '../../components/ProfileListing';

export const ListingDropdownContext = createContext<{
    departmentList: APIKeyValues;
    profileList: GroupedProfiles;
    onCreateDepartment: (newName: string) => void;
    onCreateProfile: (departmentKey: string, newName: string) => void;
    onAddProfile: (departmentKey: string) => void;
    onUpdateProfile: (departmentKey: string, newProfile: ProfileData) => void;
    onRemoveProfile: (departmentKey: string, profileKey: string) => void;
    onRemoveDepartment: (departmentKey: string) => void;
    onSelectDepartment: (departmentKey: string, optionKey: string | null, optionValue: string) => void;
    onSelectProfile: (departmentKey: string, profileKey: string, optionKey: string | null, optionValue: string) => void;
}>({
    departmentList: {},
    profileList: {},
    onCreateDepartment: () => { },
    onCreateProfile: () => { },
    onAddProfile: () => { },
    onUpdateProfile: () => { },
    onRemoveProfile: () => { },
    onRemoveDepartment: () => { },
    onSelectDepartment: () => { },
    onSelectProfile: () => { }
});

type GroupedProfiles = {
    [departmentId: string]: APIKeyValues;
}

function PageJobListings() {

    const { dataList: profileDataList, refetch: refetchProfileDataList/* , loading, error, updateField */ } = useFetchData({ isList: true, apiFn: profileService.getAll })
    const { dataList: departmentDataList, refetch: refetchDepartmentDataList } = useFetchData({ isList: true, apiFn: departmentService.getAll })

    const [departments, setDepartments] = useState<DepartmentData[]>([]);

    const [departmentList, setDepartmentList] = useState<APIKeyValues>({});
    const [profileList, setProfileList] = useState<GroupedProfiles>({});

    useEffect(() => {
        if (!isArrayOfAPIKeyValues(profileDataList) || !isArrayOfAPIKeyValues(departmentDataList)) return;
        const newDepartmentList: APIKeyValues = {};
        const newProfileList: GroupedProfiles = {};

        profileDataList.forEach((profile) => {
            const deptId = getNestedValue(profile, "departmentDto.id");
            const profileId = getNestedValue(profile, "id");
            const profileName = getNestedValue(profile, "name");

            // add profile to group of its department
            if (!newProfileList[deptId]) newProfileList[deptId] = {};
            newProfileList[deptId][profileId] = profileName;
        });

        departmentDataList.forEach((department) => {
            set(newDepartmentList, department.id, department.name);
        })

        setDepartmentList(newDepartmentList);
        setProfileList(newProfileList)

    }, [profileDataList, departmentDataList])

    const onCreateDepartment = async (newName: string) => {
        //adding new department to backend + frontend
        //add department to backend; fetch its id set it to new departmentData

        const response = await departmentService.add({
            "id": null,
            "name": newName,
        });

        if (response.data.success) refetchDepartmentDataList();
        else console.error("Could not add department", newName);
    };

    const onSelectDepartment = (departmentKey: string, optionKey: string | null, optionValue: string) => {
        //selecting the department
        setDepartments(prev => prev.map((department) =>
            department.key === departmentKey
                ? (optionKey ? { ...department, id: optionKey, name: optionValue }
                    : { ...department, id: "null", name: "" }) : department
        ))
    };

    const onSelectProfile = (departmentKey: string, profileKey: string, optionKey: string | null, optionValue: string) => {
        //selecting the department
        setDepartments(prev => prev.map((department) =>
            department.key !== departmentKey
                ? department : {
                    ...department,
                    profiles: department.profiles.map((profile) => {
                        return profile.key !== profileKey ? profile :
                            (optionKey ? { ...profile, key: profile.key, id: optionKey, name: optionValue }
                                : { ...profile, key: profile.key, id: "null", name: "" })
                    })
                }
        ))
    };

    const onUpdateProfile = (departmentKey: string, newProfile: ProfileData) => {
        const newDepartments = departments.map((department) => {
            if(department.key === departmentKey) {
                return {...department, profiles: department.profiles.map((profile) => {
                    if(profile.key === newProfile.key) {
                        return newProfile;
                    }
                    return profile;
                })}
            }
            return department;
        })
        setDepartments(newDepartments);
    }

    const onAddDepartment = () => {
        // adding an empty dropdown
        setDepartments([...departments, {
            key: uuid(),
            id: "null",
            name: "",
            profiles: []
        }])
    }

    const onRemoveDepartment = (departmentKey: string) => {
        // adding an empty dropdown
        setDepartments(prev => prev.filter(department => department.key !== departmentKey))
    }

    const onRemoveProfile = (departmentKey: string, profileKey: string) => {
        setDepartments(prev =>
            prev.map(department => {
                if (department.key !== departmentKey) return department;

                return {
                    ...department,
                    profiles: department.profiles.filter(profile => profile.key !== profileKey)
                };
            })
        );
    };


    const onCreateProfile = async (departmentId: string, newName: string) => {
        //adding new profile to coressponding department + backend + frontend
        //add profile(deptartmentId) to backend; fetch its id set it to new departmentData

        const response = await profileService.add({
            "id": null,
            "name": newName,
            "departmentDto": {
                "id": departmentId,
                "name": departmentList[departmentId]
            }
        });

        if (response.data.success) refetchProfileDataList();
        else console.error("Could not add profile", newName, "for department", departmentList[departmentId]);
    };

    const onAddProfile = (departmentKey: string) => {
        // adding an empty dropdown
        setDepartments(prev => prev.map((deparment) => {
            if (deparment.key === departmentKey) {
                return {
                    ...deparment, profiles: [...deparment.profiles, {
                        key: uuid(),
                        id: "null",
                        name: "", //profileList[departmentId]?.[Object.keys(profileList[departmentId])[0]] || ""
                        vacancy: "0",
                        experience: "0+ years",
                        jobDescription: "",
                        responsibilities: "",
                        requirements: "",
                    }]
                }
            }
            return deparment;
        }))
    }

    const onSubmit = () => {
        console.log("departments", departments);
        console.log("departmentList", departmentList);
        console.log("profileList", profileList);
    }

    return (
        <div className='main-div'>
            <Header />
            <InnerHead
                title={'Job Listing'}
                desc={['Job listing made easy with StaffSync', 'Create job lists and download for use']}
                content={<JobListingPDF departments={departments} disabled={departments.length === 0} />}
            />
            <form className='scroll-content-div p-5 h-full'>
                <ListingDropdownContext.Provider value={{
                    departmentList, profileList, onRemoveProfile, onUpdateProfile,
                    onCreateDepartment, onCreateProfile,
                    onAddProfile, onSelectDepartment,
                    onSelectProfile, onRemoveDepartment
                }}>
                    {departments.map((prop, key) =>
                        <div key={key}>
                            <DepartmentListing
                                departmentData={prop}
                            /* onCreateDepartment={onCreateDepartment} */
                            />
                            <Separator classes={"ml-[5%] mr-[5%]"} />
                        </div>
                    )}
                </ListingDropdownContext.Provider>
                <button
                    type="button"
                    className="btn btn-accent btn-soft m-2 block w-full"
                    onClick={onAddDepartment}
                >
                    Add Department
                </button>
                {/* <button
                    type="submit"
                    className="btn btn-accent btn-soft m-2 block w-full"
                    onClick={(e) => { e.preventDefault(); onSubmit(); }}
                    disabled={departments.length === 0}
                >
                    Submit
                </button> */}
            </form>
        </div>
    )
}

export default PageJobListings