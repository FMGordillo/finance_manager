import { createSignal } from "solid-js";

function TransactionForm({ addTransaction }) {
  let descriptionInput;

  const [description, setDescription] = createSignal("");
  const [amount, setAmount] = createSignal(0);

  const handleSubmit = (e) => {
    try {
      e.preventDefault();
      const newTransaction = {
        description: description(),
        amount: +amount(),
      };
      addTransaction(newTransaction);
      setDescription("");
      setAmount(0);
      descriptionInput.focus();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form
      class="bg-gray-900 text-white p-4 rounded-lg shadow-lg mt-4"
      onSubmit={handleSubmit}
    >
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium">
          Description
        </label>
        <input
          ref={descriptionInput}
          type="text"
          id="description"
          className="w-full px-3 py-2 mt-1 bg-gray-800 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Description"
          value={description()}
          onInput={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium">
          Amount
        </label>
        <input
          type="number"
          id="amount"
          className="w-full px-3 py-2 mt-1 bg-gray-800 text-white rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="Amount"
          value={amount()}
          onInput={(e) => setAmount(+e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-300"
      >
        Add Transaction
      </button>
    </form>
  );
}

export default TransactionForm;