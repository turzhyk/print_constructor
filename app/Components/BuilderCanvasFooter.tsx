import React from "react";
import ModelViewer from "../3d_viewer";
import useTextureLinkStore from "../hooks/useTextureURL";
import { useTranslation } from "react-i18next";

export const BuilderCanvasFooter = () => {
  const canvasUrl = useTextureLinkStore((s) => s.link);

  const {t} = useTranslation();

  const handleDownload= ()=>{
const link = document.createElement('a');
    link.download = 'stage.png';
    link.href = canvasUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  return (
    <div className="canvas-footer">
      <div className="canvas-footer-tools"><button className="download-jpg" onClick={handleDownload}>{t("download_jpg")}</button></div>
      <div className="vl"></div>
      <div className="canvas-footer-viewer">
        <ModelViewer canvasUrl={canvasUrl} />
        <button >
          <img className="" src="svg/fullscreen.svg" />
        </button>
      </div>
    </div>
  );
};
