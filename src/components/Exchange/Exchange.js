import { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import WalletAPI from '../../api/wallet_api';
import MarketAPI from '../../api/market-api';
import InfoAPI from '../../api/Info-api';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from "./style";
import Chart from "../Chart/Kline";
import AssetTable from '../TradeData/Asset/AssetTable';

const Exchange = () => {
    const classes = useStyles()
    const user = useSelector((state) => state.user.value)
    const [stotal, setstotal] = useState(0)
    const [btotal, setbtotal] = useState(0)
    const [UserBTC, setUBTC] = useState();
    const [USDT, setUusdt] = useState();
    const [buyorder, setbuyorder] = useState([])
    const [sellorder, setsellorder] = useState([])
    const [market, setmarket] = useState([])
    const [sellprice, setsellPrice] = useState()
    const [sellamount, setsellamount] = useState()
    const [buyprice, setbuyPrice] = useState()
    const [buyamount, setbuyamount] = useState()
    const [Tradepair, setTradepair] = useState("BTCUSDT")
    const [change, setChange] = useState()
    const [coin1, setcoin1] = useState("BTC")
    const [coin2, setcoin2] = useState("USDT")
    const [openorder, setopenorder] = useState([])
    const [orderH, setorderH] = useState([])
    const [bottom, setbottom] = useState([])
    const [Switch, setswitch] = useState(0)
    const [PairInfo, setInfo] = useState({})
    const [active, setActive] = useState("openOrder")
    const [Time, setTime] = useState(1800)
    const [Sellactive,setSellactive]=useState("Limit")
    const [Buyactive,setBuyactive]=useState("Limit")
    const [Tpinfo,setTPINFO]=useState({close:0,high:0,low:0})

    useEffect(() => {
        const UID = user.UID;
        WalletAPI.getBalance({ UID }).then((response) => {
            const data = response.data;
            setUBTC(data["BTC"] - data["FreezeBTC"])
            setUusdt(data["USDT"] - data["FreezeUSDT"])
        });
    }, [change])

    useEffect(() => {
        InfoAPI.getTradePair().then((response) => {
            // console.log(response.data)
            var newlist = {}
            for (let [key, value] of Object.entries(response.data)) {
                var data = JSON.parse(value)
                newlist[key] = data
            }
            setInfo(newlist)
        })

    }, [])
    
    useEffect(() => {
        MarketAPI.getGraphData({"TradePair":Tradepair,"Period":"1","Second":86400}).then((res)=>{
            console.log(res.data)
            var newlist={}
            
                for (let key of Object.keys(res.data)) {
                     if(key!=="time"){
                      var data= JSON.parse(res.data[key])
                      newlist=data
                      console.log(newlist)
                    }
              }
           
           setTPINFO(newlist)
        })
        

    }, [PairInfo, Tradepair, change])

    useEffect(() => {
        MarketAPI.getOrder({ "TradePair": Tradepair, "TradeType": 1 }).then((response) => {
            // console.log(response.data)
            var newlist = []
            console.log(PairInfo)
            for (let value of Object.values(response.data)) {
                var data = JSON.parse(value)
                newlist.push({
                    price: data["price"].toFixed(PairInfo[Tradepair]["LimitPrice"]),
                    amount: (data["amount"] - data["doneAmount"]).toFixed(PairInfo[Tradepair]["LimitCount"]),
                    sum: 0
                })
                // console.log(newlist)
            }
            
           // newlist.sort(function (a, b) { return -a.price + b.price })
            fillsum(newlist)
            newlist = mergeArr(newlist)
            setbuyorder(newlist)

             
        })
    }, [PairInfo, Tradepair, change]);

    useEffect(() => {
        MarketAPI.getOrder({ "TradePair": Tradepair, "TradeType": 0 }).then((response) => {
            // console.log(response.data)
            var newlist = []
            for (let value of Object.values(response.data)) {
                var data = JSON.parse(value)
                newlist.push({
                    price: data["price"].toFixed(PairInfo[Tradepair]["LimitPrice"]),
                    amount: (data["amount"] - data["doneAmount"]).toFixed(PairInfo[Tradepair]["LimitCount"]),
                    sum: 0
                })
                //console.log(newlist)
            }
            console.log(newlist)
            newlist.sort(function (a, b) { return -Number(a.price) + Number(b.price) })
            console.log(newlist)
            fillbuysum(newlist)
            newlist = mergeArr(newlist)
            setsellorder(newlist)

        })
    }, [PairInfo, Tradepair, change]);



    const fillsum = (list) => {
        var sum = 0;
        for (let i = list.length - 1; i >= 0; i--) {
            sum += Number(list[i]["amount"]);
            list[i]["sum"] = sum;

        }
    }

    const fillbuysum = (list) => {
        var sum = 0;
        for (let i = 0; i < list.length; i++) {
            sum += Number(list[i]["amount"]);
            list[i]["sum"] = sum;

        }
    }

    useEffect(() => {
        MarketAPI.getHistoryOrder({ "TradePair": Tradepair }).then((response) => {
            var newlist = []
            for (let value of Object.values(response.data)) {
                var data = JSON.parse(value)
                newlist.push({
                    price: data["price"].toFixed(PairInfo[Tradepair]["LimitPrice"]),
                    amount: data["amount"].toFixed(PairInfo[Tradepair]["LimitCount"]),
                    time: data["time"].slice(11,),
                    timestamp: new Date(Date.parse(data["time"])).getTime()
                })

            }
            newlist.sort(function (a, b) { return -a.timestamp + b.timestamp })
            //    console.log(newlist)
            setmarket(newlist)
        })
    }, [PairInfo, Tradepair, change]);


    useEffect(() => {
        MarketAPI.getuserOrder({ "TradePair": Tradepair, "UID": user.UID }).then((response) => {
            //  console.log(response.data)
            var newlist = []
            for (let value of Object.values(response.data)) {
                var data = JSON.parse(value)
                newlist.push(data)

            }
            //    console.log(newlist)
            setopenorder(newlist)
        })
    }, [Tradepair, change]);


    useEffect(() => {
        MarketAPI.getUserHistoryOrder({ "TradePair": Tradepair, "UID": user.UID }).then((response) => {
            console.log(response.data)
            var newlist = []
            for (let value of Object.values(response.data)) {
                var data = JSON.parse(value)
                newlist.push(data)

            }
            console.log(newlist)
            setorderH(newlist)
        })
    }, [Tradepair, change]);


    const sellpricechange = (event) => {
        setsellPrice(event.target.value)

    }
    const sellamountchange = (event) => {
        setsellamount(event.target.value)

    }
    const buypricechange = (event) => {
        setbuyPrice(event.target.value)

    }
    const buyamountchange = (event) => {
        setbuyamount(event.target.value)

    }

    useEffect(() => {
        if (sellamount === undefined | sellamount === "" | sellprice === undefined | sellprice === "") {
            setstotal(0);
        }
        else {
            var total = parseFloat(sellamount) * parseFloat(sellprice)
            setstotal(total)
        }

    }, [sellamount, sellprice])


    useEffect(() => {
        if (buyamount === undefined | buyamount === "" | buyprice === undefined | buyprice === "") {
            setbtotal(0);
        }
        else {
            setbtotal(parseFloat(buyamount) * parseFloat(buyprice))
        }
    }, [buyamount, buyprice])


    const handleSell = () => {
        if (UserBTC > sellamount) {
            MarketAPI.submitTrade({ "TradePair": Tradepair, "UID": user.UID, "Amount": sellamount, "Price": sellprice, "TradeType": 1 })
        }
        else {
            alert("not enought BTC")
        }
        if (change == 1) {
            setChange(2)
        }
        else {
            setChange(1)
        }

    }

    const handlebuy = () => {
        if (USDT > buyamount * buyprice) {
            MarketAPI.submitTrade({ "TradePair": Tradepair, "UID": user.UID, "Amount": buyamount, "Price": buyprice, "TradeType": 0 })
        }
        else {
            alert("not enought USDT")
        }
        if (change == 1) {
            setChange(2)
        }
        else {
            setChange(1)
        }
    }

    const marketpricesellTrade = () => {
        console.log(buyorder[0]);
        if (buyorder.length > 0) {
            setbuyPrice(buyorder[0]["price"])
        }
        else {
            alert("There is no available buy order")
        }



    }
    const marketpricebuyTrade = () => {
        //console.log(sellorder);
        console.log(sellorder[0]["price"]);
        if (sellorder.length > 0) {
            setbuyPrice(sellorder[0]["price"])
        }
        else {
            alert("There is no available sell order")
        }

    }


    const SwitchOpenOrder = () => {
        setswitch(0);
    }
    const Switchistory = () => {
        setswitch(1);
    }
    useEffect(() => {
        if (Switch == 0) {
            setbottom(openorder)
        } else {
            setbottom(orderH)
        }

    }, [Switch, openorder, orderH])
    
    const perenatage=(number)=>{
        console.log(number)
        if (number>0){
         return "+"+number+"%"
        }
        else{
            return "-"+number+"%"
        }
    }
    function mergeArr(arr) {
        let arrWarp = []
        let result = []
        console.log("test");
        console.log(arr);
        for (let item of arr) {
            if (arrWarp.includes(item.price) == false) {
                let obj = {
                    price: item.price,
                    amount: Number(item.amount),
                    sum: (item.sum).toFixed(PairInfo[Tradepair]["LimitCount"])
                }
                result.push(obj)
                arrWarp.push(item.price)

            } else {
                let index = arrWarp.indexOf(item.price)
                result[index].amount += Number(item.amount)
                result[index].sum =(Number(result[index].sum)+ Number(item.amount)).toFixed(PairInfo[Tradepair]["LimitCount"])



            }
        }
        console.log(result);
        return result
    }


    return (
        <div>
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
                    <AssetTable setTPair={(value) => { setTradepair(value) }} setC1={setcoin1} setC2={setcoin2} />
                    {/* repleace by AssetTable */}
                    {/* <div className={classes.columPartContainers}>
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
                                    <div className={classes.smallText} onClick={()=>changetradetype(item.Type)}>{item.Type}</div>
                                    <div  className={classes.smallText}>{item.lastPrice}</div>
                                    <div  style={{color: Math.sign(item.Change) === -1 ? "red" : "green",fontSize:'14px'}}>{perenatage(item.change)}</div>
                                </div>
                            );
                        })}
                    </div> */}
                    <div className={classes.columPartContainers}>
                        <div className={classes.ChartTitleContainer}>
                            <div>
                                <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', textAlign: 'left' }}>
                                    {coin1}/{coin2}
                                </div>
                                <div className={classes.ChartTitleInfoContainer}>
                                    <div style={{ color: 'green', fontSize: '10px' }}>{Tpinfo.close}</div>
                                    <div style={{ color: 'grey', fontSize: '10px' }}>=1 {coin2}</div>
                                    <div style={{ color: 'red', fontSize: '10px' }}>{perenatage(Tpinfo.close-Tpinfo.open)}</div>
                                </div>
                            </div>
                            <div>
                                <div style={{ color: '#546071', fontSize: '14px' }}>
                                    24H High
                                </div>
                                <div style={{ color: '#BFBFBF', fontSize: '14px' }}>
                                    {Tpinfo.high}
                                </div>
                            </div>
                            <div>
                                <div style={{ color: '#546071', fontSize: '14px' }}>
                                    24H Low
                                </div>
                                <div style={{ color: '#BFBFBF', fontSize: '14px' }}>
                                {Tpinfo.low}
                                </div>
                            </div>

                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: '5% 5% 5% 5% 5% 5% 5% 5% 5% 65%',
                        }}>
                            <div style={{ color: 'white' }}>Time</div>
                            <div style={{ color: 'white' }} onClick={() => setTime(60)}>1m</div>
                            <div style={{ color: 'white' }} onClick={() => setTime(300)}>5m</div>
                            <div style={{ color: 'white' }} onClick={() => setTime(900)}>15m</div>
                            <div style={{ color: 'white' }} onClick={() => setTime(1800)}>30m</div>
                            <div style={{ color: 'white' }} onClick={() => setTime(3600)}>1H</div>
                            <div style={{ color: 'white' }} onClick={() => setTime(14400)}>4H</div>
                            <div style={{ color: 'white' }} onClick={() => setTime(86400)}>1D</div>
                            <div style={{ color: 'white' }} onClick={() => setTime(604800)}>1W</div>
                        </div>
                        <div>
                            <Chart time={Time} Type={Tradepair} />
                        </div>
                        <div style={{ position: 'relative', bottom: '-2%' }}>
                            <div style={{
                                color: '#515B6E', fontWeight: 'bold', fontSize: '20px', textAlign: 'left', backgroundColor: '#141126',
                                border: 'solid', borderWidth: "3px 0px 0px 0px",
                                borderColor: "#37C24A", width: '130px', padding: '3px 9px 3px 9px'
                            }}>EXCHANGE</div>
                            <div className={classes.ExchangeContainer}>
                                <div className={classes.Left}>
                                    <div className={classes.ExchangeButton}>
                                        <button className={classes.ExchangeButtonSetting} onClick={()=>{setSellactive("Limit")}}>Limit</button>
                                        <button className={classes.ExchangeButtonSetting} onClick={()=>{marketpricesellTrade(); setSellactive("Market");}}>Market</button>
                                    </div>
                                    {Sellactive == "Limit" &&
                                        <div>
                                    <div><input type="number" onChange={sellpricechange} min="0" className={classes.inputSetting} placeholder="Price"></input></div>
                                    <div><input type="number" onChange={sellamountchange} min="0" className={classes.inputSetting} placeholder="Amount"></input></div>
                                    </div>}
                                    {Sellactive == "Market" &&
                                        <div>
                                    
                                    <div><input type="number" onChange={sellamountchange} min="0" className={classes.inputSetting} placeholder="Amount"></input></div>
                                    </div>}

                                    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', width: '100%', }}>
                                        <div style={{ color: 'white', fontSize: '10px', textAlign: 'left' }}>total</div>
                                        <div style={{ color: 'white', fontSize: '10px', textAlign: 'right' }}>{stotal}</div>
                                    </div>
                                    <div><button onClick={handleSell} className={classes.buttonSettingRed}>Sell</button></div>
                                </div>
                                <div>
                                    <div className={classes.verticleLine} />
                                </div>
                                <div className={classes.Right}>
                                    <div className={classes.ExchangeButton}>
                                        <button className={classes.ExchangeButtonSetting} onClick={()=>{setBuyactive("Limit")}}>Limit</button>
                                        <button className={classes.ExchangeButtonSetting} onClick={()=>{marketpricebuyTrade();setBuyactive("Market");}}>Market</button>
                                    </div>

                                    {Buyactive=="Limit" &&
                                        <div>
                                    <div><input type="number" onChange={buypricechange} min="0" className={classes.inputSetting} placeholder="Price"></input></div>
                                    <div><input type="number" onChange={buyamountchange} min="0" className={classes.inputSetting} placeholder="Amount" ></input></div>
                                    </div>}
                                    {Buyactive=="Market" &&
                                        <div>
                                    <div><input type="number" onChange={buyamountchange} min="0" className={classes.inputSetting} placeholder="Amount" ></input></div>
                                    </div>}
                                    
                                    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', width: '100%', }}>
                                        <div style={{ color: 'white', fontSize: '10px', textAlign: 'left' }}>total</div>
                                        <div style={{ color: 'white', fontSize: '10px', textAlign: 'right' }}>{btotal}</div>
                                    </div>
                                    <div><button onClick={handlebuy} className={classes.buttonSettingGreen}>Buy</button></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.columPartContainers}>
                        <div className={classes.TitleText}>OrderBook</div>
                        <div style={{ height: '45%' }}>
                            <div className={classes.leftSideContainer}>
                                <div className={classes.smallText2}>Price</div>
                                <div className={classes.smallText2}>Amount</div>
                                <div className={classes.smallText2}>sum</div>
                            </div>
                            {buyorder.map((item, index) => {
                                return (
                                    <div className={classes.leftSideContainer}>
                                        <div className={classes.smallTextRed}>{item.price}</div>
                                        <div className={classes.smallText}>{item.amount}</div>
                                        <div className={classes.smallText}>{item.sum}</div>
                                    </div>
                                );
                            })}
                        </div>
                        <div>
                            <hr
                                style={{
                                    color: '#707070',
                                    height: 3,
                                    width: '100%'
                                }} />
                        </div>
                        <div className={classes.leftSideContainer}>
                            <div className={classes.smallText2}>Price</div>
                            <div className={classes.smallText2}>Amount</div>
                            <div className={classes.smallText2}>sum</div>
                        </div>
                        {sellorder.map((item, index) => {
                            return (
                                <div className={classes.leftSideContainer}>
                                    <div className={classes.smallTextGreen}>{item.price}</div>
                                    <div className={classes.smallText}>{item.amount}</div>
                                    <div className={classes.smallText}>{item.sum}</div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={classes.columPartContainers}>
                        <div className={classes.TitleText}>MarketTrade</div>
                        <div className={classes.leftSideContainer}>
                            <div className={classes.smallText2}>Time</div>
                            <div className={classes.smallText2}>Price</div>
                        </div>
                        {market.map((item, index) => {
                            return (
                                <div className={classes.leftSideContainer}>
                                    <div className={classes.smallText}>{item.time}</div>
                                    <div className={classes.smallText}>{item.price}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className={classes.buttonContainer}>
                {active == "openOrder" &&
                    <div>
                <button onClick={() => { SwitchOpenOrder(); setActive("openOrder") }} >Open Order</button>
                <button style={{backgroundColor:'#04011A',color:'white'}}onClick={() => { Switchistory(); setActive("orderHistory") }}>Order history</button>
                </div>}
                {active == "orderHistory" &&
                    <div>
                <button style={{backgroundColor:'#04011A',color:'white'}} onClick={() => { SwitchOpenOrder(); setActive("openOrder") }} >Open Order</button>
                <button onClick={() => { Switchistory(); setActive("orderHistory") }}>Order history</button>
                </div>}
            </div>
            {active == "openOrder" &&
                <div style={{ height: '1000px' }}>
                    <div className={classes.openOrderContainer}>
                        <div className={classes.smallText2}>Pair</div>
                        <div className={classes.smallText2}>Type</div>
                        <div className={classes.smallText2}>Side</div>
                        <div className={classes.smallText2}>Price</div>
                        <div className={classes.smallText2}>Amount</div>
                        <div className={classes.smallText2}>DoneAmount</div>

                    </div>
                    {bottom.map((item, index) => {
                        return (
                            <div className={classes.openOrderContainer}>
                                <div className={classes.smallText}>{item.tradePair}</div>
                                <div className={classes.smallText}>{item.tradeType}</div>
                                <div className={classes.smallText}>{item.price}</div>
                                <div className={classes.smallText}>{item.amount}</div>
                            </div>
                        );
                    })}
                </div>}
            {active == "orderHistory" &&
                <div style={{ height: '1000px' }}>
                    <div className={classes.orderHistoryContainer}>
                        <div className={classes.smallText2}>Time</div>
                        <div className={classes.smallText2}>Pair</div>
                        <div className={classes.smallText2}>Side</div>
                        <div className={classes.smallText2}>Price</div>
                        <div className={classes.smallText2}>Amount</div>
                    </div>
                    {bottom.map((item, index) => {
                        return (
                            <div className={classes.orderHistoryContainer}>
                                <div className={classes.smallText}>{item.time}</div>
                                <div className={classes.smallText}>{item.tradePair}</div>
                                <div className={classes.smallText}>{item.tradeType}</div>
                                <div className={classes.smallText}>{item.price}</div>
                                <div className={classes.smallText}>{item.amount}</div>
                            </div>
                        );
                    })}
                </div>}
        </div>
    )
}

export default Exchange