import { useItemPropsStorage } from "@/app/storage/useItemPropsStorage";

export const SizeTooltip = (visible: boolean, targetId:string) => {
      const {getItemById} = useItemPropsStorage();
      const activeImageProps = getItemById(targetId)?.basicProps;
    if (!activeImageProps || !visible) return;
    const heightCM = (activeImageProps.height / 100) * 9;
    const widthCM = (activeImageProps.width / 100) * 21;
    const line = heightCM.toFixed(1) + "cm x " + widthCM.toFixed(1) + "cm";

//     const stageDom = stageRef.current?.container();
    const rect = { x: 0, y: 0 };
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
}