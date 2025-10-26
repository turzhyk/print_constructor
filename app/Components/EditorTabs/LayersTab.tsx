import { useItemStore } from "@/app/storage/useBuilderStore";
import { useTranslation } from "react-i18next";

export const LayersTab = () => {
  const { t } = useTranslation();
  const { items, removeItem } = useItemStore();
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
            onClick={() => removeItem(img.id)}
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
  return (
    <div className="panel-layers">
      <div className="panel-title">{t("layers")}</div>
      <hr />
      <div className="panel-layers-content">{getHierarchy()}</div>
    </div>
  );
};
