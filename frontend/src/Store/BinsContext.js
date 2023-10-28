import React from "react";

const BinsContext = React.createContext({
  binsData: [],
  countFilledBins: 0,
  getBinData: (binId) => {},
  isFetchingData: false,
  filledBinIds: []
});

export default BinsContext;
