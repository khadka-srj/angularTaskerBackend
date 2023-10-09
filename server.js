const express = require("express");
const app = express();
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

let dataBase = [
  {
    id: 1,
    text: "testing1",
    day: "2023-10-24T18:15:00.000Z",
  },
  {
    id: 2,
    text: "testing2",
    day: "2023-10-24T18:15:00.000Z",
  },
];
let users = [
  {
    id: 1,
    email: "suraj@gmail.com",
    name: "suraj",
    password: "1234",
  },
  {
    id: 2,
    email: "saitama@gmail.com",
    name: "saitama",
    password: "1234",
  },
];

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", function (req, res) {
  res.status(200).json(dataBase);
});

app.delete("/:id", function (req, res) {
  const id = parseInt(req.params.id);
  const taskToDelete = dataBase.find((t) => t.id === id);
  dataBase = dataBase.filter((data) => data.id !== id);
  res.status(200).json(taskToDelete);
});

app.post("/new", function (req, res) {
  const newNote = { id: uuidv4(), ...req.body };
  dataBase.push(newNote);
  res.send(newNote);
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
    console.log(existingUser);
    console.log(req.body);
    res.status(400).json({ message: "Email or password is incorrect." });
  }
});

app.listen(5000);
