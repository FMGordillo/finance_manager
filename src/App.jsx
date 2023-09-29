import { useTransactions } from "./utils/api";
import TransactionList from "./components/TransactionsList";
import TransactionForm from "./components/TransactionsForm";
import AIQuery from "./components/AIQuery";

function App() {
  const [transactions, addTransaction, handleQuery] = useTransactions();

  return (
    <div class="bg-gray-800 min-h-screen p-4">
      <h1 class="text-3xl font-semibold text-white mb-4">Banking App</h1>
      <AIQuery handleQuery={handleQuery} />
      <div class="flex flex-col justify-evenly gap-4 md:flex-row">
        <TransactionList transactions={transactions} />
        <TransactionForm addTransaction={addTransaction} />
      </div>
    </div>
  );
}

export default App;
