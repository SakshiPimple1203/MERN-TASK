const ProductTransaction = require("../models/ProductTransaction");

exports.getPieChart = async (req, res) => {
  const { month } = req.query;

  try {
    const startDate = new Date(`${month} 1`);
    const endDate = new Date(startDate);
    endDate.setMonth(startDate.getMonth() + 1);

    const transactions = await ProductTransaction.find({
      dateOfSale: { $gte: startDate, $lt: endDate },
    });

    const categoryCounts = transactions.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + 1;
      return acc;
    }, {});

    const result = Object.keys(categoryCounts).map((category) => ({
      category,
      count: categoryCounts[category],
    }));

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error: "Error generating pie chart", details: error.message });
  }
};
