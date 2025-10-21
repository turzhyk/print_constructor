import React, { useState } from "react";

export default function BuilderToolsHud({
  changeRot,
  changeScale,
  newPos,
}: {
  changeRot: (rot: number) => void;
  changeScale: (rot: number) => void;
  newPos: { x: number; y: number };
}) {
  const [elementId, setElementId] = useState();
  const [pos, setPos] = useState({ x: 0, y: 0 });
//   setPos(newPos);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    changeRot(parseInt(e.target.value));
  }
  function handleChangeScale(e: React.ChangeEvent<HTMLInputElement>) {
    changeScale(parseInt(e.target.value) / 100);
  }
  //   constPos
  return (
    <div className="tools-hud absolute p-3 bg-gray-400 " style={{left:newPos.x, top:newPos.y}}>
      <input
        type="range"
        min="0"
        max="100"
        defaultValue={50}
        step="1"
        onChange={handleChange}
      ></input>
      <input
        type="range"
        min="0"
        max="100"
        defaultValue={50}
        step="0"
        onChange={handleChangeScale}
      ></input>
    </div>
  );
}
