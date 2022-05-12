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
import Popup from 'reactjs-popup';
import Mode from './Mode';
import OrderBook from '../OrderBook/OrderBook';
import SelectedTP from '../SelectedTP/SelectedTP';

const Margin = () => {
    const classes = useStyles()
    const history = useHistory();
    const user = useSelector((state) => state.user.value)
    const [formErrors, setFormErrors] = useState({})
    const [stotal, setstotal] = useState(0)
    const [btotal, setbtotal] = useState(0)
    const [UserBTC, setUBTC] = useState();

    const [BTC, setBTC] = useState();
    const [USDC, setUUSDC] = useState();
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
    const [Tradepair, setTradepair] = useState("BTCUSDC")
    const [coin1, setcoin1] = useState("BTC")
    const [coin2, setcoin2] = useState("USDC")
    const [Time, setTime] = useState(1800)

    const [totalAsset, setTotalAsset] = useState()
    const [totalLiability, setTotalLiability] = useState()

    const [riskRate, setRiskRate] = useState()
    const [change, setChange] = useState()
    const [active, setActive] = useState("openOrder")

    const [Switch, setswitch] = useState(0)

    const [openorder, setopenorder] = useState([])
    const [orderH, setorderH] = useState([])
    const [bottom, setbottom] = useState([])
    const [PairInfo, setInfo] = useState({})
    const [Tpinfo, setTPINFO] = useState({ close: 0, high: 0, low: 0 })





    //////////////////////////////////////////////////////////////////////////////////////////////


    useEffect(() => {
        MarginAPI.getRiskRate({ "UID": user.UID }).then((response) => {
            console.log(response.data)
            setRiskRate(response.data["RiskRate"])
        })
    }, [])
    useEffect(() => {
        MarginAPI.getTotalAsset({ "UID": user.UID }).then((response) => {
            console.log(response.data)
            setTotalAsset(response.data["TotalAsset"])
        })
    }, [])
    useEffect(() => {
        MarginAPI.getTotalLiability({ "UID": user.UID }).then((response) => {
            console.log(response.data)
            setTotalLiability(response.data["TotalLiability"])
        })
    }, [])

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
        MarketAPI.getPrice({ "TradePair": "BTCUSDC" }).then((response) => {
            setBTC(response.data["price"])
        })
        MarketAPI.getPrice({ "TradePair": "BCHUSDC" }).then((response) => {
            setBCH(response.data["price"])
        })
        MarketAPI.getPrice({ "TradePair": "ETHUSDC" }).then((response) => {
            setETH(parseFloat(response.data["price"]));
        })

        MarketAPI.getOpenPrice({ "TradePair": "BTCUSDC" }).then((response) => {
            setOPBTC(parseFloat(response.data["price"]))
        })
        MarketAPI.getOpenPrice({ "TradePair": "BCHUSDC" }).then((response) => {
            setOPBCH(parseFloat(response.data["price"]));
        })
        MarketAPI.getOpenPrice({ "TradePair": "ETHUSDC" }).then((response) => {
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
        MarketAPI.getOrder({ "TradePair": Tradepair, "TradeType": 3 }).then((response) => {
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
        MarketAPI.getOrder({ "TradePair": Tradepair, "TradeType": 2 }).then((response) => {
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
        setTradepair(type + "USDC")
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


    const handleSellBuy = (i) => {
        if (i == 0) {
            return "Buy"
        } else {
            return "Sell"
        }

    }
    


    return (
        <div >

            <div className={classes.UpContainers}>
                <div className={classes.columContainers}>
                    <div className={classes.columPartContainers}>
                        <AssetTable setTPair={(value) => { setTradepair(value) }} setC1={setcoin1} setC2={setcoin2} />
                        <div style={{ height: '230px', position: 'relative', bottom: '-350px', backgroundColor: '#141126' }}>
                            <div style={{ color: 'white', fontSize: '20px', textAlign: 'left', fontWeight: 'bold', marginBottom: '10px', marginLeft: '10px' }}>Margin Account</div>
                            <div style={{ color: 'grey', fontSize: '14px', textAlign: 'left', marginLeft: '10px' }}>Total Asset</div>
                            <div style={{ color: 'white', fontSize: '14px', textAlign: 'left', marginLeft: '10px' }}>{totalAsset}</div>
                            <div style={{ color: 'grey', fontSize: '14px', textAlign: 'left', marginLeft: '10px' }}>Total liability</div>
                            <div style={{ color: 'white', fontSize: '14px', textAlign: 'left', marginLeft: '10px' }}>{totalLiability}</div>
                            <div >
                                <ReactSpeedometer
                                    ringWidth={20}
                                    width={150}
                                    height={100}
                                    maxValue={3}
                                    value={riskRate}
                                    needleColor="red"
                                    startColor="blue"
                                    segments={6}
                                    endColor="green"
                                    textColor='grey'

                                />
                            </div>
                        </div>
                    </div>
                    <div className={classes.columPartContainers}>
                          <SelectedTP  TradePair={Tradepair} Refresh={change} Coin1={coin1} Coin2={coin2}/>
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
                        <Mode/>
                    </div>

                    <OrderBook TradePair={Tradepair}/>
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
                        <button style={{ backgroundColor: '#04011A', color: 'white' }} onClick={() => { Switchistory(); setActive("orderHistory") }}>Order history</button>
                    </div>}
                {active == "orderHistory" &&
                    <div>
                        <button style={{ backgroundColor: '#04011A', color: 'white' }} onClick={() => { SwitchOpenOrder(); setActive("openOrder") }} >Open Order</button>
                        <button onClick={() => { Switchistory(); setActive("orderHistory"); }}>Order history</button>
                    </div>}
            </div>
            {active == "openOrder" &&
                <div style={{ height: '1000px' }}>
                    <div className={classes.orderHistoryContainer}>
                        <div className={classes.smallText2}>Pair</div>
                        <div className={classes.smallText2}>Side</div>
                        <div className={classes.smallText2}>Price</div>
                        <div className={classes.smallText2}>Amount</div>
                        <div className={classes.smallText2}>DoneAmount</div>

                    </div>
                    {bottom.map((item, index) => {
                        return (
                            <div className={classes.orderHistoryContainer}>
                                <div className={classes.smallText}>{item.tradePair}</div>
                                <div className={classes.smallText}>{handleSellBuy(item.tradeType)}</div>
                                <div className={classes.smallText}>{item.price}</div>
                                <div className={classes.smallText}>{item.amount}</div>
                                <div className={classes.smallText}>{item.doneAmount}</div>
                                
                            </div>
                        );
                    })}
                </div>}
            {active == "orderHistory" &&
                <div style={{ height: '1000px' }}>
                    <div className={classes.openOrderContainer}>
                        <div className={classes.smallText2}>Time</div>
                        <div className={classes.smallText2}>Pair</div>
                        <div className={classes.smallText2}>Side</div>
                        <div className={classes.smallText2}>Price</div>
                        <div className={classes.smallText2}>Amount</div>
                        <div className={classes.smallText2}>total</div>
                    </div>
                    {bottom.map((item, index) => {
                        return (
                            <div className={classes.openOrderContainer}>
                                <div className={classes.smallText}>{item.time}</div>
                                <div className={classes.smallText}>{item.tradePair}</div>
                                <div className={classes.smallText}>{handleSellBuy(item.tradeType)}</div>
                                <div className={classes.smallText}>{item.price}</div>
                                <div className={classes.smallText}>{item.amount}</div>
                                <div className={classes.smallText}>{item.amount*item.price}</div>
                            </div>
                        );
                    })}
                </div>}
        </div>
    )
}

export default Margin