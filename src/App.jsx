import AIQuery from "./components/AIQuery";
import TransactionForm from "./components/TransactionsForm";
import TransactionList from "./components/TransactionsList";
import { DataProvider } from "./DataProvider";

function App() {
  return (
    <DataProvider>
      <div class="bg-gray-800 min-h-screen p-4">
        <h1 class="text-3xl font-semibold text-white mb-4">Banking App</h1>

        <AIQuery />

        <div class="flex flex-col justify-evenly gap-4 md:flex-row">
          <TransactionList />
          <TransactionForm />
        </div>
      </div>
    </DataProvider>
  );
}

export default App;
