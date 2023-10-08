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
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", function (req, res) {
  res.status(200).json(dataBase);
});

app.delete("/:id", function (req, res) {
  const id = req.params.id;
  const taskToDelete = dataBase.find((t) => t.id == id);
  dataBase.splice(
    dataBase.findIndex((a) => a.id === id),
    1
  );
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
app.listen(5000);
