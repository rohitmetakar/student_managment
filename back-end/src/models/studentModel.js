const pool = require("../config/db");

const Student = {
  getAll: function (limit, offset) {
    return new Promise((resolve, reject) => {
      const query = `SELECT s.id, s.first_name, s.last_name, s.email, s.date_of_birth, m.subject, m.marks FROM students s
      LEFT JOIN marks m ON s.id = m.student_id WHERE s.is_deleted IS NULL ORDER BY s.id DESC LIMIT ${limit} OFFSET ${offset}`;
      pool.query(query, [], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  getById: function (id) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT students.*, json_agg(marks.*) AS marks 
        FROM students 
        LEFT JOIN marks ON students.id = marks.student_id 
        WHERE students.id = '${id}' 
        GROUP BY students.id
      `;
      pool.query(query, [], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  create: function (
    first_name,
    last_name,
    email,
    date_of_birth,
    subject,
    marks
  ) {
    return new Promise(async (resolve, reject) => {
      const client = await pool.connect();
      try {
        await client.query("BEGIN");

        const studentResult = await client.query(
          `INSERT INTO students (first_name, last_name, email, date_of_birth)
           VALUES ($1, $2, $3, $4)
           RETURNING *`,
          [first_name, last_name, email, date_of_birth]
        );

        const student = studentResult.rows[0];

        await client.query(
          `INSERT INTO marks (student_id, subject, marks)
           VALUES ($1, $2, $3)`,
          [student.id, subject, marks]
        );

        await client.query("COMMIT");
        resolve({ rows: [student] });
      } catch (err) {
        await client.query("ROLLBACK");
        reject(err);
      }
    });
  },

  update: function (studentId, first_name, last_name, email, date_of_birth) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE students 
        SET first_name = '${first_name}', 
            last_name = '${last_name}', 
            email = '${email}', 
            date_of_birth = '${date_of_birth}' 
        WHERE id = '${studentId}' 
        RETURNING *
      `;
      pool.query(query, [], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  delete: function (id) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE students SET is_deleted = 1 WHERE id = '${id}' RETURNING *`;
      pool.query(query, [], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
};

module.exports = Student;
