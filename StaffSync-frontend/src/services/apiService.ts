import axios from "axios";
import { APIKeyValues } from "../components/FetchResult";
import { useEffect, useMemo, useState } from "react";
import { Column } from "../components/DataTable";
import { cloneDeep, set } from "lodash";

const API_URL = 'http://localhost:8080/api/';

export const createApiService = (baseURL: string) => ({
    getAll: () => axios.get(`${API_URL}${baseURL}/getall`),
    getById: (id: number) => axios.get(`${API_URL}${baseURL}/getbyid?id=${id}`),
    add: (data: unknown) => axios.post(`${API_URL}${baseURL}/add`, data),
    update: (data: unknown) => axios.post(`${API_URL}${baseURL}/update`, data),
    delete: (id: number) => axios.post(`${API_URL}${baseURL}/delete`, { id }),
});

export const employeeService = createApiService("employee");
export const candidateService = createApiService("candidate");
export const salaryService = createApiService("employee/salary");

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

export interface MutablePartialDataProps {
    partialData: APIKeyValues;
    rawData: APIKeyValues;
    updateField: (accessor: string, value: string) => void;
}

export interface PartialDataProps {
    partialData: APIKeyValues;
    rawData: APIKeyValues;
}

export function useMutablePartialData(data: APIKeyValues, columns: Column[]): MutablePartialDataProps {
    const [rawData, setRawData] = useState<APIKeyValues>(data);

    useEffect(() => {
        setRawData(data);
    }, [data])

    const partialData = useMemo(() => {
        const values: APIKeyValues = {};
        columns.forEach(col => {
            set(values, col.accessor, getNestedValue(rawData, col.accessor) || "");
        });
        return values;
    }, [rawData, columns]);

    const updateField = (accessor: string, value: string) => {
        const updated = cloneDeep(rawData);
        set(updated, accessor, value);
        setRawData(updated);
    };

    return { partialData, rawData, updateField };
}

export function usePartialData(data: APIKeyValues, columns: Column[]): PartialDataProps {
    const [rawData, setRawData] = useState<APIKeyValues>(data);

    useEffect(() => {
        setRawData(data);
    }, [data])

    const partialData = useMemo(() => extractPartialData(rawData, columns), [rawData, columns]);

    return { partialData, rawData };
}

export const extractPartialData = (data: APIKeyValues, columns: Column[]): APIKeyValues => {
    const values: APIKeyValues = {};
    columns.forEach(col => {
        set(values, col.accessor, getNestedValue(data, col.accessor) || "");
    });
    return values;
};

export const extractPartialList = (list: APIKeyValues[], columns: Column[]): APIKeyValues[] => {
    return list.map(item => extractPartialData(item, columns));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNestedValue = (obj: any, path: string): string => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getNestedValueOrElse = (obj: any, path: string, elseVal: string): string => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj) ?? elseVal;
};