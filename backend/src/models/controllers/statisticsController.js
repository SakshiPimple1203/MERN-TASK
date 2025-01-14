const ProductTransaction = require("../models/ProductTransaction");

exports.getStatistics = async (req, res) => {
  const { month } = req.query;

  try {
    const startDate = new Date(`${month} 1`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);

    const transactions = await ProductTransaction.find({
      dateOfSale: { $gte: startDate, $lt: endDate },
    });

    const totalSales = transactions.reduce((sum, t) => sum + (t.sold ? t.price : 0), 0);
    const soldItems = transactions.filter((t) => t.sold).length;
    const notSoldItems = transactions.filter((t) => !t.sold).length;

    res.status(200).json({ totalSales, soldItems, notSoldItems });
  } catch (error) {
    res.status(500).json({ error: "Error fetching statistics", details: error.message });
  }
};
