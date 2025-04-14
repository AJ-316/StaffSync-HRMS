import { useContext, useState } from "react";
import Combobox, { ComboboxValues } from "./Combobox";
import { ListingDropdownContext } from "../pages/Recruitment/PageJobListings";
import { XMarkIcon } from "@heroicons/react/24/outline";
import NestedInput from "./NestedInput";
import MultiMarkdownCard from "./MultiMarkdownCard";

export type ProfileData = {
    key: string;
    id: string;
    name: string;
};

interface ProfileListingProps {
    departmentId: string;
    departmentKey: string;
    profileData: ProfileData;
}

function ProfileListing({ departmentId, departmentKey, profileData }: ProfileListingProps) {

    const { profileList, onCreateProfile, onRemoveProfile, onSelectProfile } = useContext(ListingDropdownContext);
    const vacanciesOptions: ComboboxValues = Object.fromEntries(
        Array.from({ length: 10 }, (_, i) => [i, (i + 1).toString()])
    );

    const [selectedMarkdownCard, setSelectedMarkdownCard] = useState("Job Description");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        setSelectedMarkdownCard(e.target.value);
    };

    return (
        <div className="flex items-center border-t-1 border-b-1 border-info-content rounded-xl m-2 mt-6 p-2">
            <button
                type="button"
                title="Remove Profile"
                className="btn btn-error btn-soft btn-square m-2"
                onClick={() => onRemoveProfile(departmentKey, profileData.key)}
            >
                <XMarkIcon className="w-6 h-6" />
            </button>
            <div className="flex flex-col justify-start items-start">
                <Combobox
                    dropDownTitle="Profile:"
                    options={profileList[departmentId] || {}}
                    onAddOption={(newOption) => onCreateProfile(departmentKey, newOption)}
                    onSelectOption={(k, v) => onSelectProfile(departmentKey, profileData.key, k, v)}
                    emptyOptionsErrorText={"No Profiles Available"}
                />
                <NestedInput
                    name="Experience: "
                    unit="yrs"
                    inputs={[{ placeholder: "0", inputValue: "0", separator: "-" }, { placeholder: "+", inputValue: "+" }]}
                />
                <Combobox
                    dropDownTitle="Vacancy:"
                    placeholder="Set..."
                    options={vacanciesOptions}
                    onAddOption={(newOption) => { return } /* onCreateProfile(departmentKey, newOption) */}
                    onSelectOption={(k, v) => { return }/* onSelectProfile(departmentKey, profileData.key, k, v) */}
                />
                <label className="p-2">
                    <span className="text-sm p-3 text-neutral-400 font-bold select-none">Job Description</span>
                    <input
                        defaultChecked
                        type="radio"
                        value="Job Description"
                        onChange={handleChange}
                        name="desc-radio"
                        className="radio radio-ping border-neutral-600 border-4 checked:border-0 checked:text-success"
                    />
                </label>
                <label className="p-2">
                    <span className="text-sm p-3 text-neutral-400 font-bold select-none">Responsibilities</span>
                    <input
                        type="radio"
                        value="Responsibilities"
                        onChange={handleChange}
                        name="desc-radio"
                        className="radio radio-ping border-neutral-600 border-4 checked:border-0 checked:text-success"
                    />
                </label>
                <label className="p-2">
                    <span className="text-sm p-3 text-neutral-400 font-bold select-none">Requirements</span>
                    <input
                        type="radio"
                        value="Requirements"
                        onChange={handleChange}
                        name="desc-radio"
                        className="radio radio-ping border-neutral-600 border-4 checked:border-0 checked:text-success"
                    />
                </label>
            </div>
            <MultiMarkdownCard titles={["Job Description", "Responsibilities", "Requirements"]} selectedCard={selectedMarkdownCard} />
        </div >
    )
}

export default ProfileListing



/*

<label className="input">Experience:
                    <input 
                        type="text"
                        placeholder="0 yrs"
                        className={"border-1 p-2 w-full"}
                        /* onFocus={() => setIsDropVisible(true)}
                        onBlur={() => setTimeout(() => setIsDropVisible(false), 100)}
                        value={inputValue} */
/* onChange={(e) => {
    handleInput(e.target.value);
}}
onKeyDown={handleKeyDown} * /
/>
<span className="grow w-full text-center">-</span>
<input 
    type="text"
    placeholder="+ yrs"
    className={"border-1 p-2 w-full"}
    /* onFocus={() => setIsDropVisible(true)}
    onBlur={() => setTimeout(() => setIsDropVisible(false), 100)}
    value={inputValue} */
/* onChange={(e) => {
    handleInput(e.target.value);
}}
onKeyDown={handleKeyDown} * /
/>
{/* <Combobox
dropDownTitle=""
placeholder="0 yrs"
options={experienceOptions}
onAddOption={(newOption) => onCreateProfile(departmentKey, newOption)}
onSelectOption={(k, v) => onSelectProfile(departmentKey, profileData.key, k, v)}
emptyOptionsErrorText={"0 yrs"}
/> -
<Combobox
dropDownTitle=""
placeholder="+ yrs"
options={experienceOptions}
onAddOption={(newOption) => onCreateProfile(departmentKey, newOption)}
onSelectOption={(k, v) => onSelectProfile(departmentKey, profileData.key, k, v)}
emptyOptionsErrorText={"+ yrs"}
/> * /}
</label>

*/