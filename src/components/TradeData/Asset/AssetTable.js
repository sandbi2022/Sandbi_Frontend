import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import WalletAPI from '../../../api/wallet_api';
import InfoAPI from '../../../api/Info-api';
import MarketAPI from '../../../api/market-api';

const AssetTable= params =>{
    const [PairInfo,setInfo]= useState({})
    const classes=useStyles()
    const [CoinRender,setCoinRender]= useState([])
    const [Coindata,setCoindata]=useState([])
    const [change,setChange]=useState()
    console.log(params)
    const setTradepair=params.setTPair ;
    const setcoin1= params.setC1;
    const setcoin2= params.setC2;



useEffect(()=>{
    InfoAPI.getTradePair().then((response)=>{
        console.log(response.data)
        var newlist={}
     for (let [key,value] of Object.entries(response.data)) {
         var data= JSON.parse(value)
         newlist[key]=data
       }
       setInfo(newlist)
    })
},[])




     useEffect(() => {
     var pairlist =[]
     var Promiselist=[];
     for (let [key,value] of Object.entries(PairInfo)) {
         console.log(key)
         console.log(value)
         var Tpair= value["Coin1"]+value["Coin2"]
         pairlist.push(Tpair)
         const response = MarketAPI.getPrice({"TradePair":Tpair})
         Promiselist.push(response)
         const openresponse = MarketAPI.getOpenPrice({"TradePair":Tpair})
         Promiselist.push(openresponse)
       }
     
     Promise.all(Promiselist).then((res)=>{
         console.log(res);
         var newCoindata=[]
     for(let i =0;i<pairlist.length;i++){
         console.log(res[2*i].data)
         console.log(res[2*i+1].data)
         var price=res[2*i].data["price"]
         var openprice =res[2*i+1].data["price"]
         var digit =PairInfo[pairlist[i]]["LimitPrice"]
         console.log(digit)
         newCoindata.push({
             Type:pairlist[i],
             lastPrice:price.toFixed(digit),
             change:(parseFloat((openprice-price)/price)*100).toFixed(2)
 
         })
      }
      console.log(newCoindata)
      setCoindata(newCoindata)
      setCoinRender(newCoindata)
       })
       
     }, [PairInfo,change])

    const showCoin2=(unitchange)=>{
        if(unitchange=="BTC"||unitchange=="USDT"){
         var newlist =[]
         for(let pair in Coindata){
             var type=Coindata[pair].Type
             var tmpCoin=PairInfo[type]["Coin2"]
             if(tmpCoin==unitchange){
                 newlist.push(Coindata[pair])
             }
         }
         console.log(newlist)
         setCoinRender(newlist)
         setTradepair(newlist[0].Type)
         setcoin1(PairInfo[newlist[0].Type]["Coin1"])
         setcoin2(PairInfo[newlist[0].Type]["Coin2"])
        }
        else{
         setCoinRender(Coindata)
         setTradepair(Coindata[0].Type)
         setcoin1(PairInfo[Coindata[0].Type]["Coin1"])
         setcoin2(PairInfo[Coindata[0].Type]["Coin2"])
     
        }
     }

     const perenatage=(number)=>{
        console.log(number)
        if (number>0){
         return "+"+number+"%"
        }
        else{
            return "-"+number+"%"
        }
    }
    return(
        <div className={classes.columPartContainers}>
        <div className={classes.leftSideCoinContainer}>
            <div style={{color:'white', fontSize:'14px'}}>Coins:</div>
            <button className={classes.CoinSetting} onClick={()=>showCoin2("ALL")}>ALL</button>
            <button className={classes.CoinSetting} onClick={()=>showCoin2("USDT")}>USDT</button>
            <button className={classes.CoinSetting} onClick={()=>showCoin2("BTC")}>BTC</button>
            <div></div>
        </div>
        <div className={classes.leftSideContainer}>
            <div className={classes.smallText2}>Asset</div>
            <div className={classes.smallText2}>Last Price</div>
            <div className={classes.smallText2}>Change</div>
        </div>
        {CoinRender.map((item, index) => {
            return (
                <div className={classes.leftSideContainer}>
                    <div className={classes.smallText} onClick={()=>params.ChangeType(item.Type)}>{item.Type}</div>
                    <div  className={classes.smallText}>{item.lastPrice}</div>
                    <div  style={{color: Math.sign(item.Change) === -1 ? "red" : "green",fontSize:'14px'}}>{perenatage(item.change)}</div>
                </div>
            );
        })}
    </div>
        
    )
}

export default AssetTable