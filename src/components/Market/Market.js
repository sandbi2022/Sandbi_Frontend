import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import UserServer from '../../api/user-api';
import CoinBar from '../Home/coinBar';
import MarketAPI from '../../api/market-api';

const Market =()=>{

    const classes = useStyles();
    const history = useHistory();
    const [TradeData,setTradeData]=useState([])
    const [headTrade,setheadTrade]= useState([])
    const TradePairlist=[
     "BTCUSDT","ETHUSDT","BCHUSDT"
    ]
    
    useEffect(()=>{
        var test =[]
        var newlist=[];
        for(let obj in TradePairlist){
                const response = MarketAPI.getGraphData({"TradePair":TradePairlist[obj],"Period":"1","Second":86400});
                console.log(response)
                test.push(response)
        }
        Promise.all(test).then((res)=>{
            console.log(res);
        for(let obj in res){
            console.log(res[obj])
              for (let key of Object.keys(res[obj].data)) {
                   if(key!=="time"){
                    var data= JSON.parse(res[obj].data[key])
                    data["Pair"]=TradePairlist[obj]
                    console.log(key)
                    console.log(data)
                    newlist.push(data)
                  
                  }
            }
         }
         setTradeData(newlist)      
        })
        
     },[])

useEffect(()=>{
    console.log(TradeData.slice(0,3))
    setheadTrade(TradeData.slice(0,3))
},[TradeData])


    return(
        <div>
            <div className={classes.coinContainers}>
                {headTrade.map((item)=>{
                return(
                <CoinBar CoinName={item.Pair} CoinPrice={item.open} CoinChange={item.open-item.close}/>
                )})}
            </div>
            <div className={classes.mainContainer}>
                <div className={classes.TitleSetting}>
                    EXCHANGE
                </div>
                <div className={classes.infoContainers}>
                    <div className={classes.infoTitleSetting}>Pair</div>
                    <div  className={classes.infoTitleSetting}>Last Price</div>
                    <div className={classes.infoTitleSetting}>Change</div>
                    <div className={classes.infoTitleSetting}>High</div>
                    <div className={classes.infoTitleSetting}>Low</div>
                    <div className={classes.infoTitleSetting}>24H VOL</div>
                    <div className={classes.infoTitleSetting}>24H Tumover</div>
                </div>
                {TradeData.map((item, index) => {
                        return (
                            <div>
                            <div  className={classes.infoContainers}>
                                <div  className={classes.infoTextSetting}>{item.Pair}</div>
                                <div  className={classes.infoTextSetting}>{item.close}</div>
                    
                                <div  style={{color: Math.sign(item.close-item.open) === -1 ? "green" : "red",fontSize:'14px'}}>
                                    {item.Change*100}%
                                </div>
                                <div  className={classes.infoTextSetting}>{item.high}</div>
                                    
                                    
                                <div  className={classes.infoTextSetting}>{item.low}</div>
                                <div  className={classes.infoTextSetting}>{item.volume}</div>
                                <div  className={classes.infoTextSetting}>{item.turnover}</div>
                            </div>
                            <hr
                            style={{
                                color: '#707070',
                                height: 3,
                                width:'90%'
                            }}/>
                            </div>
                        
                        );
                    })} 
 
            </div>

        </div>
    )
}
export default Market