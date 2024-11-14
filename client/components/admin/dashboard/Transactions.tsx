import React, { useEffect, useState } from "react";
import { transactions } from "@/constants";
import TransactionsCards from "./TransactionsCards";
import { ChevronRight } from "lucide-react";
//import { getAllUsers } from "@/lib/api_interface";
import { User } from "@/types";

const Transactions = () => {
  const [isHidden, setIsHidden] = useState(false);
  // const [transactions, setTransactions] = useState<User[]>([]);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
   }; 
  
  // useEffect(() => {
  //   const fetchTransactions = async () => {
  //     const fetchedTransactions = await getAllUsers();
  //     setTransactions(fetchedTransactions);
  //   };

  //   fetchTransactions();
  // }, []);
   console.log(transactions)
  return (

    <>
    
    <div className="relative  self-start w-80 ">
      <div className="flex justify-between  px-4  py-4">
        <h2 className="text-lg font-bold text-gray-800">Últimas Transacciones</h2>
        <button onClick={toggleVisibility} className="text-gray-500 hover:text-gray-800">
          <ChevronRight  className={`transform transition-transform ${isHidden ? "-rotate-180" : "rotate-0"}`} />
        </button>
      </div>
      <div className={` ${isHidden ? "hidden" : "block"} h-[calc(100vh-200px)]  overflow-y-scroll self-end shadow-lg  p-4`}>
        <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.name}>
            <TransactionsCards item={transaction} />
          </div>
        ))}
        </div>
      </div>
      </div>
    </>
  );
};

export default Transactions;
