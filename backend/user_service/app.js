const express = require("express");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("User Service Running");
});

module.exports = app;