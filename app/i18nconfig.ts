import i18n from "i18next";
import { initReactI18next } from "react-i18next";
i18n
  // Add React bindings as a plugin.
  .use(initReactI18next)
  // Initialize the i18next instance.
  .init({
    // Config options

    // Specifies the default language (locale) used
    // when a user visits our site for the first time.
    // We use English here, but feel free to use
    // whichever locale you want.
    lng: "pl",

    // Fallback locale used when a translation is
    // missing in the active locale. Again, use your
    // preferred locale here.
    fallbackLng: "en",

    // Enables useful output in the browser’s
    // dev console.
    debug: false,

    // Normally, we want `escapeValue: true` as it
    // ensures that i18next escapes any code in
    // translation messages, safeguarding against
    // XSS (cross-site scripting) attacks. However,
    // React does this escaping itself, so we turn
    // it off in i18next.
    interpolation: {
      escapeValue: false,
    },

    // Translation messages. Add any languages
    // you want here.
    resources: {
      // English
      en: {
        // `translation` is the default namespace.
        // More details about namespaces shortly.
        translation: {
          hello_world: "Hello, World!",
          mug_editor: "Mug editor",
          upload_image: "Upload image",
          canvas: "Canvas",
          see_in_3d: "See in 3D",
          layers: "Layers",
          add_text: "Add Text",
          download_jpg: "Download .jpg",
        },
      },
      // Arabic
      pl: {
        translation: {
          hello_world: "مرحباً بالعالم!",
          mug_editor: "Konstruktor kubków",
          upload_image: "Dodaj zdęcia",
          canvas: "Płótno",
          see_in_3d: "Pokaź w 3D",
          layers: "Warstwy",
          add_text: "Dodaj Tekst",
          download_jpg: "Pobierz .jpg",
        },
      },
    },
  });

export default i18n;
