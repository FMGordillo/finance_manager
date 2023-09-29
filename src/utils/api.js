import { data as dbData } from "./db";
import { createSignal, createEffect } from 'solid-js';

let transactions = [];

export function useTransactions() {
  const [data, setData] = createSignal(transactions);

  createEffect(() => {
    // const fetchedTransactions = dbData.transactions;
    // transactions = fetchedTransactions;
    // setData(fetchedTransactions);
  });

  function addTransaction(newTransaction) {
    setData([...data(), newTransaction]);
    dbData.transactions.push(newTransaction);
  }

  return [data, addTransaction];
}

