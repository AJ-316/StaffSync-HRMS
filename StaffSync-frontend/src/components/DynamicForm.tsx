import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import LoadState from "./LoadState";
import { PaperAirplaneIcon, PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { APIKeyValues, Column, getNestedValue, isArrayOfAPIKeyValues, useFetchData } from "../services/apiService";
import WavesBg from "./WavesBg";

type DataProps = {
    id: number;
    allColumns: Column[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiGetById: (id: number | undefined) => (Promise<AxiosResponse<any, any>>);
    onSubmit: (formValues: APIKeyValues) => (Promise<void>);
};

const DynamicForm = ({ id, allColumns, apiGetById, onSubmit }: DataProps) => {
    const {
        dataList: rawData, 
        loading, 
        error, 
        partialList: partialData, 
        updateField
    } = useFetchData({
        id:id, 
        apiFn: apiGetById,
        columnConfig: allColumns
    });

    const [isEditable, setIsEditable] = useState<boolean>(false);

    const handleChange = (accessor: string, value: string) => {
        if (!isEditable) {
            return;
        }
        updateField(accessor, value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (isEditable && rawData && !isArrayOfAPIKeyValues(rawData)) {
            setIsEditable(false);
            onSubmit(rawData);
        }
    };

    return (
        <div className="scroll-content-div-corner h-fit wave-body">
            <LoadState error={error} loading={loading} />

            {error || loading ? <WavesBg /> :
                <form onSubmit={handleSubmit} className="p-6 w-full flex flex-col">
                    <div className="flex flex-wrap -mx-2">
                        {allColumns.map((col) => (
                            <div key={col.accessor} className="w-1/3 px-2 mb-4 flex items-center">
                                <label className="text-sm font-medium mb-1 w-1/5 text-right select-none">
                                    {col.label}:
                                </label>
                                <input
                                    type="text"
                                    value={getNestedValue(partialData, col.accessor) || ""}
                                    onChange={(e) => handleChange(col.accessor, e.target.value)}
                                    className={`${isEditable ? "input" : "border-neutral-600"} text-sm w-2/3 border m-2 p-2 rounded-md shadow-sm`}
                                    placeholder={`- ${col.label} -`}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-row p-1">
                        <button
                            type="submit"
                            className={`m-2 btn btn-soft grow ${isEditable ? "btn-success" : "btn-error"}`}
                            disabled={!isEditable}
                        >
                            <PaperAirplaneIcon className="w-4 h-4" />
                            Submit
                        </button>
                        <button
                            type="button"
                            className={`m-2 btn btn-accent btn-soft ${isEditable ? 'btn-error' : 'btn-accent'}`}
                            onClick={() => setIsEditable(prev => !prev)}
                        >
                            {isEditable ? <XMarkIcon className="w-4 h-4" /> : <PencilSquareIcon className="w-4 h-4" />}
                            {isEditable ? "Cancel Edit" : "Edit"}
                        </button>
                    </div>
                </form>}
        </div>
    );

};

export default DynamicForm;