const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
console.log('MongoDB URI:', process.env.MONGO_URI);
const app = express();
app.use(express.json());
app.use(cors());

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB Connection Error:", err));
const TodoSchema = new mongoose.Schema({ text: String, completed: Boolean });
const Todo = mongoose.model("Todo", TodoSchema);

// API Routes
app.get("/todos", async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
  });
  
  app.post("/todos", async (req, res) => {
    const { text } = req.body;
    if (!text || text.trim() === "") {
        return res.status(400).json({ error: "Todo cannot be empty" });
    }
    const newTodo = new Todo({ text });
    await newTodo.save();
    res.json(newTodo);
  });
  
  app.delete("/todos/:id", async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo deleted" });
  });

app.listen(5000, () => console.log("Server running on port 5000"));