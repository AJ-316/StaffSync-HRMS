import axios from 'axios';
import { Column } from '../components/DataTable';
import { UserDto } from './employeeService';

const API_URL = 'http://localhost:8080/api/candidate';

export interface Candidate {
    candidateId: number;
    userDto: UserDto;
    status: string;
    interviewStage: string;
    rejectionReason: string;
};

export const allColumns: Column[] = [
    { label: "ID", accessor: "id" },
    { label: "Name", accessor: "userDto.name" },
    { label: "Department", accessor: "userDto.profile.department.name" },
    { label: "Profile", accessor: "userDto.profile.name" },
    { label: "Qualification", accessor: "userDto.qualification.name" },
    { label: "Email", accessor: "userDto.email" },
    { label: "Contact", accessor: "userDto.contactNumber" },
    { label: "Status", accessor: "status" },
    { label: "Interview Stage", accessor: "interviewStage" },
    { label: "Rejection Reason", accessor: "rejectionReason" }
];

export const getAllCandidates = () => axios.get(`${API_URL}/getall`);
export const getCandidateById = (id: number) => axios.get(`${API_URL}/getbyid?id=${id}`);
export const addCandidate = (candidate: unknown) => axios.post(`${API_URL}/add`, candidate);
export const updateCandidate = (candidate: unknown) => axios.post(`${API_URL}/update`, candidate);
export const deleteCandidate = (id: number) => axios.post(`${API_URL}/delete`, { id });