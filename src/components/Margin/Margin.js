import { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import WalletAPI from '../../api/wallet_api';
import MarketAPI from '../../api/market-api';
import MarginAPI from '../../api/margin-api';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from "./style";
import Chart from "../Chart/Kline";
import ReactSpeedometer from 'react-d3-speedometer';
import AssetTable from '../TradeData/Asset/AssetTable';
import UserServer from '../../api/user-api';

const Margin = () => {
    const classes = useStyles()
    const history = useHistory();
    const user = useSelector((state) => state.user.value)
    const [formErrors, setFormErrors] = useState({})
    const [stotal, setstotal] = useState(0)
    const [btotal, setbtotal] = useState(0)
    const [BTC, setBTC] = useState();
    const [UserBTC, setUBTC] = useState();
    const [USDT, setUusdt] = useState();
    const [BCH, setBCH] = useState();
    const [ETH, setETH] = useState();
    const [OPBTC, setOPBTC] = useState();
    const [OPBCH, setOPBCH] = useState();
    const [OPETH, setOPETH] = useState();
    const [Coindata, setCoindata] = useState([])
    const [buyorder, setbuyorder] = useState([])
    const [sellorder, setsellorder] = useState([])
    const [market, setmarket] = useState([])
    const [sellprice, setsellPrice] = useState()
    const [sellamount, setsellamount] = useState()
    const [buyprice, setbuyPrice] = useState()
    const [buyamount, setbuyamount] = useState()
    const [Tradepair, setTradepair] = useState("BTCUSDT")
    const [coin1, setcoin1] = useState("BTC")
    const [coin2, setcoin2] = useState("USDT")
    const [Time, setTime] = useState(1800)
    const [totalAsset,setTotalAsset]=useState(5)
    const [totalLiability,setTotalLiability]=useState(2)
    const [riskRate,setRiskRate]=useState()
    const [change, setChange] = useState()
    const [active, setActive] = useState("openOrder")
    const [Sellactive,setSellactive]=useState("Limit")
    const [Buyactive,setBuyactive]=useState("Limit")
    const [MBalance, setMBal]= useState({})
    const [Switch, setswitch] = useState(0)
    const [openorder, setopenorder] = useState([])
    const [orderH, setorderH] = useState([])
    const [bottom, setbottom] = useState([])
    const [PairInfo, setInfo] = useState({})
    const [Tpinfo,setTPINFO]=useState({close:0,high:0,low:0})
    useEffect(() => {
        const UID = user.UID;
        console.log(UID);
        WalletAPI.getBalance({ UID }).then((response) => {
            const data = response.data;
            setUBTC(data["BTC"] - data["FreezeBTC"])
            setUusdt(data["USDT"] - data["FreezeUSDT"])
        });
    }, [])

    useEffect(()=>{
        setRiskRate(totalAsset/totalLiability);
        console.log(riskRate)
    },[])

    useEffect(() => {
        UserServer.getMarginBal({"UID":user.UID}).then((response)=>{
            console.log("margin")
           console.log(response.data)
           setMBal(response.data)
       
       }
       ) 
      }, []);

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
    useEffect(() => {
        MarketAPI.getPrice({ "TradePair": "BTCUSDT" }).then((response) => {
            setBTC(response.data["price"])
        })
        MarketAPI.getPrice({ "TradePair": "BCHUSDT" }).then((response) => {
            setBCH(response.data["price"])
        })
        MarketAPI.getPrice({ "TradePair": "ETHUSDT" }).then((response) => {
            setETH(parseFloat(response.data["price"]));
        })

        MarketAPI.getOpenPrice({ "TradePair": "BTCUSDT" }).then((response) => {
            setOPBTC(parseFloat(response.data["price"]))
        })
        MarketAPI.getOpenPrice({ "TradePair": "BCHUSDT" }).then((response) => {
            setOPBCH(parseFloat(response.data["price"]));
        })
        MarketAPI.getOpenPrice({ "TradePair": "ETHUSDT" }).then((response) => {
            setOPETH(parseFloat(response.data["price"]));
        })

    }, []);


    useEffect(() => {
        setCoindata([
            {
                Type: "BTC",
                lastPrice: BTC,
                change: (parseFloat((OPBTC - BTC) / BTC) * 100).toFixed(2)
            },
            {
                Type: "BCH",
                lastPrice: BCH,
                change: (parseFloat((OPBCH - BCH) / BCH) * 100).toFixed(2)
            },
            {
                Type: "ETH",
                lastPrice: ETH,
                change: (parseFloat((OPETH - ETH) / ETH) * 100).toFixed(2)
            },
        ]);

    }, [BCH, OPBCH, ETH, OPETH, BCH, OPBCH])

    const perenatage = (number) => {
        console.log(number)
        if (number > 0) {
            return "+" + number + "%"
        }
        else {
            return "-" + number + "%"
        }


    }
    useEffect(() => {
        MarketAPI.getOrder({ "TradePair": Tradepair, "TradeType": 1 }).then((response) => {
            console.log(response.data)
            var newlist = []
            for (let value of Object.values(response.data)) {
                var data = JSON.parse(value)
                newlist.push({
                    price: data["price"].toFixed(PairInfo[Tradepair]["LimitPrice"]),
                    amount: data["amount"] - data["doneAmount"].toFixed(PairInfo[Tradepair]["LimitCount"]),
                    sum: 0
                })
                console.log(newlist)
            }

            newlist.sort(function (a, b) { return -a.price + b.price })
            fillsum(newlist)
            setbuyorder(newlist)
        })
    }, [Tradepair]);

    useEffect(() => {
        MarketAPI.getOrder({ "TradePair": Tradepair, "TradeType": 0 }).then((response) => {
            console.log(response.data)
            var newlist = []
            for (let value of Object.values(response.data)) {
                var data = JSON.parse(value)
                newlist.push({
                    price: data["price"],
                    amount: data["amount"] - data["doneAmount"],
                    sum: 0
                })
                console.log(newlist)
            }

            newlist.sort(function (a, b) { return -a.price + b.price })
            fillbuysum(newlist)
            setsellorder(newlist)
        })
    }, [Tradepair]);



    const fillsum = (list) => {
        var sum = 0;
        for (let i = list.length - 1; i >= 0; i--) {
            sum += list[i]["amount"];
            list[i]["sum"] = sum;

        }
    }

    const fillbuysum = (list) => {
        var sum = 0;
        for (let i = 0; i < list.length; i++) {
            sum += list[i]["amount"];
            list[i]["sum"] = sum;

        }
    }

    const changetradetype = (type) => {
        console.log(type);
        setTradepair(type + "USDT")
    }

    useEffect(() => {
        MarketAPI.getHistoryOrder({ "TradePair": Tradepair }).then((response) => {
            console.log(response.data)
            var newlist = []
            for (let value of Object.values(response.data)) {
                var data = JSON.parse(value)
                newlist.push({
                    price: data["price"],
                    amount: data["amount"],
                    time: data["time"].slice(11,),
                    timestamp: new Date(Date.parse(data["time"])).getTime()
                })

            }
            newlist.sort(function (a, b) { return -a.timestamp + b.timestamp })
            console.log(newlist)
            setmarket(newlist)
        })
    }, [Tradepair]);


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
        console.log(sellamount)
        if (sellamount === undefined | sellamount === "" | sellprice === undefined | sellprice === "") {
            setstotal(0);
        }
        else {
            var total = parseFloat(sellamount) * parseFloat(sellprice)
            setstotal(total)
        }

    }, [sellamount, sellprice])


    useEffect(() => {
        console.log(sellamount)
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
    }

    const handlebuy = () => {
        if (USDT > buyamount * parseFloat(BTC)) {
            MarketAPI.submitTrade({ "TradePair": Tradepair, "UID": user.UID, "Amount": buyamount, "Price": buyprice, "TradeType": 0 })
        }
        else {
            alert("not enought USDT")
        }
    }



    return (
        <div >

            <div className={classes.UpContainers}>
                <div className={classes.columContainers}>
                    <div className={classes.columPartContainers}>
                        <AssetTable setTPair={(value) => { setTradepair(value) }} setC1={setcoin1} setC2={setcoin2} />
                        <div style={{ height: '230px', position: 'relative', bottom: '-350px', backgroundColor: '#141126' }}>
                            <div style={{ color: 'white', fontSize: '20px', textAlign: 'left', fontWeight: 'bold', marginBottom: '10px' }}>Margin Account</div>
                            <div style={{ color: 'grey', fontSize: '14px', textAlign: 'left' }}>Total Asset</div>
                            <div style={{ color: 'white', fontSize: '14px', textAlign: 'left' }}>{totalAsset}</div>
                            <div style={{ color: 'grey', fontSize: '14px', textAlign: 'left' }}>Total liability</div>
                            <div style={{ color: 'white', fontSize: '14px', textAlign: 'left' }}>{totalLiability}</div>
                            <div>
                                <ReactSpeedometer
                                    ringWidth={20}
                                    width={150}
                                    maxValue={5}
                                    value={riskRate}
                                    needleColor="red"
                                    startColor="blue"
                                    segments={5}
                                    endColor="green"
                                    textColor='grey'
                                    
                                />
                            </div>
                        </div>
                    </div>
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
                            <Chart time={Time} Type={Tradepair}
                            />
                        </div>
                        <div style={{ position: 'relative', bottom: '-0.6%' }}>

                                <div>
                                    <div className={classes.SwitchButtonContainer}>
                                        <div style={{
                                            color: '#515B6E', fontWeight: 'bold', fontSize: '20px', textAlign: 'left', backgroundColor: '#141126',
                                            border: 'solid', borderWidth: "3px 0px 0px 0px",
                                            borderColor: "#37C24A", width: '70%', padding: '3px 9px 3px 9px'
                                        }} onClick={() => setActive("AutomaticLoan")}>Automatic Mode</div>
                                    </div>
                                    <div className={classes.ExchangeContainer}>
                                        <div className={classes.Left}>
                                            <div className={classes.ExchangeButton}>
                                                <button className={classes.ExchangeButtonSetting} onClick={()=>{setSellactive("Limit");}}>Limit</button>
                                                <button className={classes.ExchangeButtonSetting} onClick={()=>{setSellactive("Market");}}>Market</button>
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
                                                <div style={{ color: 'white', fontSize: '10px', textAlign: 'left' }}>This loan</div>
                                                <div style={{ color: 'white', fontSize: '10px', textAlign: 'right' }}>0000</div>
                                            </div>
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
                                                <button className={classes.ExchangeButtonSetting} onClick={()=>{setBuyactive("Market")}}>Market</button>
                                            </div>
                                            {Buyactive=="Limit" &&
                                                <div>
                                            <div><input type="number" onChange={buypricechange} min="0" className={classes.inputSetting} placeholder="Price" ></input></div>
                                            <div><input type="number" onChange={buyamountchange} min="0" className={classes.inputSetting} placeholder="Amount" ></input></div>
                                            </div>}
                                            {Buyactive=="Market" &&
                                                <div>
                                            
                                            <div><input type="number" onChange={buyamountchange} min="0" className={classes.inputSetting} placeholder="Amount" ></input></div>
                                            </div>}
                                            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', width: '100%', }}>
                                                <div style={{ color: 'white', fontSize: '10px', textAlign: 'left' }}>This loan</div>
                                                <div style={{ color: 'white', fontSize: '10px', textAlign: 'right' }}>0000</div>
                                            </div>
                                            <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', width: '100%', }}>
                                                <div style={{ color: 'white', fontSize: '10px', textAlign: 'left' }}>total</div>
                                                <div style={{ color: 'white', fontSize: '10px', textAlign: 'right' }}>{btotal}</div>
                                            </div>
                                            <div><button onClick={handlebuy} className={classes.buttonSettingGreen}>Buy</button></div>
                                        </div>
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
                                    <div className={classes.smallText}>{item.sum.toFixed(2)}</div>
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
                                    <div className={classes.smallText}>{item.sum.toFixed(2)}</div>
                                </div>
                            );
                        })}
                    </div>
                    <div className={classes.columPartContainers}>
                        <div className={classes.TitleText}>MarketTrade</div>
                        <div className={classes.leftSideContainer}>
                            <div className={classes.smallText2}>Time</div>
                            <div className={classes.smallText2}>Price</div>
                            <div className={classes.smallText2}>Amount</div>
                        </div>
                        {market.map((item, index) => {
                            return (
                                <div className={classes.leftSideContainer}>
                                    <div className={classes.smallText}>{item.time}</div>
                                    <div className={classes.smallText}>{item.price}</div>
                                    <div className={classes.smallText}>{item.amount}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>

            <div className={classes.buttonContainer}>
                {active == "openOrder" &&
                    <div>
                <button onClick={() => { SwitchOpenOrder(); setActive("openOrder"); }} >Open Order</button>
                <button style={{backgroundColor:'#04011A',color:'white'}}onClick={() => { Switchistory(); setActive("orderHistory") }}>Order history</button>
                </div>}
                {active == "orderHistory" &&
                    <div>
                <button style={{backgroundColor:'#04011A',color:'white'}} onClick={() => { SwitchOpenOrder(); setActive("openOrder") }} >Open Order</button>
                <button onClick={() => { Switchistory(); setActive("orderHistory"); }}>Order history</button>
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

export default Margin