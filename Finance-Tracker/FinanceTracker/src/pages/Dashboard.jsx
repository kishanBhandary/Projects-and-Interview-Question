import { useState } from "react";
import { FaArrowUp, FaArrowDown, FaWallet } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import "./Dashboard.css";

export default function Dashboard() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("General");

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const data = [
    { name: "Income", value: income },
    { name: "Expenses", value: expense },
  ];

  const COLORS = ["#27a3aeff", "#e74c3c"];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount) return;

    setTransactions([
      ...transactions,
      { id: Date.now(), type, amount: parseFloat(amount), category },
    ]);
    setAmount("");
  };

  return (
    <div className="dashboard">
      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card income">
          <FaArrowUp className="icon" />
          <h3>Income</h3>
          <p>${income}</p>
        </div>
        <div className="card expense">
          <FaArrowDown className="icon" />
          <h3>Expenses</h3>
          <p>${expense}</p>
        </div>
        <div className="card balance">
          <FaWallet className="icon" />
          <h3>Balance</h3>
          <p>${income - expense}</p>
        </div>
      </div>

      {/* Transaction Form */}
      <div className="transaction-form card">
        <h3>Add Transaction</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="General">General</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
            <option value="Travel">Travel</option>
          </select>
          <button type="submit">Add</button>
        </form>
      </div>

      {/* Transactions + Chart */}
      <div className="bottom-section">
        <div className="transaction-list card">
          <h3>Transactions</h3>
          <ul>
            {transactions.map((t) => (
              <li key={t.id}>
                <span>{t.type}</span> - ${t.amount} ({t.category})
              </li>
            ))}
          </ul>
        </div>

        <div className="chart-section card">
          <h3>Spending Breakdown</h3>
          <PieChart width={300} height={300}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      </div>
    </div>
  );
}
