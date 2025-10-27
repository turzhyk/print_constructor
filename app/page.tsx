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
import { useItemStore } from "./storage/useBuilderStore";
import { LayersTab } from "./Components/EditorTabs/LayersTab";
import { ImageProps, TextProps, useItemPropsStorage } from "./storage/useItemPropsStorage";
import { BuilderItemType } from "./storage/BuilderItemType";
import { color } from "three/tsl";


export default function Home1() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { t } = useTranslation();
  const { items, addItem, removeItem, renameItem } = useItemStore();
  const addItemProps = useItemPropsStorage((state)=>state.addItemProps);
  console.log("rr")
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
    const id = crypto.randomUUID();
    addItem(id,BuilderItemType.Image, file.name, file);
    const props = {} as ImageProps;
    addItemProps(id, BuilderItemType.Image, props);
  };

  const handleAddText = () => {
    const id = crypto.randomUUID();
    addItem(id,BuilderItemType.Text, "sample text");
    const props = {color:"#FFFFF", value:"text", size:16,style:"normal"} as TextProps;
    addItemProps(id, BuilderItemType.Text, props);
  };
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
