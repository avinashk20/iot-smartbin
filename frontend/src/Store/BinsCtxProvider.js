import { useState, useEffect } from "react";
import BinsContext from "./BinsContext";
import { MAX_HEIGHT, MAX_WEIGHT } from "./Data";

const BASE_URL = "http://localhost:5000";

function BinsCtxProvider(props) {
  const [bins, setBins] = useState();

  const getBinData = (binId) => {
    const binData = bins.find((bin) => bin.id === binId);
    if (!binData) console.log("Invalid Bin Id!");
    return binData;
  };

  useEffect(() => {
    const getBinsData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/bins`);
        if (!response.ok) {
          throw new Error("failed to fetch data!");
        }
        const data = await response.json();

        let binsData = [];
        for (const key in data) {
          binsData.push(data[key]);
        }
        setBins(binsData);
      } catch (error) {
        console.log(error.message);
      }
    };
    getBinsData();
  }, []);

  useEffect(() => {
    const updateBinData = (bin) => {
      let { height, weight, fillPercentage, id } = bin;
      if (fillPercentage < 80) {
        height += MAX_HEIGHT * 0.1;
      } else if (fillPercentage < 95) {
        height = MAX_HEIGHT;
      } else {
        height = Math.round(Math.random() * MAX_HEIGHT * 0.1);
      }
      fillPercentage = Math.round((height / MAX_HEIGHT) * 100);
      weight = Math.max(Math.round((MAX_WEIGHT * fillPercentage) / 100), 1);
      return { ...bin, id, height, weight, fillPercentage };
    };

    setInterval(() => {
      setBins((currBins) => {
        return currBins.map(updateBinData);
      });
    }, 10000);
  }, []);

  let countFilledBins = 0;
  let filledBinIds = [];
  if (bins) {
    countFilledBins = bins.reduce((count, bin) => {
      if (bin.fillPercentage === 100) {
        filledBinIds.push(bin.id);
        return count + 1;
      }
      return count;
    }, 0);
  }

  return (
    <BinsContext.Provider
      value={{
        binsData: bins,
        getBinData: getBinData,
        countFilledBins: countFilledBins,
        filledBinIds: filledBinIds,
      }}
    >
      {props.children}
    </BinsContext.Provider>
  );
}

export default BinsCtxProvider;
