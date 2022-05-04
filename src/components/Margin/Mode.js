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

const Mode=()=>{
    const user = useSelector((state) => state.user.value)

    const classes = useStyles()
    const [formErrors, setFormErrors] = useState({})
    const [stotal, setstotal] = useState(0)
    const [btotal, setbtotal] = useState(0)
    const [UserBTC, setUBTC] = useState();

    const [BTC, setBTC] = useState();
    const [USDT, setUusdt] = useState();
    const [BCH, setBCH] = useState();
    const [ETH, setETH] = useState();

    const [currency,setcurrency]=useState("BTC")
    const [amount,setAmount]=useState(0)


    const [sellprice, setsellPrice] = useState()
    const [sellamount, setsellamount] = useState()
    const [buyprice, setbuyPrice] = useState()
    const [buyamount, setbuyamount] = useState()
    const [Tradepair, setTradepair] = useState("BTCUSDT")
    const [coin1, setcoin1] = useState("BTC")
    const [coin2, setcoin2] = useState("USDT")
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
    const handleSell = () => {
        if (UserBTC > sellamount) {
            MarketAPI.submitTrade({ "TradePair": Tradepair, "UID": user.UID, "Amount": sellamount, "Price": sellprice, "TradeType": 3 })
        }
        else {
            alert("not enought BTC")
        }
    }

    const handlebuy = () => {
        if (USDT > buyamount * parseFloat(BTC)) {
            MarketAPI.submitTrade({ "TradePair": Tradepair, "UID": user.UID, "Amount": buyamount, "Price": buyprice, "TradeType": 2 })
        }
        else {
            alert("not enought USDT")
        }
    }
    const NormalhandleSell = () => {

        if (UserBTC > sellamount) {
            MarketAPI.submitTrade({ "TradePair": Tradepair, "UID": user.UID, "Amount": sellamount, "Price": sellprice, "TradeType": 3 })
            window.location.reload();
        }
        else {
            alert("not enough "+ coin1)
        }
        if (change == 1) {
            setChange(2)
        }
        else {
            setChange(1)
        }

    }


    const Normalhandlebuy = () => {
        if (USDT > buyamount * buyprice) {
            MarketAPI.submitTrade({ "TradePair": Tradepair, "UID": user.UID, "Amount": buyamount, "Price": buyprice, "TradeType": 2 })
            window.location.reload();
        }
        else {
            alert("not enough "+ coin2)
        }
        if (change == 1) {
            setChange(2)
        }
        else {
            setChange(1)
        }
    }

    const handleLoan=()=>{
        MarginAPI.getLend({"UID":user.UID,"Currency":currency,"Amount":amount}).then((response) => {
            console.log(response.data)
        })
        window.location.reload();

    }
    const handleRefund=()=>{
        MarginAPI.getReturnBack({"UID":user.UID,"Currency":currency,"Amount":amount}).then((response) => {
            console.log(response.data)
        })
        window.location.reload();

    }
    const setCurrency=(event)=>{
        setcurrency(event.target.value)
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
                        <select className={classes.inputSetting3} onChange={setcurrency}>
                            <option >BTC</option>
                            <option >ETH</option>
                            <option >BCH</option>
                            <option >USDT</option>
                        </select>
                    </div>
                    <div style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }} onChange={setAmount}>Enter Amount</div>
                    <div style={{ textAlign: 'center' }}>
                        <input />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '5%' }}>
                        <button onClick={handleLoan}>Confirm</button>
                    </div>
                </Popup>
                <Popup contentStyle={{ width: '20%', backgroundColor: '#04011A' }} trigger={<button style={{ color: 'white', backgroundColor: '#141126', width: '90%', height: '80%', marginLeft: '5%' }}>refund</button>} position="center">
                    <div style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }} onChange={setAmount}>Coin</div>
                    <div style={{ textAlign: 'center' }}>
                        <select className={classes.inputSetting3} onChange={setcurrency}>
                            <option >BTC</option>
                            <option >ETH</option>
                            <option >BCH</option>
                            <option >USDT</option>
                        </select>
                    </div>
                    <div style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Enter Amount</div>
                    <div style={{ textAlign: 'center' }}>
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
                    <div><button onClick={handleSell} className={classes.buttonSettingRed}>Sell</button></div>
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
                    <div><button onClick={handlebuy} className={classes.buttonSettingGreen}>Buy</button></div>
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
                        <select className={classes.inputSetting3} onChange={setcurrency}>
                            <option >BTC</option>
                            <option >ETH</option>
                            <option >BCH</option>
                            <option >USDT</option>
                        </select>
                    </div>
                    <div style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Enter Amount</div>
                    <div style={{ textAlign: 'center' }}>
                        <input />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '5%' }}>
                        <button>Confirm</button>
                    </div>
                </Popup>
                <Popup contentStyle={{ width: '20%', backgroundColor: '#04011A' }} trigger={<button style={{ color: 'white', backgroundColor: '#141126', width: '90%', height: '80%', marginLeft: '5%' }}>refund</button>} position="center">
                    <div style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Coin</div>
                    <div style={{ textAlign: 'center' }}>
                        <select className={classes.inputSetting3} onChange={setcurrency}>
                            <option >BTC</option>
                            <option >ETH</option>
                            <option >BCH</option>
                            <option >USDT</option>
                        </select>
                    </div>
                    <div style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Enter Amount</div>
                    <div style={{ textAlign: 'center' }}>
                        <input />
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '5%' }}>
                        <button>Confirm</button>
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
                    <div><button onClick={NormalhandleSell} className={classes.buttonSettingRed}>Sell</button></div>
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
                    <div><button onClick={Normalhandlebuy} className={classes.buttonSettingGreen}>Buy</button></div>
                </div>
            </div>
        </div>}








</div>
)
}
export default Mode