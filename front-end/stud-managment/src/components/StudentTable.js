// src/components/StudentTable.js
import React from "react";
import { Button, Table } from "react-bootstrap";

const StudentTable = ({ students, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
          <th>Subject</th>
          <th>Marks</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students && students.length > 0 ? (
          students.map((student, idx) => {
            return (
              <tr key={student._id || student.id}>
                <td>{idx + 1}</td>
                <td>
                  {student.first_name} {student.last_name}
                </td>
                <td>{student.email}</td>
                <td>{student.subject}</td>
                <td>{student.marks}</td>
                <td>
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => onEdit(student)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => onDelete(student._id || student.id)} // <== Updated
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="6" className="text-center">
              No students found
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default StudentTable;
