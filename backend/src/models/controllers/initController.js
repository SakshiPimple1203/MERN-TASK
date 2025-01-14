const axios = require("axios");
const ProductTransaction = require("../models/ProductTransaction");

exports.initializeDatabase = async (req, res) => {
  try {
    const { data } = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );

    await ProductTransaction.deleteMany(); // Clear existing data
    await ProductTransaction.insertMany(data); // Insert new data

    res.status(200).json({ message: "Database initialized successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error initializing database", details: error.message });
  }
};
