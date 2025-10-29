import useActiveItemId from "@/app/storage/useActiveItemId";
import { useItemStore } from "@/app/storage/useBuilderStore";
import { useItemPropsStorage } from "@/app/storage/useItemPropsStorage";
import Konva from "konva";

export const ToolsTooltip = ({
  targetId,
  stageRef,
}: {
  targetId: string;
  stageRef: React.RefObject<Konva.Stage | null>;
}) => {
  const { getItemById } = useItemPropsStorage();
  const activeImageProps = getItemById(targetId)?.basicProps;
  const duplicateItemProps = useItemPropsStorage((s) => s.duplicateItemProps);

  const removeItem = useItemStore((s) => s.removeItem);
  const duplicateItem = useItemStore((s) => s.duplicateItem);

  const activeItemId = useActiveItemId((s) => s.id);
  const setActiveItem = useActiveItemId((s) => s.setId);

  if (stageRef === null) return;
  const stageDom = stageRef.current?.container();
  const rect = stageDom?.getBoundingClientRect() || { x: 0, y: 0 };
  const handleRemoveBtn = () => {
    removeItem(activeItemId);
    setActiveItem("");
  };
  const handleDuplicate = () => {
    const newId = crypto.randomUUID();
    duplicateItem(targetId, newId);
    duplicateItemProps(targetId, newId);
    setActiveItem(newId);
  };
  const handleFlip = () => {};
  if (!activeImageProps) return;
  return (
    <div
      className="tools-tooltip shadow1"
      style={{
        top: activeImageProps.y + rect.y + activeImageProps.height / 2 - 40,
        left: activeImageProps.x + rect.x - 80,
      }}
    >
      <button className="tooltip-btn" onClick={handleRemoveBtn}>
        <img className="" src="svg/trash.svg" />
      </button>
      <button className="tooltip-btn" onClick={handleFlip}>
        <img className="" src="svg/flip.svg" />
      </button>
      <button className="tooltip-btn" onClick={handleDuplicate}>
        <img className="" src="svg/duplicate2.svg" />
      </button>
    </div>
  );
};
