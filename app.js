const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const rateLimiter = require("./middleware/rateLimiter");

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(rateLimiter);

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/records", require("./routes/recordRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

app.use(require("./middleware/errorHandler"));
module.exports = app;