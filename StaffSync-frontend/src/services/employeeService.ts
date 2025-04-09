import axios from 'axios';
import { Column } from '../components/DataTable';

const API_URL = 'http://localhost:8080/api/employee';

export interface UserDto {
    id: string;
    name: string;
    dob: string;
    gender: string;
    maritalStatus: string;
    addressTemp: string;
    addressPerm: string;
    email: string;
    contactNumber: string;
    qualificationDto: { id: string; name: string };
    profileDto: {
        id: string;
        name: string;
        departmentDto: { id: string; name: string };
    };
}

export interface Employee {
    id: number;
    userDto: UserDto;
    joinDate: string;
    status: string;
};

export const allColumns: Column[] = [
    { label: "ID", accessor: "id" },
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
];

export const getAllEmployees = () => axios.get(`${API_URL}/getall`);
export const getEmployeeById = (id: number) => axios.get(`${API_URL}/getbyid?id=${id}`);
export const addEmployee = (employee: unknown) => axios.post(`${API_URL}/add`, employee);
export const updateEmployee = (employee: unknown) => axios.post(`${API_URL}/update`, employee);
export const deleteEmployee = (id: number) => axios.post(`${API_URL}/delete`, { id });