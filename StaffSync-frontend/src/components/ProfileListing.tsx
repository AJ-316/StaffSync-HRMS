import { useContext, useState } from "react";
import Combobox, { ComboboxValues } from "./Combobox";
import { XMarkIcon } from "@heroicons/react/24/outline";
import NestedInput from "./NestedInput";
import MultiMarkdownCard from "./MultiMarkdownCard";
import { ListingDropdownContext } from "../services/ListingDropdownContext";

export type ProfileData = {
    key: string;
    id: string;
    name: string;
    vacancy: string;
    experience: string;
    jobDescription: string;
    responsibilities: string;
    requirements: string;
};

interface ProfileListingProps {
    departmentId: string;
    departmentKey: string;
    profileData: ProfileData;
}

function ProfileListing({ departmentId, departmentKey, profileData }: ProfileListingProps) {

    const { profileList, onCreateProfile, onRemoveProfile, onSelectProfile, onUpdateProfile } = useContext(ListingDropdownContext);
    const vacanciesOptions: ComboboxValues = Object.fromEntries(
        Array.from({ length: 10 }, (_, i) => [i, (i + 1).toString()])
    );

    const descriptions = ['briefcase:Job Description', 'star:Responsibilities', 'check:Requirements']

    const [selectedMarkdownCard, setSelectedMarkdownCard] = useState(descriptions[0]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMarkdownCard(e.target.value);
    };

    const updateVacancy = (values: string) => {
        let intValue = Number.parseInt(values);
        if(isNaN(intValue)) intValue = 0;

        onUpdateProfile(departmentKey, {...profileData, vacancy: intValue.toString()});
    }

    const updateExperience = (values: string[]) => {
        values = values.map(v => v.trim());
        values[0] = values[0].length === 0 ? "0" : values[0];
        values[1] = values[1].length === 0 ? "+" : values[1] === "+" ? values[1] : "-" + values[1];
        
        onUpdateProfile(departmentKey, {...profileData, experience: values[0] + values[1] + " years"});
    }

    const updateDescription = (key: string, value: string) => {
        const newProfileData = {...profileData};
        switch (key) {
            case descriptions[0]:
                newProfileData.jobDescription = value;
                break;

            case descriptions[1]:
                newProfileData.responsibilities = value;
                break;

            case descriptions[2]:
                newProfileData.requirements = value;
                break;
        }
        onUpdateProfile(departmentKey, newProfileData);
    }

    return (
        <div className="flex items-center border-t-1 border-b-1 bg-base-300 border-info-content rounded-xl m-2 mt-6 p-2">
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
                    onAddOption={(newOption) => onCreateProfile(departmentId, newOption)}
                    onSelectOption={(k, v) => onSelectProfile(departmentKey, profileData.key, k, v)}
                    emptyOptionsErrorText={"No Profiles Available"}
                />
                <NestedInput
                    name="Experience: "
                    unit="years"
                    inputs={[{ placeholder: "0", inputValue: "0", separator: "-" }, { placeholder: "+", inputValue: "+" }]}
                    onSetValues={updateExperience}
                />
                <Combobox
                    dropDownTitle="Vacancy:"
                    placeholder="Set..."
                    options={vacanciesOptions}
                    onAddOption={() => { return } /* onCreateProfile(departmentKey, newOption) */}
                    onSelectOption={(_k, v) => updateVacancy(v)/* onSelectProfile(departmentKey, profileData.key, k, v) */}
                />

                <table className="grid-cols-2 border-separate border-spacing-y-4">
                    <tr>
                        <td>
                            <span className="text-sm p-3 text-neutral-400 font-bold select-none">Job Description</span>
                        </td>
                        <td>
                            <input
                                defaultChecked
                                type="radio"
                                value={descriptions[0]}
                                onChange={handleChange}
                                name={"desc-radio" + profileData.key}
                                className="radio radio-ping border-neutral-600 border-4 checked:border-0 checked:text-success"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="text-sm p-3 text-neutral-400 font-bold select-none">Responsibilities</span>
                        </td>
                        <td>
                            <input
                                type="radio"
                                value={descriptions[1]}
                                onChange={handleChange}
                                name={"desc-radio" + profileData.key}
                                className="radio radio-ping border-neutral-600 border-4 checked:border-0 checked:text-success"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <span className="text-sm p-3 text-neutral-400 font-bold select-none">Requirements</span>
                        </td>
                        <td>
                            <input
                                type="radio"
                                value={descriptions[2]}
                                onChange={handleChange}
                                name={"desc-radio" + profileData.key}
                                className="radio radio-ping border-neutral-600 border-4 checked:border-0 checked:text-success"
                            />
                        </td>
                    </tr>
                </table>
            </div>
            <MultiMarkdownCard titles={descriptions} selectedCard={selectedMarkdownCard} onInputChange={updateDescription} />
        </div >
    )
}

export default ProfileListing