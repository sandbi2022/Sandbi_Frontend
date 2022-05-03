import React, { useEffect } from 'react';
import { init, dispose } from 'klinecharts';
import MarketAPI from '../../api/market-api';

export default function Chart({time}) {
  useEffect(() => {
    // Init chart
    
    const chart = init('simple_chart'
    , {
      candle: {
        tooltip: {
          labels: ['Time: ', 'Open: ', 'Receive: ', 'High: ', 'Low: ', 'Volume: '],
        },
      },
    });
    // Create main technical indicator MA
    chart.createTechnicalIndicator('MA', false, { id: 'candle_pane' });
    // Create sub technical indicator VOL
    chart.createTechnicalIndicator('VOL');
    
    var newlist=[]
    MarketAPI.getGraphData({"TradePair":"BTCUSDT","Period":"240","Second":time}).then((response)=>{
      console.log(time)
      console.log(response)
        for (let value of Object.values(response.data)) {
          var data= JSON.parse(value)
           newlist.push(data)
           newlist.sort((a, b) => a["timestamp"] - b["timestamp"])
        } 
        chart.applyNewData(newlist);
   })  
   
    return () => {
      dispose('simple_chart');
    }
  }, [time]);

  return <div id="simple_chart" style={{ height: 400}}/>;
}
