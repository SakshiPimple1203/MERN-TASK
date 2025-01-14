const { getStatistics } = require("./statisticsController");
const { getBarChart } = require("./barChartController");
const { getPieChart } = require("./pieChartController");

exports.getCombinedData = async (req, res) => {
  const { month } = req.query;

  try {
    const statisticsPromise = getStatistics({ query: { month } });
    const barChartPromise = getBarChart({ query: { month } });
    const pieChartPromise = getPieChart({ query: { month } });

    const [statistics, barChart, pieChart] = await Promise.all([
      statisticsPromise,
      barChartPromise,
      pieChartPromise,
    ]);

    const combinedData = {
      statistics: statistics.data,
      barChart: barChart.data,
      pieChart: pieChart.data,
    };

    res.status(200).json(combinedData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching combined data", details: error.message });
  }
};
