const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminValidator = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      async function (err, decoded) {
        if (err) {
          return res.status(400).json({ message: "Invalid token" });
        }

        if (decoded) {
          const isUserExist = await UserModel.findById(decoded._id);

          if (!isUserExist) {
            return res.status(404).json({ message: "No user found" });
          } else {
            if (decoded.isAdmin) {
              return next();
            }
          }
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const customerValidator = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  try {
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY,
      async function (err, decoded) {
        if (err) {
          return res.status(400).json({ message: "Invalid token" });
        }

        if (decoded) {
          const isUserExist = await UserModel.findById(decoded._id);

          if (!isUserExist) {
            return res.status(404).json({ message: "No user found" });
          } else {
            if (!decoded.isAdmin) {
              req.body.userID = decoded._id;
              return next();
            }
          }
        }
      }
    );
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { adminValidator, customerValidator };
