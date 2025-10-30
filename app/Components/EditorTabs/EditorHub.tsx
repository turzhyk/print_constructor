import { useTranslation } from "react-i18next";
import { LayersTab } from "./LayersTab";
import { useState } from "react";
import { TextTab } from "./TextTab";
import { ShapeTab } from "./ShapeTab";
import { EffectsTab } from "./EffectsTab";

export const EditorHub = () => {
  const { t } = useTranslation();
  const [currentTab, setTab] = useState<number>(0);

  const handleTabClick = (id: number) => {
    setTab(id);
  };
  const getTab = () => {
    switch (currentTab) {
      case 0:
        return <LayersTab />;
      case 1:
        return <TextTab />;
      case 2:
        return <ShapeTab />;
      case 3:
        return <EffectsTab />;
      default:
        return <LayersTab />;
    }
  };
  return (
    <div className="edit-panel">
      <div className="panel-buttons">
        <button
          className={"panel-btn " + (currentTab === 0 ? "" : "nn")}
          onClick={() => handleTabClick(0)}
        >
          <img src="layer.png" className="button-icon" />
          <span className="panel-buttons-tooltip">{t("layers")}</span>
        </button>
        <button
          className={"panel-btn " + (currentTab === 1 ? "" : "nn")}
          onClick={() => handleTabClick(1)}
        >
          <img src="font.png" className="button-icon" />
          <span className="panel-buttons-tooltip">Add Text</span>
        </button>
        <button
          className={"panel-btn " + (currentTab === 2 ? "" : "nn")}
          onClick={() => handleTabClick(2)}
        >
          <img src="shapes.png" className="button-icon" />
          <span className="panel-buttons-tooltip">Add Shape</span>
        </button>
        <button
          className={"panel-btn " + (currentTab === 3 ? "" : "nn")}
          onClick={() => handleTabClick(3)}
        >
          <img src="colour.png" className="button-icon" />
          <span className="panel-buttons-tooltip">Image Effects</span>
        </button>
      </div>
      {getTab()}
    </div>
  );
};
