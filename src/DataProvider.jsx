import { data as dbData } from "./utils/db";
import { createContext } from "solid-js";
import { createStore } from "solid-js/store";

async function handleQuery(input, data) {
  let codeToRun;

  try {
    const chatResponse = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/chatgpt/banking`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      }
    );

    codeToRun = await chatResponse.text();
    console.log({ codeToRun });
  } catch (error) {
    console.error("OpenAI failed", error);
  }

  try {
    const movements = data; // don't delete, being used in `eval`
    // TODO: Improve this crap
    const evalResponse = eval(codeToRun);
    console.log({ evalResponse });
    return evalResponse;
  } catch (error) {
    console.error("Our code is not valid", error);
  }
}

export const DataContext = createContext();

export function DataProvider(props) {
  const [state, setState] = createStore({ transactions: dbData.transactions });

  const value = [
    state,
    {
      add(d) {
        setState("transactions", (c) => [...c, d]);
      },
      async chat(t) {
        const data = await handleQuery(t, state.transactions);
        setState("transactions", data);
      },
      restore() {
        setState("transactions", dbData.transactions);
      },
    },
  ];

  return (
    <DataContext.Provider value={value}>{props.children}</DataContext.Provider>
  );
}
