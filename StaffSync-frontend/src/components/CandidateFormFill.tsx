import { APIKeyValues, candidateService, getNestedValue, isArrayOfAPIKeyValues, profileService, useFetchData } from "../services/apiService"
import { useEffect, useState } from "react"
import Combobox, { ComboboxValues } from "./Combobox"
import InnerHead from "./InnerHead"
import { XMarkIcon } from "@heroicons/react/24/outline"
import { set } from "lodash"

const CandidateFormFill = () => {

    const [inputValues, setInputValues] = useState<APIKeyValues>({
        "First Name": "",
        "Middle Name": "",
        "Surname": "",
        "Date Of Birth": "",
        "Contact Number": "",
        "Email Address": "",
        "Gender": "",
        "Marital Status": "",
        "Permanent Address": "",
        "Temporary Address": "",
        "Certificate": "",
        "Previous Company": "",
        "Leave Reason": "",
        "Profile": ""
    });

    const { dataList, error, loading } = useFetchData({ isList: true, apiFn: profileService.getAll })
    const [profiles, setProfiles] = useState<APIKeyValues>({});

    useEffect(() => {
        if (!isArrayOfAPIKeyValues(dataList)) return;

        const newProfiles: APIKeyValues = {};
        dataList.forEach(profile => {
            const deptName = getNestedValue(profile, "departmentDto.name");
            const profileId = getNestedValue(profile, "id");
            const profileName = getNestedValue(profile, "name");

            newProfiles[profileId + "-" + deptName] = profileName;
        });

        setProfiles(newProfiles);
    }, [dataList])

    const handleInput = (fieldName: string, fieldValue: string) => {
        setInputValues(prev => ({ ...prev, [fieldName]: fieldValue }))
    }

    const getFormTextField = (label: string) => {
        return (
            <div className="w-1/3 px-2 mb-4 flex items-center">
                <label className="text-sm font-medium mb-1 w-1/5 text-right select-none">
                    {label}:
                </label>
                <input
                    type="text"
                    value={inputValues[label]}
                    onChange={(e) => handleInput(label, e.target.value)}
                    className="input text-sm w-2/3 border m-2 p-2 rounded-md shadow-sm"
                    placeholder={`- ${label} -`}

                />
            </div>
        )
    }

    const getFormDateField = (label: string) => {
        return (
            <div className="w-1/3 px-2 mb-4 flex items-center">
                <label className="text-sm font-medium mb-1 w-1/5 text-right select-none">
                    {label}:
                </label>
                <input
                    type="date"
                    value={inputValues[label]}
                    onChange={(e) => handleInput(label, e.target.value)}
                    className="input text-sm w-2/3 border m-2 p-2 rounded-md shadow-sm"
                    placeholder={`- ${label} -`}
                />
            </div>
        )
    }

    const getFormTextAreaField = (label: string) => {
        return (
            <div className="w-full px-2 mb-4 flex items-center">
                <label className="text-sm font-medium mb-1 text-right select-none">
                    {label}:
                </label>
                <textarea
                    value={inputValues[label]}
                    onChange={(e) => handleInput(label, e.target.value)}
                    className="textarea text-sm w-full border m-2 p-2 rounded-md shadow-sm resize-none"
                    placeholder={`- ${label} -`}
                />
            </div>
        )
    }

    const getFormSelectField = (label: string, options: ComboboxValues) => {
        return (
            <div className="w-1/3 px-2 mb-4 flex items-center">
                <label className="text-sm font-medium mb-1 w-1/5 text-right select-none p-2 pr-0">
                    {label}:
                </label>
                <Combobox
                    dropDownTitle={""}
                    options={options}
                    onSelectOption={(k, v) => {
                        if(k === null) {
                            handleInput(label, "")    
                            return
                        }
                        handleInput(label, k + ":" + v)
                    }}
                    classes="w-2/3 p-2" />
            </div>
        )
    }

    const getDegreeNameLabel = () => {
        if (!inputValues["Certificate"] || inputValues["Certificate"].split(":")[1].length === 0)
            return "Certificate Name";
        return inputValues["Certificate"].split(":")[1] + " Name"
    }

    const getDepartment = () => {
        if (!inputValues["Profile"] || inputValues["Profile"].split(":")[1].length === 0)
            return "- Select Profile -";
        return inputValues["Profile"].split(":")[0].split("-")[1]
    }

    const onSubmit = async () => {
        const requiredFields = Object.keys(inputValues);
        const emptyFields = requiredFields.filter(key => !inputValues[key]?.trim());
        const email = inputValues["Email Address"];
        const contact = inputValues["Contact Number"];

        const isValidEmail = email?.toLowerCase().endsWith("@gmail.com");
        const isValidPhone = /^[0-9]{10}$/.test(contact || "");

        if (emptyFields.length > 0) {
            alert(`Please fill in all fields. Missing: ${emptyFields.join(", ")}`);
            return;
        }

        if (!isValidEmail) {
            alert("Please enter a valid Gmail address (must end with @gmail.com).");
            return;
        }

        if (!isValidPhone) {
            alert("Please enter a valid 10-digit phone number.");
            return;
        }

        const data = {}
        set(data, "userDto.name", `${inputValues["First Name"]} ${inputValues["Middle Name"]} ${inputValues["Surname"]}`);
        set(data, "userDto.dob", inputValues["Date Of Birth"]);
        set(data, "userDto.gender", inputValues["Gender"].split(":")[0]);
        set(data, "userDto.maritalStatus", inputValues["Marital Status"].split(":")[0]);
        set(data, "userDto.addressTemp", inputValues["Temporary Address"]);
        set(data, "userDto.addressPerm", inputValues["Permanent Address"]);
        set(data, "userDto.email", inputValues["Email Address"]);
        set(data, "userDto.contactNumber", inputValues["Contact Number"]);
        set(data, "userDto.qualificationDto.name", inputValues[inputValues["Certificate"].split(":")[1] + " Name"]);
        set(data, "userDto.qualificationDto.company", inputValues["Previous Company"]);
        set(data, "userDto.qualificationDto.leaveReason", inputValues["Leave Reason"]);
        set(data, "userDto.qualificationDto.certificate", inputValues["Certificate"].split(":")[0]);
        set(data, "userDto.profileDto.id", inputValues["Profile"].split(":")[0].split("-")[0]);
    
        await candidateService.add(data);
        alert("Form Submitted!")
    };

    return (
        <div className="overflow-y-auto h-[calc(100vh-16rem)]">
            <div className="sticky top-0 z-1 shadow-2xl wave-body">
                <InnerHead
                    title={"Candidate Form Fill"}
                    desc={["Add applied Candidates with ease.", "Fill form to initiate Interview Rounds"]}
                    content={undefined}
                />
            </div>
            <form className="w-full flex flex-col">
                <div className="flex flex-wrap -mx-2 px-15 m-6">
                    <div className="text-center w-full text-2xl p-3 mb-5 bg-info-content rounded-2xl">- Personal -</div>
                    {getFormTextField("First Name")}
                    {getFormTextField("Middle Name")}
                    {getFormTextField("Surname")}
                    {getFormDateField("Date Of Birth")}
                    {getFormTextField("Contact Number")}
                    {getFormTextField("Email Address")}
                    {getFormSelectField("Gender", { "MALE": "Male", "FEMALE": "Female", "OTHER": "Other" })}
                    {getFormSelectField("Marital Status", {
                        "SINGLE": "Single", "MARRIED": "Married",
                        "DIVORCED": "Divorced", "WIDOWED": "Widowed"
                    })}
                    {getFormTextAreaField("Permanent Address")}
                    {getFormTextAreaField("Temporary Address")}
                    <div className="text-center w-full text-2xl p-3 mb-5 bg-info-content rounded-2xl">- Qualification -</div>
                    {getFormSelectField("Certificate", { "DEGREE": "Degree", "DIPLOMA": "Diploma", "TWELFTH": "12th Board", "OTHER": "Other Certificate" })}
                    {getFormTextField(getDegreeNameLabel())}
                    {getFormTextField("Previous Company")}
                    {getFormTextAreaField("Leave Reason")}

                    <div className="text-center w-full text-2xl p-3 mb-5 bg-info-content rounded-2xl">- Apply Profile -</div>
                    {getFormSelectField("Profile", profiles)}
                    <div className="w-1/3 px-2 mb-4 flex items-center">
                        <label className="text-sm font-medium mb-1 w-1/5 text-right select-none">
                            Department:
                        </label>
                        <input
                            type="text"
                            value={getDepartment()}
                            className="input text-sm w-2/3 border m-2 p-2 rounded-md shadow-sm"
                            disabled={true}
                        />
                    </div>
                </div>
                <div className="sticky bottom-0 z-1 wave-body flex flex-row p-2">

                    <button
                        type="button"
                        className={`m-2 btn btn-soft btn-error`}
                        onClick={() => {
                            const clearedValues = Object.keys(inputValues).reduce((acc, key) => {
                                acc[key] = "";
                                return acc;
                            }, {} as APIKeyValues);
                            setInputValues(clearedValues);
                        }}
                    >
                        <XMarkIcon className="w-6 h-6" />
                        Clear
                    </button>

                    <button
                        type="button"
                        className={"m-2 btn btn-soft grow btn-success"}
                        onClick={onSubmit}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default CandidateFormFill
