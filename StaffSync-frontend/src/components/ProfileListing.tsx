import { useState } from "react";
import Combobox from "./Combobox"
import { APIKeyValues } from "./FetchResult";

interface ProfileListingProps {
    onAddProfile: () => void;
    onCreateProfile: (newName: string) => void;
    profileList: APIKeyValues;
}

function ProfileListing({onAddProfile, onCreateProfile, profileList}: ProfileListingProps) {
    const [isActive, setIsActive] = useState<boolean>(true);

    const handleAddProfile = () => {
        setIsActive(false);
        onAddProfile();
    }

    return (
        <div className="border-t-1 border-b-1 border-info-content rounded-xl m-2">
            <div className="flex items-center">
                <label className="p-2">Profile:</label>
                <Combobox options={profileList} onAddOption={onCreateProfile} />
            </div>
            {isActive && <button className="btn btn-accent btn-soft m-2" onClick={handleAddProfile}>Add Profile</button>}
        </div >
    )
}

export default ProfileListing
