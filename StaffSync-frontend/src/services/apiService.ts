import axios, { AxiosResponse } from "axios";
import { useEffect, useMemo, useState } from "react";
import { cloneDeep, set } from "lodash";

const API_URL = 'http://localhost:8080/api/';

export const createApiService = (baseURL: string) => ({
    getAll: () => axios.get(`${API_URL}${baseURL}/getall`),
    getById: (id: number | undefined) => axios.get(`${API_URL}${baseURL}/getbyid?id=${id}`),
    add: (data: unknown) => axios.post(`${API_URL}${baseURL}/add`, data),
    update: (data: unknown) => axios.post(`${API_URL}${baseURL}/update`, data),
    delete: (id: number) => axios.post(`${API_URL}${baseURL}/delete`, { id }),
});

export const employeeService = createApiService("employee");
export const candidateService = createApiService("candidate");
export const salaryService = createApiService("employee/salary");
export const profileService = createApiService("profile");
export const departmentService = createApiService("department");

// columnConfig.ts
export const columnConfig = {
    employee: [
        { label: "Name", accessor: "userDto.name" },
        { label: "Department", accessor: "userDto.profileDto.departmentDto.name" },
        { label: "Profile", accessor: "userDto.profileDto.name" },
        { label: "Qualification", accessor: "userDto.qualificationDto.name" },
        { label: "Marital Status", accessor: "status" },
        { label: "Join Date", accessor: "joinDate" },
        { label: "Email", accessor: "userDto.email" },
        { label: "Contact", accessor: "userDto.contactNumber" },
        { label: "Address Temporary", accessor: "userDto.addressTemp" },
        { label: "Address Permenant", accessor: "userDto.addressPerm" },
    ],
    candidate: [
        { label: "Name", accessor: "userDto.name" },
        { label: "Department", accessor: "userDto.profileDto.departmentDto.name" },
        { label: "Profile", accessor: "userDto.profileDto.name" },
        { label: "Qualification", accessor: "userDto.qualificationDto.name" },
        { label: "Email", accessor: "userDto.email" },
        { label: "Contact", accessor: "userDto.contactNumber" },
        { label: "Status", accessor: "status" },
        { label: "Interview Stage", accessor: "interviewStage" },
        { label: "Rejection Reason", accessor: "rejectionReason" }
    ],
    department: [
        { label: "Department", accessor: "name" },
    ],
    profile: [
        { label: "Profile", accessor: "name" },
        { label: "Department", accessor: "departmentDto.name" },
    ],
    salary: [
        { label: "Name", accessor: "employeeDto.userDto.name" },
        { label: "Basic Salary (₹)", accessor: "basicSalary" },
        { label: "Net Salary (₹)", accessor: "netSalary" },
        { label: "HRA (%)", accessor: "hra" },
        { label: "HRA Salary (₹)", accessor: "hraSalary" },
        { label: "Tax (%)", accessor: "tax" },
        { label: "Tax Salary (₹)", accessor: "taxSalary" },
        { label: "Flat deductions (₹)", accessor: "deductions" },
        { label: "Profile", accessor: "employeeDto.userDto.profileDto.name" },
        { label: "Department", accessor: "employeeDto.userDto.profileDto.departmentDto.name" },
    ],
};

export type Column = {
    label: string;
    accessor: string;
};

export interface APIKeyValues {
    [key: string]: string;
}

type FetchDataResult = {
    dataList: APIKeyValues | APIKeyValues[];
    partialList?: APIKeyValues | APIKeyValues[];
    loading: boolean;
    error: string | null;
    updateField: (accessor: string, value: string) => void;
    refetch: () => void;
};

type UseFetchDataProps = {
    id?: number;
    isList?: boolean;
    columnConfig?: Column[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    apiFn: (id?: number) => Promise<AxiosResponse<any>>;
};


export interface MutableDataProps {
    rawData: APIKeyValues;
    updateField: (accessor: string, value: string) => void;
}

export interface MutablePartialDataProps {
    partialData: APIKeyValues;
    rawData: APIKeyValues;
    updateField: (accessor: string, value: string) => void;
}

export interface PartialDataProps {
    partialData: APIKeyValues;
    rawData: APIKeyValues;
}

export const isArrayOfAPIKeyValues = ( data: APIKeyValues | APIKeyValues[]
): data is APIKeyValues[] => {
    return Array.isArray(data);
};

export const useFetchData = ({
    id,
    isList = false,
    columnConfig,
    apiFn,
}: UseFetchDataProps): FetchDataResult => {
    const [dataList, setDataList] = useState<APIKeyValues | APIKeyValues[]>(
        isList ? [] : {}
    );

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        let dataResultMsg = "";
        try {
            const response = await apiFn(id);
            dataResultMsg = ": " + response.data.message;
            if (!response.data.success) throw new Error();
            setDataList(response.data.data);
            console.log("Fetched data", response.data);
        } catch (err) {
            console.error("Failed to fetch data:", err);
            dataResultMsg = dataResultMsg.length === 0 ? ": API Connection Failed" : dataResultMsg;
            setError("Failed to fetch data" + dataResultMsg);
        } finally {
            setLoading(false);
        }
    };

    const updateField = (accessor: string, value: string, checkKey?: string) => {
        const updated = cloneDeep(dataList);
    
        if (Array.isArray(updated)) {
            if(!checkKey) {
                console.warn("updateField: key required for list updates");
                return;
            }

            const [key, keyValue] = checkKey.split(":");
            if (!key || !keyValue) {
                console.warn("updateField: invalid checkKey format");
                return;
            }
            
            const itemIndex = updated.findIndex((item) => item[key[0]] === key[1]);
            if (itemIndex === -1) {
                console.warn("updateField: item with the specified id not found");
                return;
            }
            
            set(updated[itemIndex], accessor, value);
        } else {

            set(updated, accessor, value);
        }
    
        setDataList(updated);
    };
    
    const partialList = useMemo(() => {
        if (!columnConfig) return undefined;

        if (Array.isArray(dataList)) {
            return dataList.map(item => {
                const partial: APIKeyValues = {};
                columnConfig.forEach(col => {
                    set(partial, col.accessor, getNestedValue(item, col.accessor) || "");
                });
                return partial;
            });
        } else {
            const partial: APIKeyValues = {};
            columnConfig.forEach(col => {
                set(partial, col.accessor, getNestedValue(dataList, col.accessor) || "");
            });
            return partial;
        }
    }, [dataList, columnConfig]);


    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        dataList,
        partialList,
        loading,
        error,
        updateField,
        refetch: fetchData,
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNestedValue = (obj: any, path: string): string => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNestedValueOrElse = (obj: any, path: string, elseVal: string): string => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? elseVal;
};