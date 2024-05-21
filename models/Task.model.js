const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["pending", "in_progress", "done"],
  },
  due_date: {
    type: String,
  },
  type: {
    type: String,
    enum: ["house", "work", "study", "health"],
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
