const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//add mongoose paginate

const path = require("path");

const WallartSchema = new Schema(
  {
    title: String,
    desc: String,
    imgsrc: String,
    price: Number,
    // change imgsrc to object later with url, filename for cloudinary
    // author
    // reviews
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Wallart", WallartSchema);
