"use client";
import { useEffect, useRef, useState } from "react";
import "./constructor.css";
import BuilderCanvas from "./BuilderCanvas";
import "./i18nconfig.ts";
import { useTranslation } from "react-i18next";

// import ModelViewer from "./3d_viewer";
import { ImageUploadButton } from "./Components/ImageUploadButton";
import { EditorHub } from "./Components/EditorTabs/EditorHub";
import { Header } from "./Components/Header";
import dynamic from "next/dynamic";
import { useSearchParams } from 'next/navigation'
const ModelViewer = dynamic(
  () => import('./3d_viewer'),
  { ssr: false }
);
export function reportWebVitals(metric:any){
  console.log(metric);
}
export default function Home1() {
  const { t } = useTranslation();
   const searchParams = useSearchParams()
  const token = searchParams.get('token')
  console.log(token);
  const [viewerOpened, setViewerOpened] = useState<boolean>(false);


  return (
    <div id="root">
      <Header />
      <div className="builder-main">
        <div className="builder-left-column">
          <ImageUploadButton />
          <EditorHub />
        </div>
        <div className="builder-right-column">
          <BuilderCanvas openViewer={() => setViewerOpened(true)} />
        </div>
      </div>
      {viewerOpened && (
        <div className="overlay">
          <div className="viewer-canvas" id="viewer-canvas">
            <button onClick={() => setViewerOpened(false)}>Close</button>
            <img src="svg/loading.svg"/>
            <ModelViewer  />
          </div>
        </div>
      )}
      <footer>
        <span>
          Crafted with passion by {" "}
          <a href="https://github.com/turzhyk" className="underline">github.com/turzhyk</a>
        </span>
      </footer>
    </div>
  );
}
