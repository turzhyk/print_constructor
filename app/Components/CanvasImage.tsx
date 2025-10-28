// import Konva from "konva";
// import { KonvaEventObject, NodeConfig, Node } from "konva/lib/Node";
// import { useEffect, useRef, useState } from "react";
// import useActiveItemId from "../storage/useActiveItemId";
// import { useItemPropsStorage } from "../storage/useItemPropsStorage";
// import { Image, Transformer } from "react-konva";
// import React from "react";

// export const CanvasImage = ({
//   id,
//   isActive,
// }: {
//   id: string;
//   isActive: boolean;
// }) => {
//   const [img, setImg] = useState<HTMLImageElement | null>(null);
//   const [imgScale, setImgScale] = useState<{ x: number; y: number }>({
//     x: 1,
//     y: 1,
//   });
//   const [imgOffset, setImgOffset] = useState<{ x: number; y: number }>({
//     x: 1,
//     y: 1,
//   });
//   const { setId: setActiveItem } = useActiveItemId();
//   const { setBasicProps } = useItemPropsStorage();
//   const [tempProps, setTempProps] = useState<{
//     x: number;
//     y: number;
//     width: number;
//     height: number;
//   }>({ x: 100, y: 100, width: 100, height: 100 });
//   const imgRef = useRef<any>(null);
//   const trRef = useRef<any>(null);
//   const rotatorIcon = new window.Image();
//   rotatorIcon.src = "/svg/rotate.svg";

//   function handleDrag(e: KonvaEventObject<MouseEvent, Node<NodeConfig>>) {
//     const node = e.target;
//     const abs = node.getClientRect();

//     if (!isActive) setActiveItem(id);

//     updateProps();
//   }
//   const updateProps = () => {
//     if (imgRef === null) return;
//     const absPos = imgRef.current.getClientRect();
//     setBasicProps(id, {
//       x: absPos.x,
//       y: absPos.y,
//       height: absPos.height,
//       width: absPos.width,
//     });
//   };
//   const handleTransform = () => {
//     updateProps();
//   };
//   const fitCanvas = (w: number, h: number) => {
//     const ratio = h / document.getElementById("builder-canvas")?.clientHeight!;
//     if (ratio > 1) {
//       const newHeight = 1 / (ratio * 1.3);
//       const newWidth = 1 / (ratio * 1.3);

//       setImgScale({ x: newWidth, y: newHeight });
//     }
//   };

//   const handleEnter = (e: KonvaEventObject<MouseEvent>) =>
//     fillAnchor(e.target.name(), "#3D50FC");

//   const handleLeave = (e: KonvaEventObject<MouseEvent>) =>
//     fillAnchor(e.target.name(), "white");

//   const fillAnchor = (name: string, color: string) => {
//     const anchors = trRef.current.find("Rect");
//     anchors.forEach((element: any) => {
//       if (name == element.name()) element.fill(color);
//     });

//     trRef.current.getLayer()?.batchDraw();
//   };

//   useEffect(() => {
//     if (!file) return;
//     const objectUrl = URL.createObjectURL(file);
//     const image = new window.Image();
//     image.src = objectUrl;
//     image.onload = () => {
//       // setImgSize({ x: image.width, y: image.height });
//       setImg(image);
//       setActiveImage(id);
//       setImgOffset({ x: image.width / 2, y: image.height / 2 });
//       fitCanvas(image.width, image.height);

//       setPixelSize({ x: image.width, y: image.height });
//       updateProps();
//     };

//     return () => URL.revokeObjectURL(objectUrl);
//   }, [file]);
//   useEffect(() => {
//     if (trRef.current && imgRef.current) {
//       trRef.current.nodes([imgRef.current]);
//       trRef.current.getLayer()?.batchDraw(); // <- обновляем слой
//     }
//   }, [isActive]);

//   if (!img) return null;

//   return (
//     <React.Fragment>
//       <Image
//         image={img}
//         x={canvasSize.x / 2}
//         y={canvasSize.y / 2}
//         ref={imgRef}
//         scaleX={imgScale?.x}
//         scaleY={imgScale?.y}
//         offsetX={imgOffset.x}
//         offsetY={imgOffset.y}
//         strokeWidth={10}
//         strokeEnabled={true}
//         onMouseEnter={() => setIsHovered(true)}
//         onMouseLeave={() => setIsHovered(false)}
//         onClick={(e) => {
//           setActiveImage(id);
//           updateProps();
//         }}
//         onDragMove={(e) => {
//           handleDrag(e);
//         }}
//         draggable
//       />

//       {isActive && (
//         <Transformer
//           ref={trRef}
//           rotationSnaps={[0, 90, 180, 270]}
//           rotationSnapTolerance={5}
//           anchorCornerRadius={20}
//           anchorSize={15}
//           anchorStroke={"#3D50FC"}
//           borderStroke={"#3D50FC"}
//           onMouseEnter={(e) => handleEnter(e)}
//           onMouseLeave={(e) => handleLeave(e)}
//           onTransform={(e) => {
//             handleTransform();
//           }}
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
//         />
//       )}
//     </React.Fragment>
//   );
// };
