const express = require("express");
const router = express.Router();

/*********************** controllers *********************************/
const { register, login } = require("../controllers/user");
const { singleBook, multipleBook, addBook, updateBook, deleteBook } = require("../controllers/book");
const { addOrder, getOrder } = require("../controllers/order")

/*********************** middlewares *********************************/
const {
  adminValidator,
  customerValidator,
} = require("../middlewares/validator");

/*********************** user routes *********************************/
router.post("/api/register", register);
router.post("/api/login", login);

/*********************** book routes *********************************/
router.get("/api/books/:id", singleBook);
router.get("/api/books", multipleBook);
router.post("/api/books", adminValidator, addBook);
router.patch("/api/books/:id", adminValidator, updateBook);
router.delete("/api/books/:id", adminValidator, deleteBook);

/*********************** order routes *********************************/
router.post("/api/order", customerValidator, addOrder);
router.get("/api/orders", adminValidator, getOrder);
	
	
module.exports = router;
