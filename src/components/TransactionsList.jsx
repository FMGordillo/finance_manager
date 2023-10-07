import { For, Show, createEffect, createSignal, useContext } from "solid-js";
import { DataContext } from "../DataProvider";
import RefreshIcon from "../assets/refresh-outline.svg";
import Pagination from "./Pagination";

function TransactionList() {
  const [state, { restore }] = useContext(DataContext);

  // Current page in the pagination
  const [page, setPage] = createSignal(1);

  // Data to show, updates when page changes
  const [transactions, setTransactions] = createSignal([]);
  // Sum of transactions
  const [total, setTotal] = createSignal(0);

  function handlePageChange(page) {
    setPage(page);
  }

  createEffect(() => {
    const initial = (page() - 1) * 5;
    const end = initial + 5;
    setTransactions(state.transactions.slice(initial, end));
    setTotal(
      state.transactions
        .reduce((acc, transaction) => acc + +transaction.amount, 0)
        .toLocaleString(),
    );
  });

  return (
    <div class="relative md:min-w-[350px] bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      {/* Opacity overlay */}
      <Show when={state.loading}>
        <div class="absolute inset-0 bg-gray-900 opacity-50 flex items-center justify-center">
          <div class="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 border-opacity-75" />
        </div>
      </Show>

      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">Total: ${total}</h2>
        <Show when={state.transactions.length !== 1000}>
          <button
            disabled={state.loading}
            onClick={restore}
            class="bg-blue-500 px-3 py-1 rounded-md disabled:bg-gray-500"
          >
            <img class="w-4 h-4" src={RefreshIcon} />
          </button>
        </Show>
      </div>

      <ul>
        <For each={transactions()}>
          {(transaction) => (
            <li
              class="grid grid-cols-3 justify-between items-center py-2"
              key={transaction.id}
            >
              <span class="truncate">{transaction.description}</span>
              <span
                class={`text-center text-${
                  transaction.amount >= 0 ? "green" : "red"
                }-500`}
              >
                ${transaction.amount}
              </span>
              <span class="text-right truncate">
                {new Date(transaction.created_at).toLocaleString("es-ES", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </li>
          )}
        </For>
      </ul>

      <Pagination page={page} setPage={handlePageChange} />
    </div>
  );
}

export default TransactionList;
