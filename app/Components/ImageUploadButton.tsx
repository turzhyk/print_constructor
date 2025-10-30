import React, { useRef } from "react";
import { useTranslation } from "react-i18next";
import { useItemStore } from "../storage/useBuilderStore";

import {
  ImageProps,
  useItemPropsStorage,
} from "../storage/useItemPropsStorage";
import { BuilderItemType } from "../storage/BuilderItemType";
import { nanoid } from "nanoid";

export const ImageUploadButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();
  const addItem = useItemStore((s) => s.addItem);
  const addItemProps = useItemPropsStorage((state) => state.addItemProps);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const files = Array.from(event.target.files);
    files.map((f) => {
      const id = nanoid();
      addItem(id, BuilderItemType.Image, f.name, f);
      const props = {} as ImageProps;
      addItemProps(id, BuilderItemType.Image, props);
    });
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <>
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
    </>
  );
};
