// src/components/StudentFormModal.js
import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const StudentFormModal = ({
  show,
  handleClose,
  formData,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>
          {formData._id ? "Edit Student" : "Add Student"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {[
            "first_name",
            "last_name",
            "email",
            "date_of_birth",
            "subject",
            "marks",
          ].map((field, index) => (
            <Form.Group className="mb-2" key={index}>
              <Form.Label>{field.replace("_", " ").toUpperCase()}</Form.Label>
              <Form.Control
                type={
                  field === "email"
                    ? "email"
                    : field === "marks"
                    ? "number"
                    : field === "date_of_birth"
                    ? "date"
                    : "text"
                }
                name={field}
                value={formData[field] || ""}
                onChange={handleChange}
                required
              />
            </Form.Group>
          ))}
          <Button type="submit" variant="success">
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default StudentFormModal;
