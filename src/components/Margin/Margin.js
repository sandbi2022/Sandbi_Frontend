import { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import WalletAPI from '../../api/wallet_api';
import MarketAPI from '../../api/market-api';
import{useDispatch, useSelector} from 'react-redux';
import { useStyles } from "./style";
import Chart from "../Chart/Kline";
import ReactSpeedometer from 'react-d3-speedometer';

const Margin =()=>{
    const classes=useStyles()
    const history = useHistory();
    const user = useSelector((state)=>state.user.value)
    const [formErrors, setFormErrors] = useState({})
    const [stotal,setstotal] = useState(0)
    const [btotal,setbtotal] = useState(0)
    const [BTC,setBTC]= useState();
    const [UserBTC,setUBTC]= useState();
    const [USDT,setUusdt]= useState();
    const [BCH,setBCH]= useState();
    const [ETH,setETH]= useState();
    const [OPBTC,setOPBTC]= useState();
    const [OPBCH,setOPBCH]= useState();
    const [OPETH,setOPETH]= useState();
    const [Coindata,setCoindata]=useState([])
    const [buyorder,setbuyorder]=useState([])
    const [sellorder,setsellorder]=useState([])
    const [market,setmarket]=useState([])
    const [sellprice,setsellPrice]= useState()
    const [sellamount,setsellamount]= useState()
    const [buyprice,setbuyPrice]= useState()
    const [buyamount,setbuyamount]= useState()
    const [Tradepair,setTradepair]= useState("BTCUSDT")
    const coin1='XXX'
    const coin2='YYY'


    const [active,setActive]=useState("AutomaticLoan")

    useEffect(()=>{
        const UID= user.UID;
        console.log(UID);
        WalletAPI.getBalance({UID}).then((response) => {
        const data = response.data;
        setUBTC(data["BTC"]-data["FreezeBTC"])
        setUusdt(data["USDT"]-data["FreezeUSDT"] )
        });
       },[])




useEffect(() => {
        MarketAPI.getPrice({"TradePair":"BTCUSDT"}).then((response)=>{
        setBTC(response.data["price"])       
       }) 
        MarketAPI.getPrice({"TradePair":"BCHUSDT"}).then((response)=>{
                setBCH(response.data["price"])
        }) 
        MarketAPI.getPrice({"TradePair":"ETHUSDT"}).then((response)=>{    
        setETH(parseFloat(response.data["price"]));    
         }) 

        MarketAPI.getOpenPrice({"TradePair":"BTCUSDT"}).then((response)=>{
            setOPBTC(parseFloat(response.data["price"]))       
           }) 
        MarketAPI.getOpenPrice({"TradePair":"BCHUSDT"}).then((response)=>{
                    setOPBCH(parseFloat(response.data["price"]));
            }) 
        MarketAPI.getOpenPrice({"TradePair":"ETHUSDT"}).then((response)=>{
            setOPETH(parseFloat(response.data["price"]));    
             }) 
             
      }, []);


useEffect(()=>{
    setCoindata([
        {
         Type:"BTC",
         lastPrice:BTC,
         change:(parseFloat((OPBTC-BTC)/BTC)*100).toFixed(2)
        },
        {
            Type:"BCH",
            lastPrice:BCH,
            change:(parseFloat((OPBCH-BCH)/BCH)*100).toFixed(2)
        },
        {
            Type:"ETH",
            lastPrice:ETH,
            change:(parseFloat((OPETH-ETH)/ETH)*100).toFixed(2)
        },
    ]);

},[BCH,OPBCH,ETH,OPETH,BCH,OPBCH])
    
const perenatage=(number)=>{
    console.log(number)
    if (number>0){
     return "+"+number+"%"
    }
    else{
        return "-"+number+"%"
    }


}
useEffect(() => {
    MarketAPI.getOrder({"TradePair":Tradepair,"TradeType":1}).then((response)=>{
        console.log(response.data)
        var newlist=[]
        for (let value of Object.values(response.data)) {
            var data= JSON.parse(value)
             newlist.push({
                price:data["price"],
                amount:data["amount"]-data["doneAmount"],
                sum :0
            })
            console.log(newlist)
          }
          
        newlist.sort(function(a, b){return -a.price + b.price})
        fillsum(newlist)
        setbuyorder(newlist)
   }) 
}, [Tradepair]);

useEffect(() => {
    MarketAPI.getOrder({"TradePair":Tradepair,"TradeType":0}).then((response)=>{
        console.log(response.data)
        var newlist=[]
        for (let value of Object.values(response.data)) {
            var data= JSON.parse(value)
             newlist.push({
                price:data["price"],
                amount:data["amount"]-data["doneAmount"],
                sum :0
            })
            console.log(newlist)
          }
          
          newlist.sort(function(a, b){return -a.price + b.price})
          fillbuysum(newlist)
        setsellorder(newlist)
   }) 
}, [Tradepair]);



    const fillsum=(list)=>{
        var sum =0;
     for( let i = list.length-1;i>=0;i--){
        sum+=list[i]["amount"];
        list[i]["sum"]= sum;
        
    }   
    }

    const fillbuysum=(list)=>{
        var sum =0;
     for( let i = 0;i < list.length;i++){
        sum+=list[i]["amount"];
        list[i]["sum"]= sum;
        
    }   
    }

    const changetradetype=(type)=>{ 
        console.log(type);        
        setTradepair(type+"USDT")
    }

useEffect(() => {
    MarketAPI.getHistoryOrder({"TradePair":Tradepair}).then((response)=>{
        console.log(response.data)
        var newlist=[]
        for (let value of Object.values(response.data)) {
            var data= JSON.parse(value)
             newlist.push({
                price:data["price"],
                amount:data["amount"],
                time : data["time"].slice(11,), 
                timestamp : new Date(Date.parse(data["time"])).getTime()
            })
            
          }
          newlist.sort(function(a, b){return -a.timestamp + b.timestamp})
          console.log(newlist)
        setmarket(newlist)
   }) 
}, [Tradepair]);


const sellpricechange=(event)=>{
    setsellPrice(event.target.value)
   
}
const sellamountchange=(event)=>{
    setsellamount(event.target.value)
   
}
const buypricechange=(event)=>{
    setbuyPrice(event.target.value)
   
}
const buyamountchange=(event)=>{
    setbuyamount(event.target.value)
   
}

useEffect(()=>{
    console.log(sellamount)
    if(sellamount===undefined|sellamount ===""|sellprice===undefined|sellprice===""){
        setstotal(0);
    }
    else{
    var total = parseFloat(sellamount)*parseFloat(sellprice)
    setstotal(total)}
    
},[sellamount,sellprice])
    

useEffect(()=>{
    console.log(sellamount)
    if(buyamount===undefined|buyamount ===""|buyprice===undefined|buyprice===""){
        setbtotal(0);
    }
    else{
    setbtotal(parseFloat(buyamount)*parseFloat(buyprice))
  }
},[buyamount,buyprice])


const handleSell=()=>{
    if(UserBTC>sellamount){
        MarketAPI.submitTrade({"TradePair":Tradepair,"UID":user.UID,"Amount":sellamount,"Price":sellprice,"TradeType":1})
    }
    else{
        alert("not enought BTC")
    }
}

const handlebuy=()=>{
    if(USDT>buyamount*parseFloat(BTC)){
        MarketAPI.submitTrade({"TradePair":Tradepair,"UID":user.UID,"Amount":buyamount,"Price":buyprice,"TradeType":0})
    }
    else{
        alert("not enought USDT")
    }
}



    return(
        <div >
          {/*<div className='leftsideMarket' style={{left:0}}>
            {/* <div > 
			    <input type="text"></input>
			    <button >Search </button>   
		    </div>  
            {Coindata.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                      {item.Type} 
                      <span>  {item.lastPrice}  </span>
                      <span>  {item.change}</span>
                  </li>
                );
              })}
          </div>
          <div className='orderbook'>
            <div>Order Book</div>
            {order.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                      {item.price} 
                      <span>  {item.amount}  </span>
                      <span>  {item.sum}</span>
                  </li>
                );
              })}

          </div>

          <div className='Market'>
            <div>Market trading</div>
            {market.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                      {item.time} 
                      <span>  {item.price}</span>
                      <span>  {item.amount}  </span>
                  </li>
                );
              })}

          </div>*/}
          <div className={classes.UpContainers}>
                <div className={classes.columContainers}>
                    <div className={classes.columPartContainers}>
                        <div className={classes.leftSideCoinContainer}>
                            <div style={{color:'white', fontSize:'14px'}}>Coins:</div>
                            <button className={classes.CoinSetting}>usdt</button>
                            <button className={classes.CoinSetting}>btc</button>
                            <div></div>
                        </div>
                        <div className={classes.leftSideContainer}>
                            <div className={classes.smallText2}>Asset</div>
                            <div className={classes.smallText2}>Last Price</div>
                            <div className={classes.smallText2}>Change</div>
                        </div>
                        {Coindata.map((item, index) => {
                            return (
                                <div className={classes.leftSideContainer}>
                                    <div className={classes.smallText} onClick={()=>changetradetype(item.Type)}>{item.Type}</div>
                                    <div  className={classes.smallText}>{item.lastPrice}</div>
                                    <div  style={{color: Math.sign(item.Change) === -1 ? "red" : "green",fontSize:'14px'}}>{perenatage(item.change)}</div>
                                </div>
                            );
                        })}
                        <div style={{height:'230px',position:'relative',bottom:'-350px',backgroundColor:'#141126'}}>
                            <div style={{color:'white', fontSize:'20px',textAlign:'left', fontWeight:'bold',marginBottom:'10px'}}>Margin Account</div>
                            <div style={{color:'grey', fontSize:'14px',textAlign:'left'}}>Total Amount</div>
                            <div style={{color:'white', fontSize:'14px',textAlign:'left'}}>0.000000 XXX</div>
                            <div style={{color:'grey', fontSize:'14px',textAlign:'left'}}>Total Amount</div>
                            <div style={{color:'white', fontSize:'14px',textAlign:'left'}}>0.000000 XXX</div>
                            <div>
                                <ReactSpeedometer
                                    ringWidth={20}
                                    width={150}
                                    maxValue={500}
                                    value={473}
                                    needleColor="red"
                                    startColor='green'
                                    segments={6}
                                    endColor="blue"
                                    textColor='grey'
                                />
                            </div>
                        </div>
                    </div>
                    <div  className={classes.columPartContainers}>
                        <div className={classes.ChartTitleContainer}>
                            <div>
                                <div style={{color:'white',fontSize:'20px',fontWeight:'bold',textAlign:'left'}}>
                                    {coin1}/{coin2}
                                </div>
                                <div className={classes.ChartTitleInfoContainer}>
                                    <div style={{color:'green',fontSize:'10px'}}>10,000</div>
                                    <div style={{color:'grey',fontSize:'10px'}}>=1 USD</div>
                                    <div style={{color:'red',fontSize:'10px'}}>-1%</div>
                                </div>
                            </div>
                            <div>
                                <div style={{color:'#546071',fontSize:'14px'}}>
                                    24H High
                                </div>
                                <div style={{color:'#BFBFBF',fontSize:'14px'}}>
                                    10,000
                                </div>
                            </div>
                            <div>
                                <div style={{color:'#546071',fontSize:'14px'}}>
                                24H Low
                                </div>
                                <div  style={{color:'#BFBFBF',fontSize:'14px'}}>
                                    10,000
                                </div>
                            </div>
                            
                        </div>
                        <div>
                            <Chart />
                        </div>
                        <div style={{position:'relative',bottom:'-15px'}}>
                            {active==="AutomaticLoan" &&
                            <div>
                                <div className={classes.SwitchButtonContainer}>
                                <div style={{color:'#515B6E',fontWeight:'bold',fontSize:'20px',textAlign:'left',backgroundColor:'#141126',
                                    border:'solid',borderWidth: "3px 0px 0px 0px",
                                    borderColor:"#37C24A",width:'180px', padding:'3px 9px 3px 9px'}} onClick={()=>setActive("AutomaticLoan")}>Automatic Loan</div>
                                <div style={{color:'#515B6E',fontWeight:'bold',fontSize:'20px',textAlign:'left',width:'260px', padding:'3px 9px 3px 9px'}}
                                 onClick={()=>setActive("AutomaticRepayment")}>Automatic Repayment</div>
                                <div style={{color:'#515B6E',fontWeight:'bold',fontSize:'20px',textAlign:'left',width:'180px', padding:'3px 9px 3px 9px'}}
                                 onClick={()=>setActive("NormalMode")}>Normal Mode</div>
                                </div>
                                <div className={classes.ExchangeContainer}>
                                    <div className={classes.Left}>
                                    <div className={classes.ExchangeButton}>
                                        <button className={classes.ExchangeButtonSetting}>Limit</button>
                                        <button className={classes.ExchangeButtonSetting}>Market</button>
                                    </div>
                                    <div><input type="number"  onChange={sellpricechange} min="0" className={classes.inputSetting} placeholder="Price"></input></div>
                                    <div><input type="number"  onChange={sellamountchange} min="0"  className={classes.inputSetting} placeholder="Amount"></input></div>
                                    <div style={{display:'grid', gridTemplateColumns:'auto auto',width: '100%',}}>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'left'}}>This loan</div>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'right'}}>0000</div>
                                    </div>
                                    <div style={{display:'grid', gridTemplateColumns:'auto auto',width: '100%',}}>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'left'}}>total</div>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'right'}}>{stotal}</div>
                                    </div>
                                    <div><button onClick={handleSell} className={classes.buttonSettingRed}>Sell</button></div>
                                    </div>
                                    <div>
                                    <div className={classes.verticleLine}/>
                                    </div>
                                    <div className={classes.Right}>
                                    <div className={classes.ExchangeButton}>
                                        <button className={classes.ExchangeButtonSetting}>Limit</button>
                                        <button className={classes.ExchangeButtonSetting}>Market</button>
                                    </div>
                                    <div><input type="number"  onChange={buypricechange} min="0"  className={classes.inputSetting} placeholder="Price" ></input></div>
                                    <div><input type="number" onChange={buyamountchange} min="0"  className={classes.inputSetting} placeholder="Amount" ></input></div>
                                    <div style={{display:'grid', gridTemplateColumns:'auto auto',width: '100%',}}>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'left'}}>This loan</div>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'right'}}>0000</div>
                                    </div>
                                    <div style={{display:'grid', gridTemplateColumns:'auto auto',width: '100%',}}>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'left'}}>total</div>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'right'}}>{btotal}</div>
                                    </div>
                                    <div><button onClick={handlebuy} className={classes.buttonSettingGreen}>Buy</button></div>
                                    </div>
                                </div>
                            </div>
                            }
                            {active==="AutomaticRepayment" &&
                            <div>
                                <div className={classes.SwitchButtonContainer}>
                                <div style={{color:'#515B6E',fontWeight:'bold',fontSize:'20px',textAlign:'left',width:'180px', padding:'3px 9px 3px 9px'}} onClick={()=>setActive("AutomaticLoan")}>Automatic Loan</div>
                                <div style={{color:'#515B6E',fontWeight:'bold',fontSize:'20px',textAlign:'left',backgroundColor:'#141126',
                                    border:'solid',borderWidth: "3px 0px 0px 0px",
                                    borderColor:"#37C24A",width:'260px', padding:'3px 9px 3px 9px'}}
                                 onClick={()=>setActive("AutomaticRepayment")}>Automatic Repayment</div>
                                <div style={{color:'#515B6E',fontWeight:'bold',fontSize:'20px',textAlign:'left',width:'180px', padding:'3px 9px 3px 9px'}}
                                 onClick={()=>setActive("NormalMode")}>Normal Mode</div>
                                </div>
                                <div className={classes.ExchangeContainer}>
                                    <div className={classes.Left}>
                                    <div className={classes.ExchangeButton}>
                                        <button className={classes.ExchangeButtonSetting}>Limit</button>
                                        <button className={classes.ExchangeButtonSetting}>Market</button>
                                    </div>
                                    <div><input type="number"  onChange={sellpricechange} min="0" className={classes.inputSetting} placeholder="Price"></input></div>
                                    <div style={{color:'#707070',textAlign:'left',marginLeft:'10px'}}>Amount:XXXXX</div>
                                    <div style={{display:'grid', gridTemplateColumns:'auto auto',width: '100%',}}>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'left'}}>This repay</div>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'right'}}>0000</div>
                                    </div>
                                    <div style={{display:'grid', gridTemplateColumns:'auto auto',width: '100%',}}>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'left'}}>total</div>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'right'}}>{stotal}</div>
                                    </div>
                                    <div><button onClick={handleSell} className={classes.buttonSettingRed}>Sell</button></div>
                                    </div>
                                    <div>
                                    <div className={classes.verticleLine}/>
                                    </div>
                                    <div className={classes.Right}>
                                    <div className={classes.ExchangeButton}>
                                        <button className={classes.ExchangeButtonSetting}>Limit</button>
                                        <button className={classes.ExchangeButtonSetting}>Market</button>
                                    </div>
                                    <div><input type="number"  onChange={buypricechange} min="0"  className={classes.inputSetting} placeholder="Price" ></input></div>
                                    <div><input type="number" onChange={buyamountchange} min="0"  className={classes.inputSetting} placeholder="Amount" ></input></div>
                                    <div style={{display:'grid', gridTemplateColumns:'auto auto',width: '100%',}}>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'left'}}>This repay</div>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'right'}}>0000</div>
                                    </div>
                                    <div style={{display:'grid', gridTemplateColumns:'auto auto',width: '100%',}}>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'left'}}>total</div>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'right'}}>{btotal}</div>
                                    </div>
                                    <div><button onClick={handlebuy} className={classes.buttonSettingGreen}>Buy</button></div>
                                    </div>
                                </div>
                            </div>
                            }
                            {active==="NormalMode" &&
                            <div>
                                <div className={classes.SwitchButtonContainer}>
                                <div style={{color:'#515B6E',fontWeight:'bold',fontSize:'20px',textAlign:'left',width:'180px', padding:'3px 9px 3px 9px'}} onClick={()=>setActive("AutomaticLoan")}>Automatic Loan</div>
                                <div style={{color:'#515B6E',fontWeight:'bold',fontSize:'20px',textAlign:'left',width:'260px', padding:'3px 9px 3px 9px'}}
                                 onClick={()=>setActive("AutomaticRepayment")}>Automatic Repayment</div>
                                <div style={{color:'#515B6E',fontWeight:'bold',fontSize:'20px',textAlign:'left',backgroundColor:'#141126',
                                    border:'solid',borderWidth: "3px 0px 0px 0px",
                                    borderColor:"#37C24A",width:'180px', padding:'3px 9px 3px 9px'}}
                                 onClick={()=>setActive("NormalMode")}>Normal Mode</div>
                            </div>
                                <div className={classes.ExchangeContainer}>
                                    <div className={classes.Left}>
                                    <div className={classes.ExchangeButton}>
                                        <button className={classes.ExchangeButtonSetting}>Limit</button>
                                        <button className={classes.ExchangeButtonSetting}>Market</button>
                                    </div>
                                    <div><input type="number"  onChange={sellpricechange} min="0" className={classes.inputSetting} placeholder="Price"></input></div>
                                    <div><input type="number"  onChange={sellamountchange} min="0"  className={classes.inputSetting} placeholder="Amount"></input></div>
                                    <div style={{display:'grid', gridTemplateColumns:'auto auto',width: '100%',}}>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'left'}}>This repay</div>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'right'}}>0000</div>
                                    </div>
                                    <div style={{display:'grid', gridTemplateColumns:'auto auto',width: '100%',}}>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'left'}}>total</div>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'right'}}>{stotal}</div>
                                    </div>
                                    <div><button onClick={handleSell} className={classes.buttonSettingRed}>Sell</button></div>
                                    </div>
                                    <div>
                                    <div className={classes.verticleLine}/>
                                    </div>
                                    <div className={classes.Right}>
                                    <div className={classes.ExchangeButton}>
                                        <button className={classes.ExchangeButtonSetting}>Limit</button>
                                        <button className={classes.ExchangeButtonSetting}>Market</button>
                                    </div>
                                    <div><input type="number"  onChange={buypricechange} min="0"  className={classes.inputSetting} placeholder="Price" ></input></div>
                                    <div><input type="number" onChange={buyamountchange} min="0"  className={classes.inputSetting} placeholder="Amount" ></input></div>
                                    <div style={{display:'grid', gridTemplateColumns:'auto auto',width: '100%',}}>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'left'}}>This repay</div>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'right'}}>0000</div>
                                    </div>
                                    <div style={{display:'grid', gridTemplateColumns:'auto auto',width: '100%',}}>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'left'}}>total</div>
                                        <div style={{color:'white',fontSize:'10px',textAlign:'right'}}>{btotal}</div>
                                    </div>
                                    <div><button onClick={handlebuy} className={classes.buttonSettingGreen}>Buy</button></div>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                    </div>
                    <div className={classes.columPartContainers}>
                        <div className={classes.TitleText}>OrderBook</div>
                        <div className={classes.leftSideContainer}>
                            <div  className={classes.smallText2}>Price</div>
                            <div  className={classes.smallText2}>Amount</div>
                            <div  className={classes.smallText2}>sum</div>
                        </div>
                        {buyorder.map((item, index) => {
                            return (
                                <div className={classes.leftSideContainer}>
                                    <div className={classes.smallTextRed}>{item.price}</div>
                                    <div  className={classes.smallText}>{item.amount}</div>
                                    <div  className={classes.smallText}>{item.sum.toFixed(2)}</div>
                                </div>
                            );
                        })}
                        <div>
                        <hr
                            style={{
                            color: '#707070',
                            height: 3,
                            width:'100%'
                            }}/>
                        </div>
                        <div className={classes.leftSideContainer}>
                            <div  className={classes.smallText2}>Price</div>
                            <div  className={classes.smallText2}>Amount</div>
                            <div  className={classes.smallText2}>sum</div>
                        </div>
                        {sellorder.map((item, index) => {
                            return (
                                <div className={classes.leftSideContainer}>
                                    <div className={classes.smallTextGreen}>{item.price}</div>
                                    <div  className={classes.smallText}>{item.amount}</div>
                                    <div  className={classes.smallText}>{item.sum.toFixed(2)}</div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={classes.columPartContainers}>
                    <div className={classes.TitleText}>MarketTrade</div>
                        <div className={classes.leftSideContainer}>
                            <div  className={classes.smallText2}>Time</div>
                            <div  className={classes.smallText2}>Price</div>
                            <div  className={classes.smallText2}>Amount</div>
                        </div>
                        {market.map((item, index) => {
                            return (
                                <div className={classes.leftSideContainer}>
                                    <div className={classes.smallText}>{item.time}</div>
                                    <div  className={classes.smallText}>{item.price}</div>
                                    <div  className={classes.smallText}>{item.amount}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                
            </div>

            <div className={classes.buttonContainer}>
             <button>Open Order</button>
             <button>Order history</button>
          </div>
          <div className={classes.orderHistoryContainer}>
              <div className={classes.smallText2}>Time</div>
              <div  className={classes.smallText2}>Pair</div>
              <div className={classes.smallText2}>Type</div>
              <div className={classes.smallText2}>Side</div>
              <div className={classes.smallText2}>Price</div>
              <div className={classes.smallText2}>Amount</div>
              <div className={classes.smallText2}>Total</div>
              <div className={classes.smallText2}>Executed</div>
              <div className={classes.smallText2}>Unexecuted</div>
          </div>

         {/*<div className='exhange'>
         <label>Exchange</label>
         <div className='left'>
             
             {/* <button>limit</button>
             <button>Market</button>
             <button>Stop-limit</button>
             <button>Trigger order</button> 
             <input type="number"  onChange={sellpricechange} min="0"></input>
             <input type="number"  onChange={sellamountchange} min="0"></input>
             <label>Total</label>
             <label>{stotal}</label>
             <button onClick={handleSell}>Sell</button>
        </div> 
        <div className='right'>
             {/* <button>limit</button>
             <button>Market</button>
             <button>Stop-limit</button>
             <button>Trigger order</button> 
              <input type="number"  onChange={buypricechange} min="0"></input>
             <input type="number" onChange={buyamountchange} min="0"></input>
             <label>Total</label>
             <label>{btotal}</label>
             <button onClick={handlebuy}>Buy</button>
        </div> 
                    </div>*/}



          

        </div>
    )
}

export default Margin