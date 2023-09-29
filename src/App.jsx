import { useTransactions } from "./utils/api";
import TransactionList from "./components/TransactionsList";
import TransactionForm from "./components/TransactionsForm";

function App() {
  const [transactions, addTransaction] = useTransactions();

  return (
    <div class="bg-gray-800 min-h-screen p-4">
      <h1 class="text-3xl font-semibold text-white mb-4">Banking App</h1>
      <TransactionList transactions={transactions} />
      <TransactionForm addTransaction={addTransaction} />
    </div>
  );
}

export default App;
