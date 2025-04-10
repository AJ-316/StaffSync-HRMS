import { useState, useEffect } from "react";
import { AxiosResponse } from "axios";
import { Column } from "./DataTable";
import { cloneDeep, set } from "lodash";
import { getNestedValue } from "../services/service";

export interface FormValues {
    [key: string]: string;
}

type DataProps = {
    id: number;
    allColumns: Column[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiGetById: (id: number) => (Promise<AxiosResponse<any, any>>);
    onSubmit: (formValues: FormValues) => (Promise<void>);
};

const DynamicForm = ({ id, allColumns, apiGetById, onSubmit }: DataProps) => {
    const [userDataList, setUserDataList] = useState<FormValues>();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [formValues, setFormValues] = useState<FormValues>({});
    const [isEditable, setIsEditable] = useState<boolean>(false);

    const populateForm = (userDataList: unknown) => {
        const initialValues: FormValues = {};

        allColumns.forEach((column) => {
            set(initialValues, column.accessor, getNestedValue(userDataList, column.accessor) || "");
            console.log("Value for", column.accessor, ":", getNestedValue(userDataList, column.accessor));
        });
        /* console.log("init", initialValues, userDataList) */
        setFormValues(initialValues);
    }

    useEffect(() => {
        populateForm(userDataList);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userDataList])

    useEffect(() => {
        const fetchDataByID = async (id: number) => {
            try {
                const response = await apiGetById(id);
                console.log("Fetched data response:", response);

                setUserDataList(response.data.data);
            } catch (error) {
                console.error("Failed to fetch data:", error);
                setError("Failed to fetch data:");
            } finally {
                setLoading(false);
            }
        };

        fetchDataByID(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChange = (accessor: string, value: string) => {
        if (!isEditable) {
            populateForm(userDataList);
            return;
        }
        /* console.log("Typing...", accessor, value) */
        const updatedValues = cloneDeep(formValues);
        set(updatedValues, accessor, value);
        setFormValues(updatedValues);

        const updatedData = cloneDeep(userDataList);
        if (!updatedData) return;

        set(updatedData, accessor, value);
        setUserDataList(updatedData);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (isEditable && userDataList) {
            setIsEditable(false);
            onSubmit(userDataList);
        }
    };

    useEffect(() => {
        console.log("isEditable changed:", isEditable);
    }, [isEditable]);

    return (
        <div className="m-10 overflow-y-auto shadow-2xl shadow-neutral-950 border-l-2 border-l-info-content border-t-2 border-t-info-content rounded-[50px]">
            {loading ? (
                <p className="text-center p-4">Loading...</p>
            ) : error ? (
                <p className="text-center text-error p-4">{error}</p>
            ) : (
                <form onSubmit={handleSubmit} className="p-6 w-full flex flex-col">
                    <div className="flex flex-wrap -mx-2">
                        {allColumns.map((col, index) => (
                            <div key={col.accessor} className="w-1/3 px-2 mb-4 flex items-center">
                                <label className="text-sm font-medium mb-1 w-1/5 text-right">
                                    {col.label}
                                </label>
                                <input
                                    type="text"
                                    value={getNestedValue(formValues, col.accessor) || ""}
                                    onChange={(e) => handleChange(col.accessor, e.target.value)}
                                    className="w-2/3 border m-2 p-2 rounded-md shadow-sm"
                                    placeholder={`- ${col.label} -`}
                                    disabled={!isEditable || index == 0}
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
                            Submit
                        </button>
                        <button
                            type="button"
                            className='m-2 btn btn-soft btn-accent'
                            onClick={() => setIsEditable(prev => !prev)}
                        >
                            {isEditable ? "Cancel Edit ❌" : "Edit ✏️"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );

};

export default DynamicForm;