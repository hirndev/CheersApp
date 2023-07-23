const { boolean } = require("joi");
const mongoose = require("mongoose");
// const mongoosePaginate = require("mongoose-paginate-v2");

const path = require("path");
const Menu = require(path.join(__dirname, "/dbMenu"));
const User = require(path.join(__dirname, "/dbUsers"));

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    orderItems: [
      {
        item: {
          type: Schema.Types.ObjectId,
          ref: "Menu",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    orderTotal: {
      type: Number,
      required: true,
    },
    tableNo: {
      type: Number,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    paymentStatus: {
      type: Boolean,
      required: true,
      // add paypal id later
    },
    orderStatus: {
      // 0 = pending, 1 = complete
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// OrderSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Orders", OrderSchema);
