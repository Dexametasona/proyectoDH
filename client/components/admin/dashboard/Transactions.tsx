import React from "react";
import { transactions } from "@/constants";
import TransactionsCards from "./TransactionsCards";

const Transactions = () => {
  return (
    <div className="w-80 bg-green-300 h-[calc(100vh-200px)] overflow-y-scroll self-end">
      <p>Últimas Transacciones</p>
      {transactions.map((transaction) => (
        <div key={transaction.name}>
          <TransactionsCards item={transactions} />
        </div>
      ))}
    </div>
  );
};

export default Transactions;
