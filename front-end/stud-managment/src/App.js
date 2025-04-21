// App.js
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import StudentFormModal from "./components/StudentForm";
import StudentTable from "./components/StudentTable";
import Pagination from "./components/Pagination";
import Swal from "sweetalert2";
import {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "./services/studentService";

const App = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    subject: "",
    marks: "",
  });
  const [editId, setEditId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadStudents = async () => {
    try {
      const res = await getStudents(page);
      setStudents(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadStudents();
  }, [page]);

  const handleAdd = () => {
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      date_of_birth: "",
      subject: "",
      marks: "",
    });
    setEditId(null);
    setShowModal(true);
  };

  const handleEdit = (student) => {
    setFormData({
      first_name: student.first_name,
      last_name: student.last_name,
      email: student.email,
      date_of_birth: student.date_of_birth.split("T")[0],
      subject: student.subject,
      marks: student.marks,
    });
    setEditId(student._id || student.id);
    setShowModal(true);
  };

  const handleDelete = async (_id) => {
    if (!_id) {
      Swal.fire("Error", "Student ID is missing", "error");
      return;
    }

    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudent(_id);
        Swal.fire("Deleted!", "Student deleted successfully", "success");
        await loadStudents();
      } catch (error) {
        Swal.fire("Error", "Failed to delete student", "error");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateStudent(editId, formData);
        Swal.fire("Updated!", "Student updated successfully", "success");
      } else {
        await createStudent(formData);
        Swal.fire("Created!", "Student created successfully", "success");
      }
      setShowModal(false);
      await loadStudents();
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h4>Student List</h4>
          <Button variant="primary" onClick={handleAdd} className="mb-3">
            Add Student
          </Button>
          <StudentTable
            students={students}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isDelete={!!editId}
          />
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </Col>
      </Row>

      <StudentFormModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isEdit={!!editId}
      />
    </Container>
  );
};

export default App;
