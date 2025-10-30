"use client";
import { useEffect, useRef, useState } from "react";
import "./constructor.css";
import BuilderCanvas from "./BuilderCanvas";
import "./i18nconfig.ts";
import { useTranslation } from "react-i18next";
import useTextureLinkStore from "./hooks/useTextureURL";

import ModelViewer from "./3d_viewer";
import LanguageSwitcher from "./Components/LanguageSwitcher";
import { useItemStore } from "./storage/useBuilderStore";
import { LayersTab } from "./Components/EditorTabs/LayersTab";
import {
  ImageProps,
  TextProps,
  useItemPropsStorage,
} from "./storage/useItemPropsStorage";
import { BuilderItemType } from "./storage/BuilderItemType";
import { ImageUploadButton } from "./Components/ImageUploadButton";
import { EditorHub } from "./Components/EditorTabs/EditorHub";
import { Header } from "./Components/Header";

export default function Home1() {

  const { t } = useTranslation();
  console.log("RERENDER");
  const [viewerOpened, setViewerOpened] = useState<boolean>(false);


  const canvasUrl = useTextureLinkStore((state) => state.link);
  
 
  return (
    <div id="root">
      <Header/>
      <div className="builder-main">
        <div className="builder-left-column">
          <ImageUploadButton/>
         <EditorHub/>
        </div>
        <div className="builder-right-column">
          <BuilderCanvas openViewer={() => setViewerOpened(true)} />
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
