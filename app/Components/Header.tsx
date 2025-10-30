import React, { useEffect, useState } from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";

export const Header = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const {t} = useTranslation();
  useEffect(() => {
    const val = window.localStorage.getItem("theme");
    if (val === "dark" || val === "light") setTheme(val);
    else setTheme("light");
  }, []);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <div className="header">
      <span>
        <img src="dp_logo.jpeg" />
        <h1>{t("mug_editor")}</h1>
      </span>

      <div className="header-buttons">
        <button
          className="theme-btn shadow1"
          onClick={() => setTheme(theme! === "dark" ? "light" : "dark")}
        >
          <img src={"svg/sun2.svg"} className={theme! === "dark" ? "" : "nn"} />
          <img
            src={"svg/night.svg"}
            className={theme! === "dark" ? "nn" : ""}
          />
        </button>
        <LanguageSwitcher />
      </div>
    </div>
  );
};
