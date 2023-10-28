import "./BinCard.css";
import CircularProgress from "@mui/joy/CircularProgress";
import direction from "../assets/placeholder.png";

function BinCard(props) {
  const { id, height, weight, fillPercentage, lat, long } = props;
  const colors = ["success", "primary", "warning", "danger"];
  const color = colors[Math.ceil(fillPercentage / 25) - 1];

  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${lat}%2C${long}`;
  return (
    <div className="bin-card">
      <div>
        <h2 className="bin-card-id">{`id: ${id}`}</h2>
        <p className="bin-card-data">{`height: ${height}cm`}</p>
        <p className="bin-card-data">{`weight: ${weight}kg`}</p>
      </div>

      <a
        className="bin-card-link"
        href={mapUrl}
        rel="noreferrer"
        target="_blank"
      >
        <img className="direction-icon" src={direction} alt="get directions" />
      </a>

      <div>
        <CircularProgress
          sx={{
            "--CircularProgress-size": "90px",
            "--CircularProgress-trackThickness": "10px",
            "--CircularProgress-progressThickness": "10px",
          }}
          determinate
          color={color}
          value={fillPercentage}
        >
          <p>{`${fillPercentage}%`}</p>
        </CircularProgress>
      </div>
    </div>
  );
}

export default BinCard;
