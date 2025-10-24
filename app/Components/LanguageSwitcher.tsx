import React, { useEffect } from "react";
import useLanguageStorage from "../storage/useLanguageStorage";
import i18next from "i18next";
import i18n from "../i18nconfig";
export default function LanguageSwitcher() {
  const lang = useLanguageStorage((state) => state.lang);
  const switchLang = useLanguageStorage((state) => state.toggleLang);

  const handleToggle = () => switchLang();
  useEffect(() => {
        console.log(lang);
    i18next.changeLanguage(lang);
  }, [lang]);

  return (
    <div className="lang-btn">
      <input
        checked={lang === "pl"}
        type="checkbox"
        onChange={handleToggle}
      ></input>
      <label>
        {" "}
        <span className="flag flag-left">
          <img src="/united-kingdom.png" />
        </span>
        <span className="flag flag-right">
          <img src="/poland.png" />
        </span>
      </label>
    </div>
  );
}
