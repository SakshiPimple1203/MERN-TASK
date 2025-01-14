const express = require("express");
const { getPieChart } = require("../controllers/pieChartController");

const router = express.Router();
router.get("/pie-chart", getPieChart);

module.exports = router;
