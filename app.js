require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todo.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

app.use("/", (req, res) => {
  res.send("Hello World!");
});

// Routes
app.use("/api", todoRoutes);

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
