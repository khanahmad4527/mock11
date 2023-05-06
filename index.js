const express = require("express");
const cors = require("cors");
const connection = require("./config/db");
const router = require("./routes/routes");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/", router);

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connected to mongoDB");
  } catch (error) {
    console.log("Not able to connect to mongoDB:", error);
  }
  console.log(`Listening to server on PORT ${PORT}`);
});
