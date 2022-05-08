import React, { useEffect } from 'react';
import { init, dispose } from 'klinecharts';
import MarketAPI from '../../api/market-api';

export default function Chart({ time, Type }) {
  useEffect(() => {
    // Init chart

    const chart = init('simple_chart'
      , {
        candle: {
          tooltip: {
            labels: ['Time: ', 'Open: ', 'Close: ', 'High: ', 'Low: ', 'Volume: '],
          },
        },
      });
    // Create main technical indicator MA
    chart.createTechnicalIndicator('MA', false, { id: 'candle_pane' });
    // Create sub technical indicator VOL
    chart.createTechnicalIndicator('VOL');

    var newlist = []
    MarketAPI.getGraphData({ "TradePair": Type, "Period": "240", "Second": time }).then((response) => {
      console.log(time)
      let dataTable = response.data;
      console.log(dataTable)
        for (let key of Object.keys(dataTable)) {
          if (key !== "time") {
            var data = JSON.parse(dataTable[key])
            newlist.push(data)
            newlist.sort((a, b) => a["timestamp"] - b["timestamp"])
          }
        }
      console.log(newlist);
      chart.applyNewData(newlist);
    })

    return () => {
      dispose('simple_chart');
    }
  }, [time, Type]);

  return <div id="simple_chart" style={{ height: 400 }} />;
}
