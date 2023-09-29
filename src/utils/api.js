import OpenAI from "openai";
import { data as dbData } from "./db";
import { createSignal, createEffect } from "solid-js";

let transactions = [];

export function useTransactions() {
  const [data, setData] = createSignal(transactions);

  async function handleQuery(input) {
    let codeToRun;

    try {
      const openAI = new OpenAI({
        apiKey: import.meta.env.VITE_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true,
      });

      const response = await openAI.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are a code generator. Given this TS type: `type Movements = { description: string; amount: number; created_at: Date }[]` return the corresponding filter method to return the desired result. Only return the filter's method (like `movements.filter`), and don't use external libraries",
          },
          { role: "user", content: input },
        ],
        model: "gpt-3.5-turbo",
      });
      codeToRun = response.choices[0].message.content;
      console.log({ codeToRun });
    } catch (error) {
      console.error("OpenAI failed", error);
    }

    try {
      const movements = dbData.transactions; // don't delete, being used in `eval`
      // TODO: Improve this crap
      const evalResponse = eval(codeToRun);
      console.log({ evalResponse });
    } catch (error) {
      console.error("Our code is not valid", error);
    }
  }

  createEffect(() => {
    setData(dbData.transactions);
    // const fetchedTransactions = dbData.transactions;
    // transactions = fetchedTransactions;
    // setData(fetchedTransactions);
  });

  function addTransaction(newTransaction) {
    setData([...data(), newTransaction]);
  }

  return [data, addTransaction, handleQuery];
}
