const BookModel = require("../models/BookModel");

const addBook = async (req, res) => {
  const { title, author, category, price, quantity } = req.body;
  try {
    const newBook = new BookModel({
      title,
      author,
      category,
      price,
      quantity,
    });

    await newBook.save();

    return res.status(201).json(newBook);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const singleBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await BookModel.findById(id);

    if (!book) {
      return res.status(404).json({ message: "No book found" });
    }

    return res.status(200).json(book);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const multipleBook = async (req, res) => {
  const { category, author } = req.query;

  const filter = {};

  if (category) {
    filter.category = { $in: category };
  }

  if (author) {
    filter.author = new RegExp(author, "i");
  }

  try {
    const books = await BookModel.find(filter);

    if (!books) {
      return res.status(404).json({ message: "No book found" });
    }

    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await BookModel.findById(id);

    if (!book) {
      return res.status(404).json({ message: "No book found" });
    }

    const updatedBook = await BookModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    return res.status(204).json(updatedBook);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await BookModel.findById(id);

    if (!book) {
      return res.status(404).json({ message: "No book found" });
    }

    const deletedBook = await BookModel.findByIdAndDelete(id);

    return res.status(202).json(deletedBook);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addBook, singleBook, multipleBook, updateBook, deleteBook };
