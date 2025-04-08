import axios from 'axios';

const API_URL = 'http://localhost:8080/api/employee';

export interface Employee {
    employeeId: number;
    userDto: {
        name: string;
        dob: string;
        gender: string;
        maritalStatus: string;
        addressTemp: string;
        addressPerm: string;
        email: string;
        contactNumber: string;
        qualification: { name: string };
        profile: {
            name: string;
            department: { name: string };
        };
    };
    joinDate: string;
    status: string;
};

export const getAllEmployees = () => axios.get(`${API_URL}/getall`);
export const getEmployeeById = (id: number) => axios.get(`${API_URL}/getbyid?id=${id}`);
export const addEmployee = (employee: Employee) => axios.post(`${API_URL}/add`, employee);
export const updateEmployee = (employee: Employee) => axios.post(`${API_URL}/update`, employee);
export const deleteEmployee = (id: number) => axios.post(`${API_URL}/delete`, { id });