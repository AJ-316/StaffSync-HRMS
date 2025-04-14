import { useContext } from "react";
import { ListingDropdownContext } from "../pages/Recruitment/PageJobListings";
import Combobox from "./Combobox";
import ProfileListing, { ProfileData } from "./ProfileListing";
import { XMarkIcon } from "@heroicons/react/24/outline";

export type DepartmentData = {
    key: string;
    id: string;
    name: string;
    profiles: ProfileData[];
};

interface DepartmentListingProps {
    departmentData: DepartmentData;
}

function DepartmentListing({ departmentData }: DepartmentListingProps) {

    const { departmentList, onAddProfile, onRemoveDepartment, onCreateDepartment, onSelectDepartment } = useContext(ListingDropdownContext);

    return (
        <div className="m-2">
            <div className="flex items-center">
                <button
                    title="Remove Department"
                    type="button"
                    className="btn btn-error btn-soft btn-square m-2"
                    onClick={() => onRemoveDepartment(departmentData.key)}
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>
                <Combobox
                    dropDownTitle="Department:"
                    options={departmentList}
                    emptyOptionsErrorText={"Add Departments..."}
                    onAddOption={onCreateDepartment}
                    onSelectOption={(k, v) => onSelectDepartment(departmentData.key, k, v)}
                />
                <button
                    type="button"
                    className="btn btn-accent btn-soft m-2 mr-auto"
                    onClick={() => onAddProfile(departmentData.key)}
                >
                    Add Profile
                </button>
            </div>
            <div>
                {departmentData.profiles.map((prop, key) =>
                    <ProfileListing
                        key={key}
                        departmentId={departmentData.id}
                        departmentKey={departmentData.key}
                        profileData={prop}
                    />
                )}
            </div>
        </div >
    )
}

export default DepartmentListing
