"use client";
import { useEffect, useRef, useState } from "react";
import "./constructor.css";
import BuilderCanvas from "./builder_canvas";
import "./i18nconfig.ts";
import { useTranslation } from "react-i18next";

import ModelViewer from "./3d_viewer";
import i18next from "i18next";

export type ImageItem = {
  id: string;
  file?: File;
  type: string;
  name: string;
};
export default function Home1() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [lang, setLang] = useState<"en" | "pl">(() => {
    if (typeof window === "undefined") return "en";
    const val = window.localStorage.getItem("lang");
    if (val === "en" || val === "pl") return val;
    else return "en";
  });

  const { t } = useTranslation();
  const [images, setImages] = useState<ImageItem[]>([
    { id: "Math.random().toString(36)", type: "text", name: "Sample text" },
  ]);

  const [activeImageId, setActiveImageId] = useState<string>("");

  const [canvasUrl, setCanvasUrl] = useState<string>("");
  const [viewerOpened, setViewerOpened] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.currentTarget.files;
    if (!files || files.length === 0) return;

    const newItems = await Promise.all(
      Array.from(files).map(async (file) => {
        return {
          id: crypto.randomUUID(),
          file,
          x: 0,
          y: 0,
          rot: 0,
          scale: 1,
          type: "image",
          name: file.name,
        };
      })
    );
    // setActiveImageId(newItems[0].id);
    setImages((prev) => [...prev, ...newItems]);
  }

  const handleAddText = () => {
    setImages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        x: 0,
        y: 0,
        rot: 0,
        scale: 1,
        type: "text",
        name: "",
      },
    ]);
  };
  const setLayerName = (value: string) => {
    console.log(value);
    setImages((images) =>
      images.map((img) => {
        if (img.id === activeImageId) return { ...img, name: value };
        else return img;
      })
    );
  };
  const handleArrowClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    i: number,
    dir: number
  ) => {
    if (dir == 1) {
      if (i == 0) return;
      const newItems = [...images];
      [newItems[i], newItems[i - 1]] = [newItems[i - 1], newItems[i]];
      setImages(newItems);
    } else if (dir == -1) {
      if (images.length - 1 <= i) return;
      const newItems = [...images];
      [newItems[i], newItems[i + 1]] = [newItems[i + 1], newItems[i]];
      setImages(newItems);
    }
  };
  const getHierarchy = () => {
    return images.toReversed().map((img, index) => (
      <div key={index} className="hierarchy-element">
        <img
          src={img.type === "text"? "svg/text.svg":img.file && URL.createObjectURL(img.file) }
          draggable={false}
        ></img>
        {img.name}
        <div className="layer-buttons">
          <button
            className="hierarchy-element-remove"
            onClick={() => removeImageElement(img.id)}
          >
            <img className="icon iconThemed" src="svg/trash.svg" />
          </button>

          <div className="layer-arrows">
            <button
              className="layer-arrow-btn"
              onClick={(e) => handleArrowClick(e, index, 1)}
            >
              <img className="iconThemed" src="svg/arrow-up.svg"></img>
            </button>
            <button
              className="layer-arrow-btn"
              onClick={(e) => handleArrowClick(e, index, -1)}
            >
              <img
                className=" rotate180 iconThemed"
                src="svg/arrow-up.svg"
              ></img>
            </button>
          </div>
        </div>
      </div>
    ));
  };
  const removeImageElement = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
    if (id === activeImageId) setActiveImageId("");
  };
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const toggleLang = () => setLang(lang === "pl" ? "en" : "pl");
  useEffect(() => {
    const val = window.localStorage.getItem("theme");
    if (val === "dark" || val === "light") setTheme(val);
    else return setTheme("light");
  }, []);
  useEffect(() => {}, [images, canvasUrl]);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    localStorage.setItem("lang", lang);
    i18next.changeLanguage(lang);
  }, [theme, lang]);
  return (
    <div id="root">
      <div className="header">
        <span>
          <img onClick={toggleTheme} src="dp_logo.jpeg" />
          <h1>{t("mug_editor")}</h1>
        </span>

        <div className="header-buttons">
          <button onClick={toggleTheme} className="theme-btn shadow1">
            <img
              src={"svg/sun2.svg"}
              className={theme! === "dark" ? "" : "nn"}
            />
            <img
              src={"svg/night.svg"}
              className={theme! === "dark" ? "nn" : ""}
            />
          </button>
          <div className="lang-btn">
            <input
              checked={lang === "pl"}
              type="checkbox"
              onChange={toggleLang}
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
        </div>
      </div>
      <div className="builder-main">
        <div className="builder-left-column">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/png, image/jpeg"
            onChange={handleImageUpload}
            multiple
          ></input>
          <button className="uploadImg-btn shadow1" onClick={handleUploadClick}>
            <span>{t("upload_image")}</span>
            <img src="upload.png"></img>
          </button>
          <div className="edit-panel">
            <div className="panel-buttons">
              <button className="panel-btn ">
                <img src="layer.png" className="button-icon" />
                <span className="panel-buttons-tooltip">{t("layers")}</span>
              </button>
              <button className="panel-btn nn">
                <img src="font.png" className="button-icon" />
                <span className="panel-buttons-tooltip">Add Text</span>
              </button>
              <button className="panel-btn nn">
                <img src="shapes.png" className="button-icon" />
                <span className="panel-buttons-tooltip">Add Shape</span>
              </button>
              <button className="panel-btn nn">
                <img src="colour.png" className="button-icon" />
                <span className="panel-buttons-tooltip">Image Effects</span>
              </button>
            </div>
            <div className="panel-layers">
              <div className="panel-title">{t("layers")}</div>
              <hr />
              <div className="panel-layers-content">{getHierarchy()}</div>
            </div>
          </div>
        </div>
        <div className="builder-right-column">
          
            <BuilderCanvas
              images={images}
              setActiveImage={setActiveImageId}
              activeImageId={activeImageId}
              setUrl={setCanvasUrl}
              setLayerName={(e) => setLayerName(e)}
              openViewer={() => setViewerOpened(true)}
              removeActiveImage={() => removeImageElement(activeImageId)}
            />
         
        </div>
      </div>
      {viewerOpened && (
        <div className="overlay">
          <div className="viewer-canvas" id="viewer-canvas">
            <button onClick={() => setViewerOpened(false)}>Close</button>
            <ModelViewer canvasUrl={canvasUrl} />
          </div>
        </div>
      )}
      <footer ></footer>
    </div>
  );
}
