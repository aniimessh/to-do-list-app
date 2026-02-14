const express = require("express");
const authRoutes = require("./routes/user.routes");
const todoRoutes = require("./routes/todo.routes");
const cookieParser = require("cookie-parser");

const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/todo", todoRoutes);

module.exports = app;
