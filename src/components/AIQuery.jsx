import { createSignal, useContext } from "solid-js";
import { DataContext } from "../DataProvider";

function AIQuery() {
  const [, { chat }] = useContext(DataContext);
  const [prompt, setPrompt] = createSignal("");

  function handleSubmit(e) {
    e.preventDefault();
    chat(prompt());
  }

  return (
    <form onsubmit={handleSubmit}>
      <label class="container mx-auto flex flex-col items-center mb-4">
        <span class="text-white">Tu query</span>
        <div class="flex gap-2">
          <input
            class="px-2 w-80 max-w-lg"
            onInput={(e) => setPrompt(e.target.value)}
            placeholder="Buscá movimientos menores a 1000"
            type="text"
            value={prompt()}
          />
          <input class="px-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md focus:outline-none focus:ring focus:ring-blue-300" type="submit" value=">" />
        </div>
      </label>
    </form>
  );
}

export default AIQuery;
