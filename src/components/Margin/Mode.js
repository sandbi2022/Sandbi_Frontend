import { useRef, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import WalletAPI from '../../api/wallet_api';
import MarketAPI from '../../api/market-api';
import MarginAPI from '../../api/margin-api';
import InfoAPI from '../../api/Info-api';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from "./style";
import Chart from "../Chart/Kline";
import { useLocation } from "react-router-dom";
import ReactSpeedometer from 'react-d3-speedometer';
import AssetTable from '../TradeData/Asset/AssetTable';
import UserServer from '../../api/user-api';
import Popup from 'reactjs-popup';

const Mode=()=>{
    const user = useSelector((state) => state.user.value)

    const classes = useStyles()
    const [formErrors, setFormErrors] = useState({})
    const [stotal, setstotal] = useState(0)
    const [btotal, setbtotal] = useState(0)
    const [UserBTC, setUBTC] = useState();

    const [BTC, setBTC] = useState();
    const [USDC, setUUSDC] = useState();
    const [BCH, setBCH] = useState();
    const [ETH, setETH] = useState();

    const [currency,setcurrency]=useState("BTC")
    const [amount,setamount]=useState(0)
    const [buyorder, setbuyorder] = useState([])
    const [sellorder, setsellorder] = useState([])

    const location = useLocation();
    const [sellprice, setsellPrice] = useState()
    const [sellamount, setsellamount] = useState()
    const [buyprice, setbuyPrice] = useState()
    const [buyamount, setbuyamount] = useState()
    const [Tradepair, setTradepair] = useState("BTCUSDC")
    const [coin1, setcoin1] = useState("BTC")
    const [coin2, setcoin2] = useState("USDC")
    const [Time, setTime] = useState(1800)

    const [change, setChange] = useState()
    const [active, setActive] = useState("openOrder")
    const [Sellactive, setSellactive] = useState("Limit")
    const [Buyactive, setBuyactive] = useState("Limit")
    const [Modeactive, setModeactive] = useState("AutomaticLoan")
    const [Switch, setswitch] = useState(0)

    const [openorder, setopenorder] = useState([])
    const [orderH, setorderH] = useState([])
    const [bottom, setbottom] = useState([])
    const [PairInfo, setInfo] = useState({})
    const [Tpinfo, setTPINFO] = useState({ close: 0, high: 0, low: 0 })

    const [liability,setLiability]=useState()

    useEffect(()=>{
        MarginAPI.getTotalLiability({"UID": user.UID}).then((response)=>{
            console.log(response.data)
            setLiability(response.data["TotalLiability"])
        })
    },[])

    useEffect(() => {
        const UID = user.UID;
        WalletAPI.getBalance({ UID }).then((response) => {
            const data = response.data;
            setUBTC(data[coin1] - data["Freeze" + coin1])
            setUUSDC(data[coin2] - data["Freeze" + coin2])
        });
    }, [change, Tradepair])
    
    useEffect(() => {
        InfoAPI.getTradePairs().then((response) => {
            var newlist = {}
            for (let [key, value] of Object.entries(response.data)) {
                var data = JSON.parse(value)
                newlist[key] = data
            }
            setInfo(newlist)
        })
    }, [])

    useEffect(()=>{
        if(typeof location.state !== 'undefined'){
            console.log(location.state.detail)
            setTradepair(location.state.detail)
            if(Object.keys(PairInfo).length !== 0){
                console.log(PairInfo)
                setcoin1(PairInfo[location.state.detail]["Coin1"])
                 setcoin2(PairInfo[location.state.detail]["Coin2"])

            }
            
        }
    },[PairInfo])

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
    const AutoRefund = (amount)=>{
        MarginAPI.getReturnBack({"UID":user.UID,"Currency":coin2,"Amount":amount}).then((response) => {
            console.log(response.data)
        })

    }

    const handleAutoSell = () => {
        if (UserBTC > sellamount) {
            MarketAPI.submitTrade({ "TradePair": Tradepair, "UID": user.UID, "Amount": sellamount, "Price": sellprice, "TradeType": 3 })
            // check if liability.if has, help to return as much as possible
            //else nothing happen
            var amountLeft=(UserBTC-sellamount)*sellprice;
            if(liability>0&&liability>=amountLeft){
                AutoRefund(amountLeft)

            }else if(liability>0&&liability<amountLeft){
                AutoRefund(liability)
            }
            
        }
        else {
            alert("not enough " + coin1)
            
        }
        if (change == 1) {
            setChange(2)
        }
        else {
            setChange(1)
        }
    }

    const handleAutobuy = () => {
        if (USDC > buyamount * buyprice) {
            MarketAPI.submitTrade({ "TradePair": Tradepair, "UID": user.UID, "Amount": buyamount, "Price": buyprice, "TradeType": 2 })
        }
        else {
            //not enough, auto lend
            var amount=buyamount* buyprice-USDC;
            MarginAPI.getLend({"UID":user.UID,"Currency":coin2,"Amount":amount})
            MarketAPI.submitTrade({ "TradePair": Tradepair, "UID": user.UID, "Amount": USDC, "Price": sellprice, "TradeType": 3 })
            
        }
        if (change == 1) {
            setChange(2)
        }
        else {
            setChange(1)
        }
    }
    
    const handleNormalSell = () => {
        if (UserBTC > sellamount) {
            MarketAPI.submitTrade({ "TradePair": Tradepair, "UID": user.UID, "Amount": sellamount, "Price": sellprice, "TradeType": 3 })
        }
        else {
            alert("not enough " + coin1)
        }
        if (change == 1) {
            setChange(2)
        }
        else {
            setChange(1)
        }
    }

    const handleNormalbuy = () => {
        if (USDC > buyamount * buyprice) {
            MarketAPI.submitTrade({ "TradePair": Tradepair, "UID": user.UID, "Amount": buyamount, "Price": buyprice, "TradeType": 2 })
        }
        else {
            alert("not enough " + coin2)
        }
        if (change == 1) {
            setChange(2)
        }
        else {
            setChange(1)
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
        console.log(sellorder[0]);
        console.log(sellorder[0]["price"]);
        if (sellorder.length > 0) {
            setsellPrice(sellorder[0]["price"])
        }
        else {
            alert("There is no available sell order")
        }

    }


    const handleLoan=()=>{
        MarginAPI.getLend({"UID":user.UID,"Currency":currency,"Amount":amount}).then((response) => {
            console.log(response.data)
        })
        

    }
    const handleRefund=()=>{
        MarginAPI.getReturnBack({"UID":user.UID,"Currency":currency,"Amount":amount}).then((response) => {
            console.log(response.data)
        })
        

    }
    const setCurrency=(event)=>{
        setcurrency(event.target.value)
    }
    const setAmount =(event)=>{
        setamount(event.target.value)
    }
    
return(
    <div style={{ position: 'relative', bottom: '-0.6%' }}>



    {Modeactive == "AutomaticLoan" &&
        <div>
            <div className={classes.SwitchButtonContainer2}>
                <div style={{
                    color: '#515B6E', fontWeight: 'bold', fontSize: '20px', textAlign: 'center', backgroundColor: '#141126',
                    border: 'solid', borderWidth: "3px 0px 0px 0px",
                    borderColor: "#37C24A", width: '100%', padding: '3px 9px 3px 9px'
                }}>Automatic Mode</div>
                <div style={{ color: '#515B6E', fontWeight: 'bold', fontSize: '20px', textAlign: 'center', width: '100%', padding: '3px 9px 3px 9px' }}
                    onClick={() => setModeactive("NormalMode")}>Normal Mode</div>
                    <Popup contentStyle={{ width: '20%', backgroundColor: '#04011A' }} trigger={<button style={{ color: 'white', backgroundColor: '#141126', width: '90%', height: '80%', marginLeft: '5%' }}>loan</button>} position="center">
                    <div style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Coin</div>

                    <div style={{ textAlign: 'center' }}>
                        <select className={classes.inputSetting3} onChange={setCurrency}>
                            <option >BTC</option>
                            <option >ETH</option>
                            <option >BCH</option>
                            <option >USDC</option>
                        </select>
                    </div>
                    <div style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Enter Amount</div>
                    <div style={{ textAlign: 'center' }} onChange={setAmount}>
                        <input />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '5%' }}>
                        <button onClick={handleLoan}>Confirm</button>
                    </div>
                </Popup>
                <Popup contentStyle={{ width: '20%', backgroundColor: '#04011A' }} trigger={<button style={{ color: 'white', backgroundColor: '#141126', width: '90%', height: '80%', marginLeft: '5%' }}>refund</button>} position="center">
                    <div style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Coin</div>
                    <div style={{ textAlign: 'center' }}>
                        <select className={classes.inputSetting3} onChange={setCurrency}>
                            <option >BTC</option>
                            <option >ETH</option>
                            <option >BCH</option>
                            <option >USDC</option>
                        </select>
                    </div>
                    <div style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }} >Enter Amount</div>
                    <div style={{ textAlign: 'center' }} onChange={setAmount}>
                        <input />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '5%' }}>
                        <button onClick={handleRefund}>Confirm</button>
                    </div>
                </Popup>

            </div>
            <div className={classes.ExchangeContainer}>
                <div className={classes.Left}>
                    <div className={classes.ExchangeButton}>
                        <button className={classes.ExchangeButtonSetting} onClick={() => { setSellactive("Limit"); }}>Limit</button>
                        <button className={classes.ExchangeButtonSetting} onClick={() => { marketpricesellTrade(); setSellactive("Market"); }}>Market</button>
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
                    <div><button onClick={handleAutoSell} className={classes.buttonSettingRed}>Sell</button></div>
                </div>
                <div>
                    <div className={classes.verticleLine} />
                </div>
                <div className={classes.Right}>
                    <div className={classes.ExchangeButton}>
                        <button className={classes.ExchangeButtonSetting} onClick={() => { setBuyactive("Limit") }}>Limit</button>
                        <button className={classes.ExchangeButtonSetting} onClick={() => {marketpricebuyTrade(); setBuyactive("Market") }}>Market</button>
                    </div>
                    {Buyactive == "Limit" &&
                        <div>
                            <div><input type="number" onChange={buypricechange} min="0" className={classes.inputSetting} placeholder="Price" ></input></div>
                            <div><input type="number" onChange={buyamountchange} min="0" className={classes.inputSetting} placeholder="Amount" ></input></div>
                        </div>}
                    {Buyactive == "Market" &&
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
                    <div><button onClick={handleAutobuy} className={classes.buttonSettingGreen}>Buy</button></div>
                </div>
            </div>
        </div>}





    {Modeactive == "NormalMode" &&
        <div>
            <div className={classes.SwitchButtonContainer2}>
                <div style={{ color: '#515B6E', fontWeight: 'bold', fontSize: '20px', textAlign: 'center', width: '100%', padding: '3px 9px 3px 9px' }}
                    onClick={() => setModeactive("AutomaticLoan")}>Automatic Mode</div>
                <div style={{
                    color: '#515B6E', fontWeight: 'bold', fontSize: '20px', textAlign: 'center', backgroundColor: '#141126',
                    border: 'solid', borderWidth: "3px 0px 0px 0px",
                    borderColor: "#37C24A", width: '100%', padding: '3px 9px 3px 9px'
                }}
                >Normal Mode</div>
                <Popup contentStyle={{ width: '20%', backgroundColor: '#04011A' }} trigger={<button style={{ color: 'white', backgroundColor: '#141126', width: '90%', height: '80%', marginLeft: '5%' }}>loan</button>} position="center">
                    
                    <div style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Coin</div>

                    <div style={{ textAlign: 'center' }}>
                        <select className={classes.inputSetting3} onChange={setCurrency}>
                            <option >BTC</option>
                            <option >ETH</option>
                            <option >BCH</option>
                            <option >USDC</option>
                        </select>
                    </div>
                    <div style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Enter Amount</div>
                    <div style={{ textAlign: 'center' }} onChange={setAmount}>
                        <input />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '5%' }}>
                        <button  onClick={handleLoan}>Confirm</button>
                    </div>
                </Popup>
                <Popup contentStyle={{ width: '20%', backgroundColor: '#04011A' }} trigger={<button style={{ color: 'white', backgroundColor: '#141126', width: '90%', height: '80%', marginLeft: '5%' }}>refund</button>} position="center">
                    <div style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Coin</div>
                    <div style={{ textAlign: 'center' }}>
                        <select className={classes.inputSetting3} onChange={setCurrency}>
                            <option >BTC</option>
                            <option >ETH</option>
                            <option >BCH</option>
                            <option >USDC</option>
                        </select>
                    </div>
                    <div style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Enter Amount</div>
                    <div style={{ textAlign: 'center' }} onChange={setAmount}>
                        <input />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '5%' }}>
                        <button onClick={handleRefund} >Confirm</button>
                    </div>
                </Popup>


            </div>
            <div className={classes.ExchangeContainer}>
                <div className={classes.Left}>
                    <div className={classes.ExchangeButton}>
                        <button className={classes.ExchangeButtonSetting} onClick={() => { setSellactive("Limit"); }}>Limit</button>
                        <button className={classes.ExchangeButtonSetting} onClick={() => { setSellactive("Market"); }}>Market</button>

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
                    <div><button onClick={handleNormalSell} className={classes.buttonSettingRed}>Sell</button></div>
                </div>
                <div>
                    <div className={classes.verticleLine} />
                </div>
                <div className={classes.Right}>
                    <div className={classes.ExchangeButton}>
                        <button className={classes.ExchangeButtonSetting} onClick={() => { setBuyactive("Limit") }}>Limit</button>
                        <button className={classes.ExchangeButtonSetting} onClick={() => { setBuyactive("Market") }}>Market</button>
                    </div>
                    {Buyactive == "Limit" &&
                        <div>
                            <div><input type="number" onChange={buypricechange} min="0" className={classes.inputSetting} placeholder="Price" ></input></div>
                            <div><input type="number" onChange={buyamountchange} min="0" className={classes.inputSetting} placeholder="Amount" ></input></div>
                        </div>}
                    {Buyactive == "Market" &&
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
                    <div><button onClick={handleNormalbuy} className={classes.buttonSettingGreen}>Buy</button></div>
                </div>
            </div>
        </div>}








</div>
)
}
export default Mode