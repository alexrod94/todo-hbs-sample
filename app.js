const express = require("express");
const hbs = require("hbs");
const app = express();
const mongoose = require("mongoose");
const Task = require("./models/Task.model");
const bodyParser = require("body-parser");

mongoose
  .connect("mongodb://127.0.0.1:27017/tasks")
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log(err));

app.set("view engine", "hbs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));
hbs.registerPartials(__dirname + "/views/partials");

app.use(bodyParser());

hbs.registerHelper("eq", function (a, b) {
  return a === b;
});

// Toda la lista de tareas
app.get("/", (req, res) => {
  Task.find().then((data) => {
    res.render("index", { tasks: data });
  });
});

// Página para crear tarea nueva
app.get("/create-task", (req, res) => {
  res.render("create-task");
});

app.post("/create-task", (req, res) => {
  Task.create(req.body)
    .then((data) => {
      res.redirect("/");
    })
    .catch((error) => console.log(error));
});
// Página con una tarea concreta
app.get("/tasks/:id", (req, res) => {
  Task.findById(req.params.id).then((data) => {
    res.render("task", { task: data });
  });
});

app.listen(3000, () => console.log("Server listening in port 3000"));
