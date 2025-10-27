
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Rect,
  Text,
  Transformer,
} from "react-konva";
import React, { useState, useEffect, useRef, useReducer } from "react";

import "./i18nconfig";
import { useTranslation } from "react-i18next";

import Konva from "konva";
import { NodeConfig, Node, KonvaEventObject } from "konva/lib/Node";
import useTextureLinkStore from "./hooks/useTextureURL";
import useActiveItemId from "./storage/useActiveItemId";
import { useItemStore } from "./storage/useBuilderStore";
import { BuilderItemType } from "./storage/BuilderItemType";
import { BasicProps, TextProps, useItemPropsStorage } from "./storage/useItemPropsStorage";
import { CanvasText } from "./Components/CanvasText";

const canvasSize = { x: 945, y: 405 };
const BuilderCanvas = ({
  openViewer,
}: {
  openViewer: () => void;
}) => {
  const { t } = useTranslation();
  const [editText, setEditText] = useState<string>("Sample Text");
  const [editTextSize, setEditTextSize] = useState<number>(16);
  const [textStyle, setTextStyle] = useState<{
    italic: boolean;
    bold: boolean;
  }>({ italic: false, bold: false });
  const [editTextColor, setEditTextColor] = useState<string>("");
  const stageRef = React.useRef<Konva.Stage>(null);
  const setUri = useTextureLinkStore((state) => state.setLink);

  const activeItemId = useActiveItemId((state) => (state.id));
  const setActiveItem = useActiveItemId((state) => (state.setId));

  const {items, addItem, removeItem, renameItem } = useItemStore();
  // const {itemsProps, getItemById:getPropById, setBasicProps} = useItemPropsStorage();

  const [activeImageProps, setActiveImageProps] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>();

  // State to track current scale and dimensions
  const [stageSize, setStageSize] = useState({
    width: 21,
    height: 9,
  });

  const handleExport = () => {
    if (stageRef.current != null) {
      const uri = stageRef.current.toDataURL();
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
  const getStyleString = () => {
    if (!textStyle.bold && !textStyle.italic) return "normal";
    const line =
      (textStyle.italic ? "italic " : "") + (textStyle.bold ? "bold " : "");
    return line;
  };
  // const getToolsTooltip = (visible: boolean) => {
  //   const stageDom = stageRef.current?.container();
  //   const rect = stageDom?.getBoundingClientRect() || { x: 0, y: 0 };
  //   const handleRemoveBtn =()=>{
  //     removeItem(activeItemId);
  //     setActiveItem("");
  //   }
  //   if (!activeImageProps || !visible) return;
  //   return (
  //     <div
  //       className="tools-tooltip shadow1"
  //       style={{
  //         top: activeImageProps.y + rect.y + activeImageProps.height / 2 - 40,
  //         left: activeImageProps.x + rect.x - 80,
  //       }}
  //     >
  //       <button className="tooltip-btn" onClick={handleRemoveBtn}>
  //         <img className="" src="svg/trash.svg" />
  //       </button>
  //       <button className="tooltip-btn" onClick={handleFlip}>
  //         <img className="" src="svg/flip.svg" />
  //       </button>
  //     </div>
  //   );
  // };
  // const getSizeTooltip = (visible: boolean) => {
  //   if (!activeImageProps || !visible) return;
  //   const heightCM = (activeImageProps.height / canvasSize.y) * 9;
  //   const widthCM = (activeImageProps.width / canvasSize.x) * 21;
  //   const line = heightCM.toFixed(1) + "cm x " + widthCM.toFixed(1) + "cm";

  //   const stageDom = stageRef.current?.container();
  //   const rect = stageDom?.getBoundingClientRect() || { x: 0, y: 0 };
  //   return (
  //     <div
  //       className="size-tooltip shadow1"
  //       style={{
  //         top: activeImageProps.y + rect.y + activeImageProps.height + 40,
  //         left: activeImageProps.x + rect.x + activeImageProps.width / 2 - 80,
  //       }}
  //     >
  //       <div>{line}</div>
  //     </div>
  //   );
  // };
  // const getTextTooltip = (visible: boolean) => {
    
  //   if (!visible) return;
  //   // const act = items.map((item) => {
  //   //   if (item.id === activeItemId) return item;
  //   // });
  //   const activeItem = getPropById(activeItemId);
  //   if (activeItem?.type !== BuilderItemType.Text) return;
  //   const stageDom = stageRef.current?.container();
  //   const rect = stageDom?.getBoundingClientRect() || { x: 0, y: 0 };
  //   return (
  //     <div
  //       className="text-tooltip shadow1"
  //       style={{
  //         top: activeItem.basicProps.y + rect.y + activeItem.basicProps.height + 40,
  //         left: activeItem.basicProps.x + rect.x + activeItem.basicProps.width / 2 - 80,
  //       }}
  //     >
  //       <input
  //         type="text"
  //         id="editorTextField"
  //         className="text"
  //         value={editText}
  //         onChange={(e) => {
  //           setEditText(e.target.value);
  //           renameItem(activeItemId,e.target.value);
  //         }}
  //       ></input>
  //       <span className="text-tooltip-fontsize">
  //         <img src={"/svg/font-size.svg"} draggable={false} />
  //       </span>

  //       <input
  //         className="text-tooltip-fontsize"
  //         type="number"
  //         value={editTextSize}
  //         onChange={(e) => setEditTextSize(parseInt(e.target.value))}
  //       />
  //       {/* <button className="text-tooltip-size-btn">
  //         <img
  //           src={"/svg/arrow-down.svg"}
  //           onClick={() => setEditTextSize(editTextSize - 1)}
  //         />
  //       </button>
  //       <button className="text-tooltip-size-btn">
  //         <img
  //           src={"/svg/arrow-up.svg"}
  //           onClick={() => setEditTextSize(editTextSize + 1)}
  //         />
  //       </button> */}
  //       <span>
  //         <button
  //           className={"text-tooltip-btn " + (textStyle.bold ? "act" : "")}
  //         >
  //           <img
  //             src={"/svg/bold.svg"}
  //             onClick={() => handleStyleChange("bold")}
  //           />
  //         </button>
  //         <button
  //           className={"text-tooltip-btn " + (textStyle.italic ? "act" : "")}
  //         >
  //           <img
  //             src={"/svg/italic.svg"}
  //             onClick={() => handleStyleChange("italic")}
  //           />
  //         </button>
  //         <span
  //           className="text-tooltip-color"
  //           style={{ backgroundColor: editTextColor }}
  //           onClick={() =>
  //             document.getElementById("text-tooltip-color-input")!.click()
  //           }
  //         >
  //           <input
  //             id="text-tooltip-color-input"
  //             type="color"
  //             className="text-tooltip-color"
  //             onChange={(e) => setEditTextColor(e.target.value)}
  //           />
  //         </span>
  //       </span>
  //     </div>
  //   );
  // };
  useEffect(() => {
    setStageSize({
      width: document.getElementById("builder-canvas")?.clientWidth!,
      height: document.getElementById("builder-canvas")?.clientHeight!,
    });
  }, []);
  useEffect(() => {}, [activeImageProps, activeItemId]);
  return (
    <div id="canvas-holder" className="canvas-holder shadow1">
      <div className="stage-buttons">
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
      </div>

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
                    file={f.file}
                    type={f.type}
                    setActiveImage={setActiveItem}
                    isActive={activeItemId === f.id}
                    setActiveImageProps={setActiveImageProps}
                  />
                );
              else  if (f.type === BuilderItemType.Text)
              {
                // const props = getPropById(activeItemId)?.props as TextProps;
                // const basicProps =  getPropById(activeItemId)?.basicProps as BasicProps;
                return (
                  <CanvasText
                    key={f.id}
                    id={f.id}
                    
                    isActive={activeItemId === f.id}
                  //  textProps={props}
                  //  basicProps={basicProps}
                  //  setBasicProps={setBasicProps}
                  ></CanvasText>
                );}
            })}
            {/* <Transformer></Transformer> */}
          </Layer>
        </Stage>
      </div>

      {/* {getSizeTooltip(activeItemId !== "")}
      {getToolsTooltip(activeItemId !== "")}
      {getTextTooltip(activeItemId !== "")} */}
    </div>
  );
};

