import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { redWineColors } from "../../Utils";
import "./VisualStage1.css";
import ButtonPrimary from "../../components/ButtonPrimary";
import StepsHeader from "../../components/StepsHeader/StepsHeader";
import TastingHeaderTitle from "../../components/TastingHeaderTitle";

function VisualStage1() {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleClick = (index) => {
    setSelectedButton(index);
  };

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/eye/stage2");
  };

  return (
    <div className="visualStage1">
      <div className="contentStage1">
        {" "}
        <TastingHeaderTitle />
        <StepsHeader />
        <div className="intro">
          <h3 className="subtitle">J'observe sa teinte</h3>
          <p>
            Placez votre verre à la lumière du jour en le posant sur une surface
            blanche et observez son disque. A quelle teinte correspond votre vin
            ?
          </p>
          <p className="tip">
            A Savoir : La couleur du vin vous donne une indication sur son
            vieillissement. Sur cette palette, les couleurs sont classées du
            plus jeune au plus vieux.
          </p>
        </div>
        <div className="colors">
          {redWineColors.map((el, index) => (
            <button
              key={el.id}
              type="button"
              onClick={() => handleClick(index)}
              className="blotch"
            >
              {" "}
              <img src={el.blotch} alt="wine color" />
              <p className={selectedButton === index ? "colorName" : ""}>
                {el.colorName}
              </p>
            </button>
          ))}
        </div>
        <ButtonPrimary type="button" onClick={handleNavigate}>
          Etape suivante
        </ButtonPrimary>
      </div>
    </div>
  );
}

export default VisualStage1;
