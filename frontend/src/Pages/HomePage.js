import BinCard from "../Components/BinCard";
// import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = (props) => {
  let binsList = "loading...";

  if (props.bins) {
    binsList = props.bins.map((bin) => (
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
    ));
  }

  return (
    <div className="homepage">
      <div className="bins-container">{binsList}</div>;
    </div>
  );
};

export default HomePage;
