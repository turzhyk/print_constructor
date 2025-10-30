
import { useTranslation } from "react-i18next";


export const EffectsTab = () => {
  const { t } = useTranslation();
  return (
    <div className="panel-layers">
      <div className="panel-title">Image Effects</div>
      <img className="w-30 h-30 m-auto mt-10" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/RU_road_sign_1.25.svg/681px-RU_road_sign_1.25.svg.png"></img>
      <h2 className="text-center"><strong>Under development</strong></h2>
    </div>
  )
};
