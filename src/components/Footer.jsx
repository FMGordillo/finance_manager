import { useContext } from "solid-js";
import { I18nContext } from "../I18nProvider";

export default function Footer() {
  const [t] = useContext(I18nContext);

  return (
    <footer class="absolute flex justify-center w-full bottom-0 mb-4">
      <p class="text-white">
        {t("footer-1")}{" "}
        <a
          class="underline text-blue-400 hover:text-blue-300"
          href="https://chirotech.dev"
          rel="noreferrer noopener"
          target="_blank"
        >
          ChiroTech
        </a>{" "}
        {t("footer-2")}{" "}
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
  );
}
