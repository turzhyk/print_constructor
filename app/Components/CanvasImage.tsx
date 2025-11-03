'use client'
import Konva from "konva";
import { KonvaEventObject, NodeConfig, Node } from "konva/lib/Node";
import { useEffect, useRef, useState } from "react";
import useActiveItemId from "../storage/useActiveItemId";
import { useItemPropsStorage } from "../storage/useItemPropsStorage";
import { Image, Transformer } from "react-konva";
import React from "react";
import { useItemStore } from "../storage/useBuilderStore";

export const CanvasImage = ({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) => {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const getItemById = useItemStore((s) => s.getItemById);
  const builderItem = getItemById(id);

  const [imgScale, setImgScale] = useState<{ x: number; y: number }>({
    x: 1,
    y: 1,
  });
  const [imgOffset, setImgOffset] = useState<{ x: number; y: number }>({
    x: 1,
    y: 1,
  });
  const { setId: setActiveItemId, id: activeItemId } = useActiveItemId();
  const setBasicProps = useItemPropsStorage((s) => s.setBasicProps);
  const basicProps = useItemPropsStorage((s) => s.getItemById(id)?.basicProps);
  const [tempProps, setTempProps] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({
    x: basicProps ? basicProps.x : 0,
    y: basicProps ? basicProps.y :0,
    width:  600,
    height:  600,
  });
  const imgRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  function handleDrag(e: KonvaEventObject<MouseEvent, Node<NodeConfig>>) {
    //     const node = e.target;
    //     const abs = node.getClientRect();

    if (!isActive) setActiveItemId(id);

    updateProps();
  }
  const updateProps = () => {
    if (imgRef === null) return;
    const absPos = imgRef.current.getClientRect();
    const rot = imgRef.current.getAbsoluteRotation();
    setBasicProps(id, {
      x: absPos.x,
      y: absPos.y,
      height: absPos.height,
      width: absPos.width,
      rotation: rot,
    });
  };
  const handleTransform = () => {
    updateProps();
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
    if (!builderItem?.file) return;
    const objectUrl = URL.createObjectURL(builderItem.file);
    const image = new window.Image();
    image.src = objectUrl;
    image.onload = () => {
      // setImgSize({ x: image.width, y: image.height });
      setImg(image);
      setActiveItemId(id);
      setImgOffset({ x: image.width / 2, y: image.height / 2 });
      fitCanvas(image.width, image.height);
      updateProps();
    };

    return () => URL.revokeObjectURL(objectUrl);
  }, [builderItem?.file]);
  useEffect(() => {
    if (trRef.current && imgRef.current) {
      trRef.current.nodes([imgRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isActive]);

  if (!img) return null;

  return (
    <React.Fragment>
      <Image
        image={img}
        x={tempProps.x}
        y={tempProps.y}
        ref={imgRef}
        scaleX={imgScale?.x}
        scaleY={imgScale?.y}
        // offsetX={imgOffset.x}
        // offsetY={imgOffset.y}
        // width={tempProps.width}
        // height={tempProps.height}
        strokeWidth={10}
        strokeEnabled={true}
        onClick={(e) => {
          setActiveItemId(id);
          updateProps();
        }}
        onDragMove={(e) => {
          handleDrag(e);
        }}
        draggable
      ><Image
        image={img}
        x={tempProps.x+tempProps.width}
        y={tempProps.y}
        scaleX={imgScale?.x}
        scaleY={imgScale?.y}
        // offsetX={imgOffset.x}
        // offsetY={imgOffset.y}
        // width={tempProps.width}
        // height={tempProps.height}
        strokeWidth={10}
        strokeEnabled={true}
        onClick={(e) => {
          setActiveItemId(id);
          updateProps();
        }}
        onDragMove={(e) => {
          handleDrag(e);
        }}
      /></Image>
      

      {isActive && (
        <Transformer
          ref={trRef}
          rotationSnaps={[0, 90, 180, 270]}
          rotationSnapTolerance={5}
          anchorCornerRadius={20}
          anchorSize={10}
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
};
