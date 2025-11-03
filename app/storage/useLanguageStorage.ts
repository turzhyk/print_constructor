'use client'
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ILanguage {
  lang: "en" | "pl";
  toggleLang: () => void;
}
const useLanguageStorage = create<ILanguage>()(
  persist(
    (set, get) => ({
      lang: "en",
      toggleLang: () =>
        set((state) => ({ lang: state.lang === "en" ? "pl" : "en" })),
    }),
    { name: "lang" }
  )
);
export default useLanguageStorage;
