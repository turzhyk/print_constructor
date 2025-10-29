import { Stage, Layer, Rect } from "react-konva";
import React, { useState, useEffect} from "react";

import "./i18nconfig";
import { useTranslation } from "react-i18next";

import Konva from "konva";
import useTextureLinkStore from "./hooks/useTextureURL";
import useActiveItemId from "./storage/useActiveItemId";
import { useItemStore } from "./storage/useBuilderStore";
import { BuilderItemType } from "./storage/BuilderItemType";
import { CanvasText } from "./Components/CanvasText";
import { SizeTooltip } from "./Components/Tooltips/SizeTooltip";
import { ToolsTooltip } from "./Components/Tooltips/ToolsTooltip";
import { TextTooltip } from "./Components/Tooltips/TextTooltip";
import { CanvasImage } from "./Components/CanvasImage";
import { BuilderCanvasFooter } from "./Components/BuilderCanvasFooter";
import { useItemPropsStorage } from "./storage/useItemPropsStorage";

const canvasSize = { x: 945, y: 405 };
const BuilderCanvas = ({ openViewer }: { openViewer: () => void }) => {
  const { t } = useTranslation();
  const [textStyle, setTextStyle] = useState<{
    italic: boolean;
    bold: boolean;
  }>({ italic: false, bold: false });

  const stageRef = React.useRef<Konva.Stage>(null);
  const setUri = useTextureLinkStore((state) => state.setLink);


  const { id: activeItemId, setId: setActiveItem } = useActiveItemId();

  const items = useItemStore((s) => s.items);
  const [stageSize, setStageSize] = useState({
    width: 21,
    height: 9,
  });

  const handleExport = () => {
    if (stageRef.current != null) {
      const uri = stageRef.current.toDataURL({pixelRatio:4});
      console.log(uri);
      setUri(uri);
    }
  };
  const handleFlip = () => {};
  const handleStyleChange = (style: keyof typeof textStyle) => {
    setTextStyle((prev) => ({
      ...prev,
      [style]: !prev[style],
    }));
  };
  useEffect(() => {
    setStageSize({
      width: document.getElementById("builder-canvas")?.clientWidth!,
      height: document.getElementById("builder-canvas")?.clientHeight!,
    });
  
  }, []);
  useEffect(() => { handleExport();}, [activeItemId]);
  return (
    <div id="canvas-holder" className="canvas-holder shadow1">
      {/* <div className="stage-buttons">
        <span className="cup-type-panel">
          <span>Podstawowy kubek:</span>
          <button>
            <img
              src={
                "https://a.allegroimg.com/s64/11480f/4072acbe4376bd0b1eda9f5ae697"
              }
            />
          </button>
        </span>
        <button
          className="stage-3d-btn"
          onClick={() => {
            setActiveItem("");
            handleExport();
            openViewer();
          }}
        >
          <span>{t("see_in_3d")}</span>
          <img src="svg/cube.svg" />
        </button>
      </div> */}
      <div className="builder-canvas" id="builder-canvas">
        <Stage
          width={stageSize.width}
          height={stageSize.height}
          // width={21}
          // height={0}
          ref={stageRef}
          // className="builder-canvas "
          // id="builder-canvas"
        >
          <Layer>
            <Rect
              width={10000}
              height={10000}
              fill={"white"}
              onClick={() => setActiveItem("")}
            ></Rect>

            {items.map((f, i) => {
              if (f.type === BuilderItemType.Image)
                return (
                  <CanvasImage
                    key={f.id}
                    id={f.id}
                    isActive={activeItemId === f.id}
                  />
                );
              else if (f.type === BuilderItemType.Text) {
                return (
                  <CanvasText
                    key={f.id}
                    id={f.id}
                    isActive={activeItemId === f.id}
                  ></CanvasText>
                );
              }
            })}
          </Layer>
        </Stage>
      </div>
     <BuilderCanvasFooter/>
      {activeItemId !== "" && (
        <SizeTooltip targetId={activeItemId} stageRef={stageRef} />
      )}
      {activeItemId !== "" && (
        <ToolsTooltip targetId={activeItemId} stageRef={stageRef} />
      )}
      {activeItemId !== "" && (
        <TextTooltip targetId={activeItemId} stageRef={stageRef} />
      )}
    </div>
  );
};

export default BuilderCanvas;
