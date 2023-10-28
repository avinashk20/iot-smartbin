import { Link, Outlet } from "react-router-dom";
import "./RouteLayout.css";

function RouteLayout(props) {
  return (
    <>
      <nav className="nav-bar">
        <Link to="/">
          <h1>IOT Smart Bin</h1>
        </Link>
        <Link to="/filledBins">
          <p>{"No. of filled bins: " + props.countFilledBins}</p>
        </Link>
      </nav>
      <Outlet />
    </>
  );
}

export default RouteLayout;
