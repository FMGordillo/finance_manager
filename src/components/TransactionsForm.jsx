import { DataContext } from "../DataProvider";
import { createSignal, useContext } from "solid-js";
import { I18nContext } from "../I18nProvider";

function TransactionForm() {
  let descriptionInput;

  const [t] = useContext(I18nContext);
  const [state, { add }] = useContext(DataContext);
  const [description, setDescription] = createSignal("");
  const [amount, setAmount] = createSignal(0);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      const newTransaction = {
        description: description(),
        amount: +amount(),
        created_at: new Date().toISOString(),
      };
      add(newTransaction);
      setDescription("");
      setAmount(0);
      descriptionInput.focus();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      class="md:min-w-[350px] bg-gray-900 text-white p-4 rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium">
          {t("form-description-label")}
        </label>
        <input
          ref={descriptionInput}
          type="text"
          id="description"
          className="w-full px-3 py-2 mt-1 bg-gray-800 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder={t("form-description-placeholder")}
          value={description()}
          onInput={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium">
          {t("form-amount-label")}
        </label>
        <input
          type="number"
          id="amount"
          className="w-full px-3 py-2 mt-1 bg-gray-800 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder={t("form-amount-placeholder")}
          value={amount()}
          onInput={(e) => setAmount(+e.target.value)}
        />
      </div>
      <button
        disabled={state.loading}
        type="submit"
        className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-300 disabled:bg-gray-700 disabled:text-gray-400"
      >
        {t("form-button")}
      </button>
    </form>
  );
}

export default TransactionForm;
