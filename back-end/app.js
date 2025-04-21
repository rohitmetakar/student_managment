const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const studentRoutes = require("./src/routes/studentRoutes");
require("dotenv").config();

require("./src/config/db");

const PORT = process.env.PORT || 4001;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/students", studentRoutes);

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
