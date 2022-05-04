import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import UserServer from '../../api/user-api';
import CoinBar from '../Home/coinBar';
import InfoAPI from '../../api/Info-api';
import MarketAPI from '../../api/market-api';
import CoinBarContainer from '../CoinBarContiner/CoinBarContiner';

const Market =()=>{

    const classes = useStyles();
    const history = useHistory();
    const [TradeData,setTradeData]=useState([])
    const [headTrade,setheadTrade]= useState([])
    const [PairInfo,setInfo]= useState({})
    
    const [TradePairlist,setTradepairlist]=useState([])

    useEffect(()=>{
        InfoAPI.getTradePair().then((response)=>{
            console.log(response.data)
            var newlist={}
            var tmpPairlist=[]
         for (let [key,value] of Object.entries(response.data)) {
             var data= JSON.parse(value)
             newlist[key]=data
             tmpPairlist.push(key)
           }
           setInfo(newlist)
           setTradepairlist(tmpPairlist)
        })
        },[])




    
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
        
     },[TradePairlist])

useEffect(()=>{
    console.log(TradeData.slice(0,3))
    setheadTrade(TradeData.slice(0,3))
},[TradeData])


const jumpExhange=(TradePair)=>{
    console.log(TradePair)
    history.push({pathname: '/Exchange',
                  state: { detail: TradePair }})
    
}


const perenatage=(close,open)=>{
    //  console.log(number)
      if(open==0){return 0+"%"}
      if (open-close>0){
       return "+"+((open-close)/open).toFixed(2)+"%"
      }
      else{
          return "-"+((open-close)/open).toFixed(2)+"%"
      }
  }


    return(
        <div>
            
            <CoinBarContainer/>
            
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
                                <div  className={classes.infoTextSetting} onClick={()=>jumpExhange(item.Pair)}>{item.Pair}</div>
                                <div  className={classes.infoTextSetting}>{item.close}</div>
                    
                                <div  style={{color: Math.sign(item.open-item.close) === -1 ? "green" : "red",fontSize:'14px',textAlign:'Left',
                                marginLeft:'10%',}}>
                                    {perenatage(item.close,item.open)}
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