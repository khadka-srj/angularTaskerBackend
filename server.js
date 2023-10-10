const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

let dataBase = [
  {
    id: "1",
    text: "testing1",
    day: "2023-10-24T18:15:00.000Z",
  },
  {
    id: "2",
    text: "testing2",
    day: "2023-10-24T18:15:00.000Z",
  },
];

let users = [
  {
    id: 1,
    email: "suraj@gmail.com",
    name: "suraj",
    password: "12345678",
  },
  {
    id: 2,
    email: "saitama@gmail.com",
    name: "saitama",
    password: "12345678",
  },
];

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", function (req, res) {
  res.status(200).json(dataBase);
});

app.delete("/:id", function (req, res) {
  const id = req.params.id;
  const taskToDelete = dataBase.find((t) => t.id == id);
  // console.log(typeof taskToDelete.id, "tasktodelte");
  // console.log(typeof id, "frontend id");
  dataBase = dataBase.filter((data) => data.id !== id);
  res.status(200).json(taskToDelete);
});

app.post("/new", function (req, res) {
  const newNote = { id: uuidv4(), ...req.body };
  dataBase.push(newNote);
  return res.json(newNote);
});

app.put("/:id", function (req, res) {
  const updatedTask = req.body;
  const taskToUpdateIndex = dataBase.findIndex(
    (data) => data.id == req.params.id
  );
  dataBase[taskToUpdateIndex] = updatedTask;
  res.status(200).json(updatedTask);
});

// user route
app.post("/auth", function (req, res) {
  const existingUser = users.find((user) => user.email === req.body.email);
  if (existingUser && existingUser.password === req.body.password) {
    res.status(200).json({
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
    });
  } else {
    res.status(400).json({ message: "Email or password is incorrect." });
  }
});

app.listen(5000);
