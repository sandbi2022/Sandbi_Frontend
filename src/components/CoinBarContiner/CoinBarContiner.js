import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import CoinBar from '../Home/coinBar/index';
import WalletAPI from '../../api/wallet_api';
import InfoAPI from '../../api/Info-api';
import MarketAPI from '../../api/market-api';

const CoinBarContainer=()=>{
    const classes = useStyles()
    const [Pricelist, setPricelist]=useState([]);
    const [Vollist, setVollist]=useState([]);
    const [Precionlist,setPrecionlist]=useState([])
    const [Clist,setClist]=useState([])
    const [PairInfo,setInfo]= useState({})
    const TradePair =["BTCUSDT","BCHUSDT","ETHUSDT","ETHBTC"]

    useEffect(()=>{
        InfoAPI.getTradePair().then((response)=>{
            var newlist={}
         for (let [key,value] of Object.entries(response.data)) {
             var data= JSON.parse(value)
             newlist[key]=data
           }
            setInfo(newlist)
            var Precion=[]
         for(let obj in TradePair){
            Precion.push(newlist[TradePair[obj]]["LimitPrice"])
         }
         setPrecionlist(Precion)
        })
   
        },[])


  
    useEffect(() => {
        var Price =[];
        var vlist=[]
        var PricePromise =[];
        var vlistPromise=[]
        var changelist =[]
        for(let obj in TradePair){
                const price=WalletAPI.getPrice({ "TradePair":TradePair[obj]})
                const vol = MarketAPI.getGraphData({"TradePair":TradePair[obj],"Period":"1","Second":86400});
                PricePromise.push(price)
                vlistPromise.push(vol)
        }
        Promise.all(PricePromise).then((res)=>{
            for(let obj in res){
                Price.push(res[obj].data["price"])
            }
            setPricelist(Price)
        })

        Promise.all(vlistPromise).then((res)=>{
         for(let obj in res){
              for (let key of Object.keys(res[obj].data)) {
                   if(key!=="time"){
                    var data= JSON.parse(res[obj].data[key])
                    vlist.push(data["volume"])
                    changelist.push((data["close"]-data["open"])*100)
                  }
            }
         }
         setVollist(vlist) 
         setClist(changelist)   
        })
      }, [PairInfo])

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
    <div className={classes.coinContainers}>
        {TradePair.map((item, index) => {
            return <CoinBar CoinName={item} CoinPrice={Pricelist[index]} CoinChange={perenatage(Clist[index])} CoinVolume={Vollist[index]} Round={Precionlist[index]}  />
        })
        }      
    </div>
        
    )
}

export default CoinBarContainer