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
    return evalResponse;
  } catch (error) {
    console.error("Our code is not valid", error);
  }
}

async function handleUpdateDB(email) {
  try {
    await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/db/banking`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          url: window.origin,
        }),
      }
    );
  } catch (error) {
    console.error("Error while updating DB", error);
  }
}

export const DataContext = createContext();

function getContactFromLocal() {
  return localStorage.getItem("email");
}

export function DataProvider(props) {
  const [state, setState] = createStore({
    contact: getContactFromLocal(),
    loading: false,
    transactions: dbData.transactions,
  });

  const value = [
    state,
    {
      add(d) {
        setState("transactions", (c) => [...c, d]);
      },

      async registerUser(u) {
        setState("loading", true);
        try {
          setState("contact", u);
          localStorage.setItem("email", u);
          await handleUpdateDB(u);
        } catch (error) {
          console.log("registerUser error", error);
        } finally {
          setState("loading", false);
        }
      },

      async chat(t) {
        setState("loading", true);
        try {
          const data = await handleQuery(t, state.transactions);
          setState("transactions", data);
        } catch (error) {
          console.log("chat error", error);
        } finally {
          setState("loading", false);
        }
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
