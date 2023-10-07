import { useContext } from "solid-js";
import { I18nContext } from "../I18nProvider";

export default function Header() {
  const [t] = useContext(I18nContext);

  return (
    <header class="container mx-auto">
      <h1 class="text-3xl font-semibold text-white mb-2">Banking App</h1>
      <h2 class="container mx-auto text-2xl font-semibold text-white mb-4">
        {t("subtitle-1")}{" "}
        <a
          class="underline text-blue-400 hover:text-blue-300"
          href="https://chirotech.dev"
        >
          ChiroTech
        </a>
      </h2>

      {/*
      <h1 class="container mx-auto text-3xl font-semibold text-white mb-2">
        {t("title-2")}
      </h1>

      <ol>
        <li>Something</li>
        <li>Something</li>
        <li>Something</li>
        <li>Something</li>
      </ol>
    */}
    </header>
  );
}
