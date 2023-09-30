import { createEffect, createSignal, useContext } from "solid-js";
import { createPagination } from "@solid-primitives/pagination";
import { DataContext } from "../DataProvider";

function TransactionList() {
  const [state, { restore }] = useContext(DataContext);
  const [total, setTotal] = createSignal(0);
  const [pages, setPages] = createSignal(Math.ceil(state.transactions.length / 5))


  const [paginationProps, page] = createPagination({
    pages: pages(),
    maxPages: 2,
  });

  const [data, setData] = createSignal([]);

  createEffect(() => {
    console.log({ state });
    const initial = (page() - 1) * 5;
    const end = initial + 5;
    // TODO: This is not working!
    setPages(Math.ceil((state.transactions.length || 1) / 5));
    setData(state.transactions.slice(initial, end));
    setTotal(
      state.transactions
        .reduce((acc, transaction) => acc + +transaction.amount, 0)
        .toLocaleString()
    );
  });

  return (
    <div class="md:min-w-[350px] bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-semibold">Total: ${total}</h2>
        {state.transactions.length !== 1000 && (
          <button onClick={restore} class="bg-gray-500 px-3 py-1 rounded-md">R</button>
        )}
      </div>

      <ul>
        {data().map((transaction) => (
          <li
            class="flex justify-between items-center py-2"
            key={transaction.id}
          >
            <span class="truncate">{transaction.description}</span>
            <span
              class={`text-${transaction.amount >= 0 ? "green" : "red"}-500`}
            >
              ${transaction.amount}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex justify-center">
        <For each={paginationProps()}>
          {(props) => (
            <button
              {...props}
              class="px-3 py-2 bg-blue-500 text-white font-semibold rounded-md disabled:bg-gray-500"
            />
          )}
        </For>
      </div>
    </div>
  );
}

export default TransactionList;
