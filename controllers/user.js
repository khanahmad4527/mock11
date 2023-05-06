const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const register = async (req, res) => {
  const { name, email, password, isAdmin } = req.body;
  try {
    const isUserExist = await UserModel.findOne({ email });

    if (isUserExist) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      isAdmin,
    });

    await newUser.save();

    return res.status(201).json({ message: "Account created successful" });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const isUserExist = await UserModel.findOne({ email });

    if (!isUserExist) {
      return res.status(404).json({ message: "No user found" });
    } else {
      const { _id, name, isAdmin } = isUserExist;

      const isCorrectPassword = await bcrypt.compare(password, isUserExist.password);

      if (!isCorrectPassword) {
        return res.status(401).json({ message: "Wrong password" });
      }

      jwt.sign(
        {
          _id,
          name,
          email,
          isAdmin,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" },
        (error, token) => {
          if (error) {
            return res.status(400).json({ message: "Can not generate token" });
          }

          return res.status(201).json({ message: "Successful login", token });
        }
      );
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { register, login };
