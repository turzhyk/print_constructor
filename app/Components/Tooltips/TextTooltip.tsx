import { BuilderItemType } from "@/app/storage/BuilderItemType";
import { useItemStore } from "@/app/storage/useBuilderStore";
import {
  TextProps,
  useItemPropsStorage,
} from "@/app/storage/useItemPropsStorage";
import Konva from "konva";

export const TextTooltip = ({
  targetId,
  stageRef,
}: {
  targetId: string;
  stageRef: React.RefObject<Konva.Stage | null>;
}) => {
  const {
    getItemById,
    setTextValue,
    setTextColor,
    setTextSize,
    setItalic,
    setBold,
  } = useItemPropsStorage();
  const renameItem = useItemStore(s=>s.renameItem);
  const activeItem = getItemById(targetId);
  const textProps = activeItem?.props as TextProps;
  if (!activeItem) return;
  if (
    activeItem.type != BuilderItemType.Text ||
    activeItem.basicProps === undefined
  )
    return;
  const stageDom = stageRef.current?.container();
  const rect = stageDom?.getBoundingClientRect() || { x: 0, y: 0 };
  return (
    <div
      className="text-tooltip shadow1"
      style={{
        top:
          activeItem.basicProps.y + rect.y + activeItem.basicProps.height + 40,
        left:
          activeItem.basicProps.x +
          rect.x +
          activeItem.basicProps.width / 2 -
          80,
      }}
    >
      <input
        type="text"
        id="editorTextField"
        className="text"
        value={textProps.value}
        onChange={(e) => {
          setTextValue(targetId, e.target.value);
          renameItem(targetId,e.target.value);
        }}
      ></input>
      <span className="text-tooltip-fontsize">
        <img src={"/svg/font-size.svg"} draggable={false} />
      </span>

      <input
        className="text-tooltip-fontsize"
        type="number"
        value={textProps.size}
        onChange={(e) => setTextSize(targetId, parseInt(e.target.value))}
      />
      {/* <button className="text-tooltip-size-btn">
          <img
            src={"/svg/arrow-down.svg"}
            onClick={() => setEditTextSize(editTextSize - 1)}
          />
        </button>
        <button className="text-tooltip-size-btn">
          <img
            src={"/svg/arrow-up.svg"}
            onClick={() => setEditTextSize(editTextSize + 1)}
          />
        </button> */}
      <span>
        <button
          className={"text-tooltip-btn " + (textProps.bold ? "act" : "")}
          onClick={() => setBold(targetId, !textProps.bold)}
        >
          <img src={"/svg/bold.svg"} />
        </button>
        <button
          className={"text-tooltip-btn " + (textProps.italic ? "act" : "")}
          onClick={() => setItalic(targetId, !textProps.italic)}
        >
          <img src={"/svg/italic.svg"} />
        </button>
        <span
          className="text-tooltip-color"
          style={{ backgroundColor: textProps.color }}
          onClick={() =>
            document.getElementById("text-tooltip-color-input")!.click()
          }
        >
          <input
            id="text-tooltip-color-input"
            type="color"
            className="text-tooltip-color"
            value={textProps.color}
            onChange={(e) => setTextColor(targetId, e.target.value)}
          />
        </span>
      </span>
    </div>
  );
};
