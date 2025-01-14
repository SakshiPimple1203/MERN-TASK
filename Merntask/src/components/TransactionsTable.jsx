import React, { useState, useEffect } from "react";
import axios from "axios";
 import "./style.css";

const TransactionsTable = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchTransactions();
  }, [selectedMonth, page, search]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/transactions", {
        params: { month: selectedMonth, page, search },
      });
      setTransactions(response.data.transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  return (
    <div>
      <h2>Transactions Table</h2>
      <input
        type="text"
        placeholder="Search transactions..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px", padding: "5px" }}
      />
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Date of Sale</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.title}</td>
              <td>{transaction.description}</td>
              <td>{transaction.price}</td>
              <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              <td>{transaction.sold ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Previous</button>
      <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
    </div>
  );
};

export default TransactionsTable;
