import { createSignal, useContext } from "solid-js";
import { DataContext } from "../DataProvider";

function AIQuery() {
  const [state, { registerUser, chat }] = useContext(DataContext);
  const [prompt, setPrompt] = createSignal("");

  async function beforeSubmit() {
    if (!state.contact) {
      const email = window.prompt(
        "Before continuing, please give us your email. This will avoid spam in our servers"
      );
      const regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;

      if (!regex.test(email)) {
        alert("Not valid email, sorry");
        throw new Error("not valid email");
      } else {
        await registerUser(email);
      }
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await beforeSubmit();
    chat(prompt());
  }

  async function handleCompletition(e) {
    setPrompt(e.target.outerText);
    await beforeSubmit();
    chat(e.target.outerText);
  }

  return (
    <div class="container mx-auto flex flex-col mb-8">
      <form class="container mx-auto flex flex-col" onsubmit={handleSubmit}>
        <label class=" flex flex-col items-center">
          <span class="text-white">Tu query</span>
          <div class="flex gap-2">
            <input
              class="px-2 w-60 md:w-80 md:max-w-lg"
              onInput={(e) => setPrompt(e.target.value)}
              placeholder="Buscá movimientos menores a 1000"
              type="text"
              value={prompt()}
            />
            <input
              disabled={state.loading}
              class="px-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-300 disabled:bg-gray-500"
              type="submit"
              value=">"
            />
          </div>
        </label>
      </form>

      <div class="flex flex-col mt-4">
        <div class="flex justify-center flex-wrap gap-4">
          <button
            class="text-sm py-1 px-4 text-white border border-gray-400 rounded-lg"
            role="button"
            onClick={handleCompletition}
          >
            Get movements above 150 dollars
          </button>
          <button
            class="text-sm py-1 px-4 text-white border border-gray-400 rounded-lg"
            role="button"
            onClick={handleCompletition}
          >
            Mostrame movimientos entre el año pasado y este año
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIQuery;
