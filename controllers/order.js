const OrderModel = require("../models/OrderModel");

const addOrder = async (req, res) => {
  const { userID, bookID, totalAmount } = req.body;
  try {
    const newOrder = new OrderModel({
      userID,
      bookID,
      totalAmount,
    });

    await newOrder.save();

    return res.status(201).json(newOrder);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const getOrder = async (req, res) => {
  try {
    const orders = await OrderModel.find();

    if (!orders) {
      return res.status(404).json({ message: "No orders found" });
    }

    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addOrder, getOrder };
