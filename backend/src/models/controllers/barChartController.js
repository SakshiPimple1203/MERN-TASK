exports.getBarChart = async (req, res) => {
    const { month } = req.query;
  
    try {
      const startDate = new Date(`${month} 1`);
      const endDate = new Date(startDate);
      endDate.setMonth(startDate.getMonth() + 1);
  
      const transactions = await ProductTransaction.find({
        dateOfSale: { $gte: startDate, $lt: endDate },
      });
  
      const priceRanges = [
        "0-100",
        "101-200",
        "201-300",
        "301-400",
        "401-500",
        "501-600",
        "601-700",
        "701-800",
        "801-900",
        "901-above",
      ];
  
      const counts = priceRanges.map((range, i) => {
        const [min, max] = range.split("-").map(Number);
        return {
          range,
          count: transactions.filter((t) =>
            i < priceRanges.length - 1 ? t.price >= min && t.price <= max : t.price > min
          ).length,
        };
      });
  
      res.status(200).json({ counts });
    } catch (error) {
      res.status(500).json({ error: "Error generating bar chart", details: error.message });
    }
  };
  