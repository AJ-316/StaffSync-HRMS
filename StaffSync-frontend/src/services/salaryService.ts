import axios from 'axios';
import { Column } from '../components/DataTable';
import { EmployeeDto } from './employeeService';

const API_URL = 'http://localhost:8080/api/employee/salary';


export interface Salary {
    id: number;
    employeeDto: EmployeeDto;
    basicSalary: number;
    hra: number;
    tax: number;
    deductions: number;
    hraSalary: number;
    taxSalary: number;
    netSalary: number;
};

export const allColumns: Column[] = [
    { label: "ID", accessor: "employeeDto.id" },
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
];

export const getAllSalaries = () => axios.get(`${API_URL}/getall`);
export const getSalarieById = (id: number) => axios.get(`${API_URL}/getbyid?id=${id}`);
export const updateSalary = (salary: unknown) => axios.post(`${API_URL}/update`, salary);