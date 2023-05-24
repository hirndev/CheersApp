const express = require("express");
const app = express();
const path = require("path");

const mongoose = require("mongoose");
const db_con = require(path.join(__dirname, "/utils/dbcon"));

const WallartSchema = require(path.join(__dirname, "/models/dbWallarts"));

app.use(express.urlencoded({ extended: true })); //to read req.body.example in app.post for POST methods
// app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("API running");
});

/*Make ASYNC later with error handling*/
app.get("/api/wallart", async (req, res) => {
  const all_wallart = await WallartSchema.find({});
  res.json(all_wallart);
});

app.post("/api/wallart", async (req, res) => {
  console.log(req.body);
  const new_wallart = new WallartSchema(req.body.wallart);
  // req.body.wallart
  await new_wallart.save();
  res.send("saved");
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
