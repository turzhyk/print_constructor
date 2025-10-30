import { useItemStore } from "@/app/storage/useBuilderStore";
import { useTranslation } from "react-i18next";
import styles from "./tab.module.css";
import { BuilderItemType } from "@/app/storage/BuilderItemType";
import {
  TextProps,
  useItemPropsStorage,
} from "@/app/storage/useItemPropsStorage";

export const TextTab = () => {
  const { t } = useTranslation();
  const addItem = useItemStore((s) => s.addItem);
  const addItemProps = useItemPropsStorage((s) => s.addItemProps);
  const handleAddText = () => {
    const id = crypto.randomUUID();
    addItem(id, BuilderItemType.Text, "sample text");
    const props = {
      color: "#000000ff",
      value: "text2",
      size: 16,
      style: "normal",
    } as TextProps;
    addItemProps(id, BuilderItemType.Text, props);
  };
  return (
      
    <div className="panel-layers">
      <div className="panel-title">{t("add_text")}</div>

      <div className="panel-text-content">
        <div className="panel-text-element" onClick={handleAddText}>
          Sample Text
        </div>
         <div className="panel-text-element" onClick={handleAddText}>
          Sample Text
        </div>
      </div>
    </div>
  );
};
