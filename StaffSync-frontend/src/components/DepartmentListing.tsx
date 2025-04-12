import { useState } from "react"
import Combobox from "./Combobox";
import Separator from "./Separator";
import ProfileListing from "./ProfileListing";
import { APIKeyValues } from "./FetchResult";

interface DepartmentListingProps {
    onAddDepartment: () => void;
    onCreateDepartment: (newName: string) => void;
    departmentList: APIKeyValues;
}

function DepartmentListing({ onAddDepartment, onCreateDepartment, departmentList }: DepartmentListingProps) {

    const [profiles, setProfiles] = useState(["0"]);
    const [profileList, setProfileList] = useState<APIKeyValues>({
        "1": "PEngineering",
        "2": "PMarketing",
        "3": "PFinance",
        "4": "PHR"
    });
    const [isActive, setIsActive] = useState<boolean>(true)

    const handleAddDepartment = () => {
        setIsActive(false);
        onAddDepartment();
    }

    const onCreateProfile = (newName: string) => {

        // new department id returned from backend
        const id = Object.values(profileList).length + 1;
        console.log("Adding", newName, "to", id)
        setProfileList((prevList) => ({
            ...prevList, [id]: newName,
        }));
    };

    const onAddProfile = () => {
        setProfiles([...profiles, `${profiles.length}`])
    }

    return (
        <div className="m-2">
            <div className="flex items-center">
                <label className="p-2">Department:</label>
                <Combobox options={departmentList} onAddOption={onCreateDepartment} />
            </div>
            <div>
                {profiles.map((prop, key) => 
                    <ProfileListing
                        key={key}
                        onAddProfile={onAddProfile}
                        onCreateProfile={onCreateProfile}
                        profileList={profileList}
                    />
                )}
            </div>
            <Separator classes={"ml-[5%] mr-[5%]"} />
            {isActive && <button className="btn btn-accent btn-soft m-2" onClick={handleAddDepartment}>Add Department</button>}
        </div >
    )
}

export default DepartmentListing
