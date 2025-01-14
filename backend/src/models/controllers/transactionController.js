const ProductTransaction = require("../models/ProductTransaction");

exports.getTransactions = async (req, res) => {
  const { page = 1, perPage = 10, search = "" } = req.query;

  const query = search
    ? {
        $or: [
          { title: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { price: Number(search) || { $exists: false } },
        ],
      }
    : {};

  try {
    const transactions = await ProductTransaction.find(query)
      .skip((page - 1) * perPage)
      .limit(Number(perPage));

    const totalRecords = await ProductTransaction.countDocuments(query);

    res.status(200).json({ transactions, totalRecords });
  } catch (error) {
    res.status(500).json({ error: "Error fetching transactions", details: error.message });
  }
};
