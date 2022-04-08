import React, { useEffect } from 'react';
import { init, dispose } from 'klinecharts';
import MarketAPI from '../../api/market-api';

export default function Chart (data) {
  useEffect(() => {
    // Init chart
    const chart = init('simple_chart');
    // Create main technical indicator MA
    chart.createTechnicalIndicator('MA', false, { id: 'candle_pane' });
    // Create sub technical indicator VOL
    chart.createTechnicalIndicator('VOL');
    
    var newlist=[]
    MarketAPI.getGraphData({"TradePair":"BTCUSDT","Period":"96","Second":1800}).then((response)=>{
        console.log(response.data)
        for (let value of Object.values(response.data)) {
          var data= JSON.parse(value)
           newlist.push(data)
           newlist.sort((a, b) => a["timestamp"] - b["timestamp"])
        } 
        console.log(newlist)
        chart.applyNewData(newlist);
   })  
   
   
   
   

    return () => {
      dispose('simple_chart');
    }
  }, []);

  return <div id="simple_chart" style={{ height: 400 }}/>;
}
