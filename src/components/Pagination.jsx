import { For, createSignal, createEffect, useContext } from "solid-js";
import { DataContext } from "../DataProvider";

export default function Pagination(props) {
  const [state] = useContext(DataContext);

  const perPage = 5;
  const totalPages = Math.ceil(state.transactions.length / perPage);
  const { page, setPage } = props;

  createEffect(() => {
    setPage(1);
  });

  function handlePageChange(page) {
    setPage(page);
  }

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3;
    let startPage = Math.max(1, page() - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages.filter((pageNumber) => {
      const startIndex = (pageNumber - 1) * perPage;
      const endIndex = startIndex + perPage;
      return state.transactions.slice(startIndex, endIndex).length > 0;
    });
  };

  return (
    <div className="mt-4 flex justify-center gap-4">
      <button
        class={`px-3 py-2 bg-blue-500 text-white font-semibold rounded-md disabled:bg-gray-500`}
        disabled={page() === 1}
        onClick={() => handlePageChange(page() - 1)}
      >
        {"<"}
      </button>

      <div>
        <For each={getPageNumbers()}>
          {(pageNumber) => {
            return (
              <button
                class={`px-3 py-2 ${
                  pageNumber === page()
                    ? "bg-blue-500 text-white font-semibold rounded-md"
                    : "bg-blue-200 text-gray-700 rounded-md"
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            );
          }}
        </For>
      </div>

      <button
        class={`px-3 py-2 bg-blue-500 text-white font-semibold rounded-md disabled:bg-gray-500`}
        disabled={page() === totalPages}
        onClick={() => handlePageChange(page() + 1)}
      >
        {">"}
      </button>
    </div>
  );
}
