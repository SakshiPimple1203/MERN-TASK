import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const TransactionsStatistics = ({ selectedMonth }) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    fetchStatistics();
  }, [selectedMonth]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/statistics", {
        params: { month: selectedMonth },
      });
      setStatistics(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
  };

  return (
    <div>
      <h2>Statistics</h2>
      <p>Total Sale Amount: {statistics.totalSales}</p>
      <p>Total Sold Items: {statistics.soldItems}</p>
      <p>Total Not Sold Items: {statistics.notSoldItems}</p>
    </div>
  );
};

export default TransactionsStatistics;
