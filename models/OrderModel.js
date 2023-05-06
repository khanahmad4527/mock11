const mongoose = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema(
  {
    userID: String,
    bookID: [String],
    totalAmount: Number,
  },
  {
    versionKey: false,
  }
);

const OrderModel = mongoose.model("order", OrderSchema);

module.exports = OrderModel;
