const express = require("express");
const app = express();
const path = require("path");

const mongoose = require("mongoose");
const db_con = require(path.join(__dirname, "/utils/dbcon"));

app.get("/", (req, res) => {
  res.send("API running");
});

/*Make ASYNC later with error handling*/
app.get("/api/wallarts", (req, res) => {});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
