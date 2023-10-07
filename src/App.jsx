import AIQuery from "./components/AIQuery";
import Footer from "./components/Footer";
import Header from "./components/Header";
import TransactionForm from "./components/TransactionsForm";
import TransactionList from "./components/TransactionsList";
import { DataProvider } from "./DataProvider";
import { I18nProvider } from "./I18nProvider";

function App() {
  return (
    <I18nProvider>
      <DataProvider>
        <div class="relative bg-gray-800 min-h-screen">
          <div class="px-8 pt-4">
            <Header />

            <AIQuery />

            <div class="flex flex-col justify-center gap-8 pb-16 md:flex-row">
              <TransactionList />
              <TransactionForm />
            </div>
          </div>

          <Footer />
        </div>
      </DataProvider>
    </I18nProvider>
  );
}

export default App;
