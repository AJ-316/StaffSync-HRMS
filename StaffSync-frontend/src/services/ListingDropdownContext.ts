import { createContext } from "react";
import { APIKeyValues } from "./apiService";
import { ProfileData } from "../components/ProfileListing";

export type GroupedProfiles = {
    [departmentId: string]: APIKeyValues;
}

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