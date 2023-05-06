const mongoose = require("mongoose");
const { Schema } = mongoose;

const BookSchema = new Schema(
  {
    title: String,
    author: String,
    category: String,
    price: Number,
    quantity: Number,
  },
  {
    versionKey: false,
  }
);

const BookModel = mongoose.model("Book", BookSchema);

module.exports = BookModel;
