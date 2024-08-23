require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const todoRoutes = require("./routes/todo.routes");
const errorHandler = require("./middlewares/errorHandler");

//  CORS
const cors = require("cors");
app.use(cors({ origin: "*", credentials: true }));

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use("/api", todoRoutes);

app.use("/", (req, res) => {
  res.send("Hello World!");
});

// Error Handler Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
