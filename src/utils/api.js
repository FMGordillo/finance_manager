import { data as dbData } from "./db";
import { createSignal, createEffect } from 'solid-js';

let transactions = [];

export function useTransactions() {
  const [data, setData] = createSignal(transactions);

  createEffect(() => {
    setData(dbData.transactions);
    // const fetchedTransactions = dbData.transactions;
    // transactions = fetchedTransactions;
    // setData(fetchedTransactions);
  });

  function addTransaction(newTransaction) {
    setData([...data(), newTransaction]);
  }

  return [data, addTransaction];
}

