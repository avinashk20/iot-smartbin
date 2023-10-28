import { useContext } from "react";
import BinCard from "../Components/BinCard";
import BinsContext from "../Store/BinsContext";
import "./FilledBinsPage.css";

function FilledBinsPage() {
  const binsCtx = useContext(BinsContext);
  let binsList = [];
  let filledBinsData = "";
  let mapLink = "https://www.google.com/maps/dir/Current+Location";

  if (binsCtx.filledBinIds.length > 0) {
    binsList = binsCtx.filledBinIds.map((binId) => {
      const bin = binsCtx.getBinData(binId);
      filledBinsData += `Bin Id: ${bin.id}\n weight: ${bin.weight}kg\n height: ${bin.height}cm\n\n`;
      mapLink = mapLink + `/${bin.lat},${bin.long}`;
      return (
        // <Link key={bin.id} to={`${bin.id}`}>
          <BinCard
            key={bin.id}
            height={bin.height}
            weight={bin.weight}
            id={bin.id}
            lat={bin.lat}
            long={bin.long}
            fillPercentage={bin.fillPercentage}
          />
        // </Link>
      );
    });
  }

  const sendAlert = () => {
    const message = `Number of bins filled: ${binsCtx.countFilledBins}\n ${filledBinsData}\n Route: ${mapLink}\n`;

    const URL = "http://localhost:5000/alert";

    const postAlert = async () => {
      const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify({ message: message }),
        headers: {
          "content-type": "application/json",
        },
      });
      console.log(response);
    };

    postAlert();
  };

  if(binsCtx.countFilledBins > 0) sendAlert();

  return (
    <div className="filledBinsPage">
      {binsCtx.countFilledBins === 0 ? (
        <p className="zerofill">0 bins filled</p>
      ) : (
        <>
          <div className="bins-container">{binsList}</div>
          <div>
            <button className="page-button" onClick={sendAlert}>
              Send Alert
            </button>
            <a
              className="page-button"
              href={mapLink}
              target="_blank"
              rel="noreferrer"
            >
              Get Directions
            </a>
          </div>
        </>
      )}
    </div>
  );
}

export default FilledBinsPage;
