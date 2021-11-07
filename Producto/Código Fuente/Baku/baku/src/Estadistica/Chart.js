import React, {useEffect, useRef, useState} from 'react';
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";
import { color } from '@mui/system';

const Chart = ({chartId, height, width}) => {
  //URL
  //https://www.mongodb.com/developer/how-to/mongodb-charts-embedding-sdk-react/

  const sdk = new ChartsEmbedSDK({baseUrl: 'https://charts.mongodb.com/charts-project-0-cycbp'});
  const chartDiv = useRef(null);
  const [rendered, setRendered] = useState(false);
  const [chart] = useState(sdk.createChart({chartId: chartId, height: height, width: width, theme: "dark"}));

  useEffect(() => {
    chart.render(chartDiv.current).then(() => setRendered(true)).catch(err => console.log("Error durante la renderización del gráfico", err));
  }, [chart]);

  /* useEffect(() => {
    if (rendered) {
      chart.setFilter(filter).catch(err => console.log("Error while filtering.", err));
    }
  }, [chart, filter, rendered]); */

  return <div className="chart" ref={chartDiv}/>;
};

export default Chart;