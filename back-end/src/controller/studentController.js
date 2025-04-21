const Student = require("../models/studentModel");

const studentmodel = {
  getAllStudents: async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const { rows } = await Student.getAll(limit, offset);
      res
        .status(200)
        .json({ data: rows, page: Number(page), limit: Number(limit) });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  getStudentById: async (req, res) => {
    try {
      const { rows } = await Student.getById(req.params.studentId);
      if (rows.length === 0)
        return res.status(404).json({ message: "Student not found" });
      res.status(200).json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  createStudent: async (req, res) => {
    try {
      const { first_name, last_name, email, date_of_birth, subject, marks } =
        req.body;

      const { rows } = await Student.create(
        first_name,
        last_name,
        email,
        date_of_birth,
        subject,
        marks
      );
      res.status(201).json(rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  updateStudent: async (req, res) => {
    try {
      const { studentId } = req.params;
      const { first_name, last_name, email, date_of_birth } = req.body;

      const resp = await Student.update(
        studentId,
        first_name,
        last_name,
        email,
        date_of_birth
      );
      return res.status(200).json({ message: "update student by id" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  deleteStudent: async (req, res) => {
    try {
      const resp = await Student.delete(+req.params.studentId);
      res.status(200).json({ message: "Student deleted" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
};

module.exports = studentmodel;
