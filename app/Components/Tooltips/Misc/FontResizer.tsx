import { useItemPropsStorage } from "@/app/storage/useItemPropsStorage";
import React, {  useEffect, useRef, useState } from "react";

export const FontResizer = ({activeId, textSize}:{activeId:string, textSize:number}) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const setTextSize = useItemPropsStorage(s=>s.setTextSize);

  const startTextSize = useRef(0); 
  const startMouseX = useRef(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLSpanElement>) => {
      setIsDragging(true);
      startMouseX.current = e.clientX;
      startTextSize.current = textSize;
      document.body.style.cursor = "ew-resize";
  };
  const handleMouseMove = (e:MouseEvent)=>{
      const deltaX =  e.clientX - startMouseX.current;
      const sizeDelta = deltaX/6;
      setTextSize(activeId, startTextSize.current + sizeDelta)
  }
   const handleMouseUp = () => {
    setIsDragging(false);
    document.body.style.userSelect = "auto";
    document.body.style.cursor = "auto";
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);
  return (
    <span
      className="text-tooltip-fontsize"
      onMouseDown={(e) => handleMouseDown(e)}
    >
      <img src={"svg/font-size.svg"} draggable={false} />
    </span>
  );
};
