import { createContext, useMemo, useEffect, useState } from "react";
import PropTypes from "prop-types";

const TastingNoteContext = createContext();

export default TastingNoteContext;

export function TastingNoteProvider({ children }) {
  // Data recovery from 'TasteStage1Sliders' component
  const [idTasteSweetnessValue, setIdTasteSweetnessValue] = useState(0);
  const [idAcidityValue, setIdAcidityValue] = useState(0);
  const [idTasteAlcoholValue, setIdTasteAlcoholValue] = useState(0);
  const [idTasteTanninValue, setIdTasteTanninValue] = useState(0);
  const [olfactorySelectedAromas, setOlfactorySelectedAromas] = useState([]);
  const [flavorSelectedAromas, setFlavorSelectedAromas] = useState([]);

  const [tastingNote, setTastingNote] = useState({
    wineQuality: "",
    idOlfactiveIntensity: null,
    idUser: null,
    rating: 0,
    tastingCommentary: "",
    idOlfactiveComplexity: null,
    idVisualColor: null,
    idVisualLimpidity: null,
    idVisualBrightness: null,
    idVisualTears: null,
    idTasteIntensity: null,
    idTasteMouthFeel: null,
    idTasteAlcohol: null,
    idAcidity: null,
    idTasteSweetness: null,
    idTasteTannin: null,
    idVisualIntensity: null,
    selectedWinesIds: [],
    selectedTastedWinesIds: [],
  });

  const handleFillVisualColorId = (e, value) => {
    e.preventDefault();
    setTastingNote({
      ...tastingNote,
      idVisualColor: value,
    });
  };

  const handleFillmouthId = () => {
    setTastingNote({
      ...tastingNote,
      idTasteSweetness: parseInt(`${idTasteSweetnessValue}`, 10),
      idTasteAlcohol: parseInt(`${idTasteAlcoholValue}`, 10),
      idAcidity: parseInt(`${idAcidityValue}`, 10),
      idTasteTannin: parseInt(`${idTasteTanninValue}`, 10),
    });
  };

  useEffect(() => {
    handleFillmouthId();
  }, [
    idTasteSweetnessValue,
    idAcidityValue,
    idTasteAlcoholValue,
    idTasteTanninValue,
  ]);

  const tastingNoteValue = useMemo(() => {
    return {
      tastingNote,
      setIdTasteSweetnessValue,
      setIdAcidityValue,
      setIdTasteAlcoholValue,
      setIdTasteTanninValue,
      setTastingNote,
      handleFillVisualColorId,
      handleFillmouthId,
      olfactorySelectedAromas,
      setOlfactorySelectedAromas,
      flavorSelectedAromas,
      setFlavorSelectedAromas,
      setSelectedTastedWinesIds: (selectedTastedWinesIds) => {
        setTastingNote((prevTastingNote) => ({
          ...prevTastingNote,
          selectedTastedWinesIds,
        }));
      },
      setSelectedWinesIds: (selectedWinesIds) => {
        setTastingNote((prevTastingNote) => ({
          ...prevTastingNote,
          selectedWinesIds,
        }));
      },
    };
  }, [tastingNote, olfactorySelectedAromas, flavorSelectedAromas]);

  return (
    <TastingNoteContext.Provider value={tastingNoteValue}>
      {children}
    </TastingNoteContext.Provider>
  );
}

TastingNoteProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
