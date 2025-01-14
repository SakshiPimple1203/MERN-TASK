import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionsTable from "./components/TransactionsTable";
import TransactionsStatistics from "./components/TransactionsStatistics";
import TransactionsBarChart from "./components/TransactionsBarChart";

const App = () => {
  const [month, setMonth] = useState("March");


  const months = [
    "January", "February", "March", "April", "May", 
    "June", "July", "August", "September", "October", "November", "December"
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1>Transactions Dashboard</h1>
      
      {}
      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        style={{ marginBottom: "20px", padding: "5px" }}
      >
        {months.map((m, index) => (
          <option key={index} value={m}>{m}</option>
        ))}
      </select>

      {}
      <TransactionsStatistics selectedMonth={month} />
      <TransactionsTable selectedMonth={month} />
      <TransactionsBarChart selectedMonth={month} />
    </div>
  );
};

export default App;
