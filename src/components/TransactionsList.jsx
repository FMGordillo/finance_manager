import { createEffect, createSignal } from "solid-js";
import { createPagination } from "@solid-primitives/pagination";

function TransactionList({ transactions }) {
  const [total, setTotal] = createSignal(0);
  const [paginationProps, page] = createPagination({
    pages: Math.ceil(transactions().length / 5),
    maxPages: 2,
  });

  const [data, setData] = createSignal([]);

  createEffect(() => {
    setTotal(
      transactions().reduce((acc, transaction) => acc + +transaction.amount, 0).toLocaleString()
    );
    const initial = (page() - 1) * 5
    const end = initial + 5
    setData(transactions().slice(initial, end));
  });

  return (
    <div class="bg-gray-900 text-white p-4 rounded-lg shadow-lg">
      <h2 class="text-2xl font-semibold mb-4">Total: ${total}</h2>
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
