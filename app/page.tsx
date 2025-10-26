"use client";
import { useEffect, useRef, useState } from "react";
import "./constructor.css";
import BuilderCanvas from "./BuilderCanvas";
import "./i18nconfig.ts";
import { useTranslation } from "react-i18next";
import useTextureLinkStore from "./hooks/useTextureURL";

import ModelViewer from "./3d_viewer";
import i18next from "i18next";
import useActiveItemId from "./storage/useActiveItemId";
import LanguageSwitcher from "./Components/LanguageSwitcher";
import { BuilderItemType, useItemStore } from "./storage/useBuilderStore";
import { LayersTab } from "./Components/EditorTabs/LayersTab";

export type ImageItem = {
  id: string;
  file?: File;
  type: string;
  name: string;
};
export default function Home1() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { t } = useTranslation();
  const { items, addItem, removeItem, renameItem } = useItemStore();
  
  // const [images, setImages] = useState<ImageItem[]>([
  //   { id: "Math.random().toString(36)", type: "text", name: "Sample text" },
  // ]);

  const { id: activeItemId, setId: setActiveItem } = useActiveItemId();
  const [viewerOpened, setViewerOpened] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasUrl = useTextureLinkStore((state) => state.link);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const file = event.target.files[0];
    addItem(BuilderItemType.Image, file.name, file);
  };
  // async function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
  //   const files = event.currentTarget.files;
  //   if (!files || files.length === 0) return;

  //   const newItems = await Promise.all(
  //     Array.from(files).map(async (file) => {
  //       return {
  //         id: crypto.randomUUID(),
  //         file,
  //         x: 0,
  //         y: 0,
  //         rot: 0,
  //         scale: 1,
  //         type: "image",
  //         name: file.name,
  //       };
  //     })
  //   );
  //   // setActiveImageId(newItems[0].id);
  //   setImages((prev) => [...prev, ...newItems]);
  // }

  const handleAddText = () => {
    addItem(BuilderItemType.Text, "sample text");
  };
  const setLayerName = (value: string) => renameItem(activeItemId, value);
  const getHierarchy = () => {
    return items.toReversed().map((img, index) => (
      <div key={index} className="hierarchy-element">
        <img
          src={
            img.type === "text"
              ? "svg/text.svg"
              : img.file && URL.createObjectURL(img.file)
          }
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

          {/* <div className="layer-arrows">
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
          </div> */}
        </div>
      </div>
    ));
  };
  const removeImageElement = (id: string) => removeItem(id);
  useEffect(() => {
    const val = window.localStorage.getItem("theme");
    if (val === "dark" || val === "light") setTheme(val);
    else setTheme("light");
  }, []);
  useEffect(() => {}, [items]);
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <div id="root">
      <div onClick={()=>handleAddText()} className="header">
        <span>
          <img src="dp_logo.jpeg" />
          <h1>{t("mug_editor")}</h1>
        </span>

        <div className="header-buttons">
          <button className="theme-btn shadow1">
            <img
              src={"svg/sun2.svg"}
              className={theme! === "dark" ? "" : "nn"}
            />
            <img
              src={"svg/night.svg"}
              className={theme! === "dark" ? "nn" : ""}
            />
          </button>
          <LanguageSwitcher />
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
            <LayersTab/>
          </div>
        </div>
        <div className="builder-right-column">
          <BuilderCanvas
            openViewer={() => setViewerOpened(true)}
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
      <footer></footer>
    </div>
  );
}
