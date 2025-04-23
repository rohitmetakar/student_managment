exports.up = (pgm) => {
  pgm.createTable("students", {
    id: { type: "serial", primaryKey: true },
    first_name: { type: "varchar(50)", notNull: true },
    last_name: { type: "varchar(50)", notNull: true },
    email: { type: "varchar(100)", notNull: true, unique: true },
    date_of_birth: { type: "date", notNull: true },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
    is_deleted: { type: "integer", notNull: false },
  });

  pgm.createTable("marks", {
    id: { type: "serial", primaryKey: true },
    student_id: {
      type: "integer",
      notNull: true,
      references: "students(id)",
      onDelete: "CASCADE",
    },
    subject: { type: "varchar(100)", notNull: true },
    marks: { type: "integer", notNull: true },
    created_at: { type: "timestamp", default: pgm.func("current_timestamp") },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("marks");
  pgm.dropTable("students");
};