function CanvasImage({
  file,
  id,
  isActive,
  setActiveImage,
  setActiveImageProps,
}: {
  file?: File;
  id: string;
  type: string;
  isActive: boolean;
  setActiveImage: (id: string) => void;
  setActiveImageProps: (props: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
}) {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [imgScale, setImgScale] = useState<{ x: number; y: number }>({
    x: 1,
    y: 1,
  });
  const [imgOffset, setImgOffset] = useState<{ x: number; y: number }>({
    x: 1,
    y: 1,
  });
  const [pixelSize, setPixelSize] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [imgPos, setImgPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const imgRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const rotatorIcon = new window.Image();
  rotatorIcon.src = "/svg/rotate.svg";
  function handleDrag(e: KonvaEventObject<MouseEvent, Node<NodeConfig>>) {
    const node = e.target;
    const abs = node.getClientRect();

    if (!isActive) setActiveImage(id);

    sendProps();
    setImgPos({ x: abs.x, y: abs.y });
  }
  const sendProps = () => {
    const absPos = imgRef.current.getClientRect();

    setActiveImageProps({
      x: absPos.x,
      y: absPos.y,
      height: absPos.height,
      width: absPos.width,
    
    });
  };
  const handleTransform = () => {
    sendProps();
  };
  const fitCanvas = (w: number, h: number) => {
    const ratio = h / document.getElementById("builder-canvas")?.clientHeight!;
    if (ratio > 1) {
      const newHeight = 1 / (ratio * 1.3);
      const newWidth = 1 / (ratio * 1.3);

      setImgScale({ x: newWidth, y: newHeight });
    }
  };

  const handleEnter = (e: KonvaEventObject<MouseEvent>) =>
    fillAnchor(e.target.name(), "#3D50FC");

  const handleLeave = (e: KonvaEventObject<MouseEvent>) =>
    fillAnchor(e.target.name(), "white");

  const fillAnchor = (name: string, color: string) => {
    const anchors = trRef.current.find("Rect");
    anchors.forEach((element: any) => {
      if (name == element.name()) element.fill(color);
    });

    trRef.current.getLayer()?.batchDraw();
  };

  useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    const image = new window.Image();
    image.src = objectUrl;
    image.onload = () => {
      // setImgSize({ x: image.width, y: image.height });
      setImg(image);
      setActiveImage(id);
      setImgOffset({ x: image.width / 2, y: image.height / 2 });
      fitCanvas(image.width, image.height);

      setPixelSize({ x: image.width, y: image.height });
      sendProps();
    };

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  useEffect(() => {
    if (trRef.current && imgRef.current) {
      trRef.current.nodes([imgRef.current]);
      trRef.current.getLayer()?.batchDraw(); // <- обновляем слой
    }
  }, [isActive]);

  if (!img) return null;

  return (
    <React.Fragment>
      <KonvaImage
        image={img}
        x={canvasSize.x / 2}
        y={canvasSize.y / 2}
        ref={imgRef}
        scaleX={imgScale?.x}
        scaleY={imgScale?.y}
        offsetX={imgOffset.x}
        offsetY={imgOffset.y}
        strokeWidth={10}
        strokeEnabled={true}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={(e) => {
          setActiveImage(id);
          sendProps();
        }}
        onDragMove={(e) => {
          handleDrag(e);
        }}
        draggable
      />

      {isActive && (
        <Transformer
          ref={trRef}
          rotationSnaps={[0, 90, 180, 270]}
          rotationSnapTolerance={5}
          anchorCornerRadius={20}
          anchorSize={15}
          anchorStroke={"#3D50FC"}
          borderStroke={"#3D50FC"}
          onMouseEnter={(e) => handleEnter(e)}
          onMouseLeave={(e) => handleLeave(e)}
          onTransform={(e) => {
            handleTransform();
          }}
          enabledAnchors={[
            "top-left",
            "top-right",
            "bottom-left",
            "bottom-right",
          ]}
          anchorStyleFunc={(anchor) => {
            if (anchor.hasName("rotater")) {
              anchor.size({ width: 25, height: 25 });
              anchor.offsetX(12);
            }
          }}
        />
      )}
    </React.Fragment>
  );
}

// const CanvasText = ({
//   id,
//   isActive,
//   setActiveImage,
//   text,
//   align,
//   size,
//   style,
//   color,
//   setActiveImageProps,
// }: {
//   id: string;
//   isActive: boolean;
//   setActiveImage: (id: string) => void;
//   text: string;
//   align: string;
//   size: number;
//   style: string;
//   color: string;

//   setActiveImageProps: (props: {
//     x: number;
//     y: number;
//     width: number;
//     height: number;
//     realHeight: number;
//     realWidth: number;
//   }) => void;
// }) => {
//   const [props, setProps] = useState<{
//     x: number;
//     y: number;
//     width: number;
//     height: number;
//     align: string;
//   }>({
//     x: canvasSize.x / 2 + Math.random() * 20,
//     y: canvasSize.y / 2 + Math.random() * 20,
//     width: 100,
//     height: 50,
//     align: align,
//   });
//   const [isHovered, setIsHovered] = useState<boolean>(false);
//   const textRef = useRef<any>(null);
//   const trRef = useRef<any>(null);
//   const sendProps = () => {
//     const absPos = textRef.current.getClientRect();

//     setActiveImageProps({
//       x: absPos.x,
//       y: absPos.y,
//       height: absPos.height,
//       width: absPos.width,
//       realHeight: textRef.current.getHeight(),
//       realWidth: textRef.current.getWidth(),
//     });
//   };
//   const handleTransform = () => {
//     const node = textRef.current;
//     setProps({
//       ...props,
//       width: node.width() * node.scaleX(),
//       height: node.height() * node.scaleY(),
//     });
//     node.scaleX(1);
//     node.scaleY(1);

//     sendProps();
//   };
//   useEffect(() => {
//     if (trRef.current && textRef.current) {
//       trRef.current.nodes([textRef.current]);
//       trRef.current.getLayer()?.batchDraw(); // <- обновляем слой
//     }
//   }, [isActive]);
//   return (
//     <React.Fragment>
//       <Text
//         ref={textRef}
//         text={text}
//         fontSize={size}
//         fill={color}
//         x={props.x}
//         y={props.y}
//         draggable
//         fontStyle={style}
//         width={props.width}
//         height={props.height}
//         align={props.align}
//         onClick={(e) => {
//           setActiveImage(id);
//           sendProps();
//         }}
//         stroke={"#3D50FC"}
//         strokeWidth={1}
//         strokeEnabled={isHovered}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         onDragStart={(e) => setActiveImage(id)}
//         onDragMove={(e) => sendProps()}
//       ></Text>
//       {isActive && (
//         <Transformer
//           ref={trRef}
//           rotationSnaps={[0, 90, 180, 270]}
//           rotationSnapTolerance={5}
//           anchorCornerRadius={20}
//           anchorSize={15}
//           anchorStroke={"#3D50FC"}
//           borderStroke={"#3D50FC"}
//           rotateLineVisible={false}
//           keepRatio={false}
//           enabledAnchors={[
//             "top-left",
//             "top-right",
//             "bottom-left",
//             "bottom-right",
//           ]}
//           anchorStyleFunc={(anchor) => {
//             if (anchor.hasName("rotater")) {
//               anchor.size({ width: 25, height: 25 });
//               anchor.offsetX(12);
//             }
//           }}
//           onTransform={handleTransform}
//         />
//       )}
//     </React.Fragment>
//   );
// };
export default BuilderCanvas;
