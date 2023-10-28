import { useContext } from "react";
import "./App.css";
import HomePage from "./Pages/HomePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RouteLayout from "./Pages/RouteLayout";
import BinPage from "./Pages/BinPage";
import BinsContext from "./Store/BinsContext";
import FilledBinsPage from "./Pages/FilledBinsPage";

function App() {
  const binsCtx = useContext(BinsContext);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RouteLayout countFilledBins={binsCtx.countFilledBins} />,
      children: [
        {
          index: true,
          element: <HomePage bins={binsCtx.binsData} />,
        },
        { path: ":binId", element: <BinPage /> },
        {
          path: "filledBins",
          element: <FilledBinsPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
