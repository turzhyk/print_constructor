import React from "react";
import { useEffect, useRef, useState } from "react";
import {
  BasicProps,
  TextProps,
  useItemPropsStorage,
} from "../storage/useItemPropsStorage";
import { Text, Transformer } from "react-konva";
import useActiveItemId from "../storage/useActiveItemId";

export const CanvasText = ({
  id,
  isActive,
}: {
  id: string;
  isActive: boolean;
}) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { setId: setActiveItem } = useActiveItemId();
  const setBasicProps = useItemPropsStorage((s)=>s.setBasicProps);
  const [tempProps, setTempProps] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({ x: 100, y: 100, width: 100, height: 100 });

  const textRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const updatePos = () => {
    const absPos = textRef.current.getClientRect();
     setBasicProps(id, {
      x: absPos.x,
      y: absPos.y,
      height: absPos.height,
      width: absPos.width,
    });
  };

  const handleTransform = () => {
    const node = textRef.current;
    const width = node.width() * node.scaleX();
    const height = node.height() * node.scaleY();
    setTempProps({ ...tempProps, width: width, height: height });
    node.scaleX(1);
    node.scaleY(1);
    console.log(node.getBoundingClientRect);
    updatePos();
  };
  const applyProps = () => {
    // setBasicProps(id, tempProps);
  };
  useEffect(() => {
    if (trRef.current && textRef.current) {
      trRef.current.nodes([textRef.current]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [isActive]);
  return (
    <React.Fragment>
      <Text
        ref={textRef}
        text="HUJ"
      //   text={textProps.value}
      //   fontSize={textProps.size}
      //   fill={textProps.color}
        x={tempProps.x}
        y={tempProps.y}
        draggable
        fontStyle={"normal"}
        width={tempProps.width}
        height={tempProps.height}
        align={"center"}
        onClick={(e) => {
          setActiveItem(id);
          updatePos();
        }}
        stroke={"#3D50FC"}
        strokeWidth={1}
        strokeEnabled={isHovered}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onDragStart={(e) => setActiveItem(id)}
        onDragMove={(e) => updatePos()}
        //   onDragEnd={(e) => applyProps()}
      ></Text>
      {isActive && (
        <Transformer
          ref={trRef}
          rotationSnaps={[0, 90, 180, 270]}
          rotationSnapTolerance={5}
          anchorCornerRadius={20}
          anchorSize={15}
          anchorStroke={"#3D50FC"}
          borderStroke={"#3D50FC"}
          rotateLineVisible={false}
          keepRatio={false}
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
          onTransform={handleTransform}
        />
      )}
    </React.Fragment>
  );
};
