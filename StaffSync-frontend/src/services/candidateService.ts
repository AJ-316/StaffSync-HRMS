import axios from 'axios';

const API_URL = 'http://localhost:8080/api/candidate';

export interface Candidate {
    candidateId: number;
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

export const getAllCandidates = () => axios.get(`${API_URL}/getall`);
export const getCandidateById = (id: number) => axios.get(`${API_URL}/getbyid?id=${id}`);
export const addCandidate = (candidate: Candidate) => axios.post(`${API_URL}/add`, candidate);
export const updateCandidate = (candidate: Candidate) => axios.post(`${API_URL}/update`, candidate);
export const deleteCandidate = (id: number) => axios.post(`${API_URL}/delete`, { id });