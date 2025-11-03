'use client'
import { useCanvasStore } from "@/app/storage/useCanvasStore";
import { useItemPropsStorage } from "@/app/storage/useItemPropsStorage";
import Konva from "konva";

export const SizeTooltip = ({
  targetId,
  stageRef,
}: {
  targetId: string;
  stageRef: React.RefObject<Konva.Stage | null>;
}) => {
  const { getItemById } = useItemPropsStorage();
  const getSize = useCanvasStore(s=>s.getSize);
  const activeImageProps = getItemById(targetId)?.basicProps;
  if (!activeImageProps) return;
  const heightCM = (activeImageProps.height / getSize().height) * 9;
  const widthCM = (activeImageProps.width / getSize().width) * 21;
  const line = heightCM.toFixed(1) + "cm x " + widthCM.toFixed(1) + "cm "+ activeImageProps.rotation.toFixed() + "°";

  if (stageRef === null) return;
  const stageDom = stageRef.current?.container();
  const rect = stageDom?.getBoundingClientRect() || { x: 0, y: 0 };
  return (
    <div
      className="size-tooltip shadow1"
      style={{
        top: activeImageProps.y + rect.y + activeImageProps.height + 40,
        left: activeImageProps.x + rect.x + activeImageProps.width / 2 - 80,
      }}
    >
      <div>{line}</div>
    </div>
  );
};
