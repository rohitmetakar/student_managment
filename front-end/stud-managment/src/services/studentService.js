// src/services/studentService.js
import axios from "axios";

const API = "http://localhost:4001/api/students";

export const getStudents = (page = 1, limit = 5) =>
  axios.get(`${API}?page=${page}&limit=${limit}`);
export const createStudent = (data) => axios.post(API, data);
export const updateStudent = (id, data) => axios.put(`${API}/${id}`, data);
export const deleteStudent = (id) => axios.delete(`${API}/${id}`);
