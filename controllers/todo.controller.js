const Todo = require("../models/Todo");

// Get all todos
exports.getTodos = async (req, res) => {
  try {
    // Extract query parameters
    const limit = parseInt(req.query.limit) || 10; // Default limit to 10 if not specified
    const skip = parseInt(req.query.skip) || 0; // Default skip to 0 if not specified
    const search = req.query.search || ""; // Default search to an empty string if not specified
    const sort = req.query.sort === "asc" ? 1 : -1; // Default sort to descending order

    // Build the query
    const query = search ? { title: { $regex: search, $options: "i" } } : {};

    // Execute the query with pagination and sorting
    const todos = await Todo.find(query)
      .sort({ createdAt: sort }) // Sort by createdAt field
      .skip(skip)
      .limit(limit);

    // Return the result
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new todo
exports.createTodo = async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    status: req.body.status || "new", // status can be 'new', 'active', or 'done'
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update a todo
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.title = req.body.title || todo.title;
    todo.status = req.body.status || todo.status;

    const updatedTodo = await todo.save();
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete a todo
exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    await todo.remove();
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
