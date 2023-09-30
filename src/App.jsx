import AIQuery from "./components/AIQuery";
import TransactionForm from "./components/TransactionsForm";
import TransactionList from "./components/TransactionsList";
import { DataProvider } from "./DataProvider";

function App() {

  return (
    <DataProvider>
      <div class="relative bg-gray-800 min-h-screen">
        <div class="px-8 pt-4">
          <h1 class="container mx-auto text-3xl font-semibold text-white mb-2">
            Banking App
          </h1>
          <h2 class="container mx-auto text-2xl font-semibold text-white mb-4">
            by{" "}
            <a
              class="underline text-blue-400 hover:text-blue-300"
              href="https://chirotech.dev"
            >
              ChiroTech
            </a>
          </h2>

          <AIQuery />

          <div class="flex flex-col justify-center gap-8 pb-16 md:flex-row">
            <TransactionList />
            <TransactionForm />
          </div>
        </div>

        <footer class="absolute flex justify-center w-full bottom-0 mb-4">
          <p class="text-white">
            Created by{" "}
            <a
              class="underline text-blue-400 hover:text-blue-300"
              href="https:/chirotech.dev"
              rel="noreferrer noopener"
              target="_blank"
            >
              ChiroTech
            </a>{" "}
            powered by{" "}
            <a
              class="underline text-blue-400 hover:text-blue-300"
              href="https://chat.openai.com"
              rel="noreferrer noopener"
              target="_blank"
            >
              ChatGPT
            </a>
          </p>
        </footer>
      </div>
    </DataProvider>
  );
}

export default App;
