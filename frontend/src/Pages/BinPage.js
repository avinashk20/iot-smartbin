import { useParams } from "react-router-dom";
import BinCard from "../Components/BinCard";
import "./BinPage.css";
import { useContext } from "react";
import BinsContext from "../Store/BinsContext";

function BinPage() {
  const params = useParams();
  console.log(params.binId);

  const binsCtx = useContext(BinsContext);

  const bin = binsCtx.getBinData(params.binId);

  return (
    <div className="bin-page">
      <BinCard
        key={bin.id}
        height={bin.height}
        weight={bin.weight}
        id={bin.id}
        lat={bin.lat}
        long={bin.long}
        fillPercentage={bin.fillPercentage}
      />
    </div>
  );
}

export default BinPage;
