import React, { useEffect, useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2"; 
import axios from "axios";
import "./style.css";


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TransactionsBarChart = ({ selectedMonth }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchBarChartData();
  }, [selectedMonth]);

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/bar-chart", {
        params: { month: selectedMonth },
      });
      setChartData(response.data.counts);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
    }
  };

  const data = {
    labels: chartData.map((item) => item.range),
    datasets: [
      {
        label: "Number of Items",
        data: chartData.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  return (
    <div>
      <h2>Bar Chart</h2>
      <Bar data={data} />
    </div>
  );
};

export default TransactionsBarChart;
