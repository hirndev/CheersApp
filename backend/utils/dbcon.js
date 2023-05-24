const mongoose = require("mongoose");

async function db_function() {
  await mongoose.connect("mongodb://127.0.0.1:27017/aiwallart_db");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
  console.log("aiwallart_db is Connected");
}

db_function().catch((err) => {
  console.log(err);
});
