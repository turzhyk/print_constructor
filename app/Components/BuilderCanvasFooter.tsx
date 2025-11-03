"use client";
import React, { useState } from "react";
import ModelViewer from "../3d_viewer";
import useTextureLinkStore from "../hooks/useTextureURL";
import { useTranslation } from "react-i18next";
import { PresetsType } from "@react-three/drei/helpers/environment-assets";
// import dynamic from "next/dynamic";
// const ModelViewer = dynamic(
//   () => import('../3d_viewer'),
//   { ssr: false }
// );
export const BuilderCanvasFooter = ({
  openViewer,
}: {
  openViewer: () => void;
}) => {
  const canvasUrl = useTextureLinkStore((s) => s.link);
  const [bg, setBg] = useState<PresetsType>("city");

  const { t } = useTranslation();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = "stage.png";
    link.href = canvasUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div className="canvas-footer">
      <div className="canvas-footer-tools">
        <button className="download-jpg" onClick={handleDownload}>
          <span>{t("download_jpg")}</span>
          <img src="svg/download.svg" />
        </button>
      </div>

      <div className="vl"></div>
      <div className="canvas-footer-viewer" >
        <ModelViewer />
        <button >
          <img className="" src="svg/fullscreen.svg" onClick={openViewer}/>
        </button>
      </div>
    </div>
  );
};
