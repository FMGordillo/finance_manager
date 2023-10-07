import {
  Show,
  Suspense,
  createContext,
  createResource,
  createSignal,
} from "solid-js";
import { translator, resolveTemplate, flatten } from "@solid-primitives/i18n";

export const I18nContext = createContext();

const dictionary = {
  es: {
    "title-2": "Cómo funciona",
    "subtitle-1": "por",
    "input-placeholder": "Buscá movimientos menores a 1000 dólares",
    "suggestion-1": "Obtené movimientos mayores a 150 dólares",
    "suggestion-2": "Mostrame movimientos entre el año pasado y hoy",
    "form-button": "Agregar movimiento",
    "form-description-label": "Descripción",
    "form-description-placeholder": "Descripción",
    "form-amount-label": "Monto",
    "form-amount-placeholder": "150",
    "footer-1": "Creado por",
    "footer-2": "potenciado por",
  },
  en: {
    "subtitle-1": "by",
    "title-2": "How it works",
    "input-placeholder": "Search for transactions below 1000 dollars",
    "suggestion-1": "Get transactions above 150 dollars",
    "suggestion-2": "Show me transactions between last year and today",
    "form-button": "Add transaction",
    "form-description-label": "Description",
    "form-description-placeholder": "Description",
    "form-amount-label": "Amount",
    "form-amount-placeholder": "150",
    "footer-1": "Created by",
    "footer-2": "powered by",
  },
};

async function fetchDictionary(locale) {
  return flatten(dictionary[locale]);
}

function getUserLanguage() {
  let language = window.navigator.language;

  if (Array.isArray(language)) {
    language = language[0].split("-")[0];
  } else {
    language = language.split("-")[0];
  }

  if (!dictionary[language]) {
    return "es";
  }

  return language;
}

export function I18nProvider(props) {
  console.log(window);
  const [locale, setLocale] = createSignal(getUserLanguage());
  const [dict] = createResource(locale, fetchDictionary);
  const t = translator(dict, resolveTemplate);

  return (
    <Suspense>
      <Show when={dict()}>
        <I18nContext.Provider value={[t, setLocale]}>
          {props.children}
        </I18nContext.Provider>
      </Show>
    </Suspense>
  );
}
