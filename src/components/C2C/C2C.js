import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import c2cAPI from '../../api/c2c-api';

import{useDispatch, useSelector} from 'react-redux';
import { Pend } from '../../features/trade';
import CreateOrder from './CreateOrder';
import UserOrder from '../UserOrder/UserOrder'
import Popup from 'reactjs-popup';
import InfoAPI from '../../api/Info-api';
import 'reactjs-popup/dist/index.css';
import BuyOrder from './BuyOrder';
import user from '../../features/user';
//import C2Cinfo from  "../C2C/BuyOrder";
const C2C = () => {

    const classes = useStyles();
    const history = useHistory();
    const user = useSelector((state)=>state.user.value)
    const [formErrors, setFormErrors] = useState({})
    const [active, setActive] = useState("Buy")
    const [buyplist, setbuyplist] = useState([])
    const [sellplist, setsellplist] = useState([])
    const [buyplistINIT, setbuyplistINIT] = useState([])
    const [sellplistINIT, setsellplistINIT] = useState([])
    const [historylist, sethlist] = useState([])
    const [PairInfo, setInfo] = useState({})
    const dispatch = useDispatch();
    const [TradePairlist, setTradepairlist] = useState(["BTC","ETH","USDC","BCH"])
    const [min, setMin] = useState();
    const [max, setMax] = useState();
    const [Refresh,setRefresh]= useState(0);
    // const sendInfo = (item) => {

    //     setMin(item.minAmount);
    //     setMax(item.maxAmount);
    //     console.log("min max"+min)
    //   }
    useEffect(() => {
        InfoAPI.getTradePairs().then((response) => {
            console.log(response.data)
            var newlist = {}
            var tmpPairlist = []
            for (let [key, value] of Object.entries(response.data)) {
                var data = JSON.parse(value)
                newlist[key] = data
                tmpPairlist.push(key)
            }
            setInfo(newlist)
            //setTradepairlist(tmpPairlist)
        })
    }, [])

    useEffect(() => {
        console.log("test")
        console.log(Refresh)
        var pairlist = []
        var PromiseBUYlist = [];
        var PromiseSelllist = [];
        for (let value of TradePairlist) {
           // console.log(value)
            var Tpair = value + "USD"
          //  console.log(Tpair)
            pairlist.push(Tpair)
            const buyres = c2cAPI.getPOrder({ "TradePair": Tpair, "TradeType": 0 })
            PromiseBUYlist.push(buyres)
            const sellres = c2cAPI.getPOrder({ "TradePair": Tpair, "TradeType": 1 })
            PromiseSelllist.push(sellres)
        }

        Promise.all(PromiseSelllist).then((res) => {
            console.log(res);
            var newList = []
            for (let i in res) {
                for (let value of Object.values(res[i].data)) {
                    var data = JSON.parse(value)
                    newList.push(data)
                }
            }

            console.log(newList)
            var final = newList.filter(order => (order.amount - order.doneAmount) > 0);
            console.log("final")
            var other=final.filter(order=>(order.seller!==(user.UID).toString()))

            console.log(other)
            setsellplist(other)
            setsellplistINIT(other)
        })



        Promise.all(PromiseBUYlist).then((res) => {
            console.log(res);
            var newList = []
            for (let i in res) {
                for (let value of Object.values(res[i].data)) {
                    var data = JSON.parse(value)
                    newList.push(data)
                }
            }

            console.log(newList)
            var final = newList.filter(order => (order.amount - order.doneAmount) > 0);
            var other=final.filter(order=>(order.seller!==(user.UID).toString()))
            setbuyplist(other)
            setbuyplistINIT(other)
        })
    
        return setRefresh(0)
    }, [PairInfo,Refresh])



    const handleBuy = (item) => {
        console.log(item)
        dispatch(Pend({
            TID: item.Tid,
            TradePair: item.tradePair,
            Seller: item.seller,
        }))
        //history.push('/BuyOrder')
    }
    const showall = () => {
        setsellplist(sellplistINIT)
        setbuyplist(buyplistINIT)

    }
    const showBTC = () => {
        var temp = []
        for (let i in sellplistINIT) {
            console.log("btc")
            console.log(i)
            if (sellplistINIT[i].tradePair == "BTCUSD") {
                console.log("btc")
                console.log(sellplistINIT[i])
                temp.push(sellplistINIT[i])
                console.log(temp)
            }
        }
       
        console.log(temp)
        setsellplist(temp)

        console.log(sellplist)
        var temp2 = []
        for (let i in buyplistINIT) {

            if (buyplistINIT[i].tradePair == "BTCUSD") {
                temp2.push(buyplistINIT[i])
            }
        }
        setbuyplist(temp2)

    }
    const showUSDC = () =>{
        var temp=[]
        for(let i in sellplist){
            console.log("btc")
            console.log(i)
            if(sellplist[i].tradePair=="USDCUSD"){
                console.log("btc")
                console.log(sellplist[i])
                temp.push(sellplist[i])
            }
        }
        setsellplist(temp)
        var temp2=[]
        for(let i in buyplist){
            console.log("btc")
            console.log(i)
            if(buyplist[i].tradePair=="USDCUSD"){
                console.log("btc")
                
                temp2.push(buyplist[i])
            }
        }
        setbuyplist(temp2)
    }

    const showBCH = () => {
        var temp = []
        for (let i in sellplistINIT) {
            console.log("btc")
            console.log(i)
            if (sellplistINIT[i].tradePair == "BCHUSD") {
                console.log("btc")
                console.log(sellplistINIT[i])
                temp.push(sellplistINIT[i])
            }
        }
        setsellplist(temp)
        var temp2 = []
        for (let i in buyplistINIT) {
            console.log("btc")
            console.log(i)
            if (buyplistINIT[i].tradePair == "BCHUSD") {
                console.log("btc")

                temp2.push(buyplistINIT[i])
            }
        }
        setbuyplist(temp2)
    }

    const showETH = () => {
        var temp = []
        for (let i in sellplistINIT) {
            console.log("btc")
            console.log(i)
            if (sellplistINIT[i].tradePair == "ETHUSD") {
                console.log("btc")
                console.log(sellplistINIT[i])
                temp.push(sellplistINIT[i])
            }
        }
        setsellplist(temp)
        var temp2 = []
        for (let i in buyplistINIT) {
            console.log("btc")
            console.log(i)
            if (buyplistINIT[i].tradePair == "ETHUSD") {
                console.log("btc")

                temp2.push(buyplistINIT[i])
            }
        }
        setbuyplist(temp2)

    }

    
    useEffect(()=>{
        var header=document.getElementById("button");
        var btns=header.getElementsByClassName("btn");
        for(var i=0;i<btns.length;i++){
            btns[i].addEventListener("click", function() {
                var current = document.getElementsByClassName("active");
                current[0].className = current[0].className.replace(" active", "");
                this.className += " active";
                });
        }
    },[])

    const RefreshPage=()=>{
        setRefresh(1)
    }

    return (
        <div >
            <div className={classes.TitleSetting}>C2C Trading</div>
            {active === "Buy" &&
                <div className={classes.mainContainer}>
                    <div style={{ display: 'grid', gridTemplateColumns: '70% 30%' }}>
                        <div id="button" className={ classes.buttonContainer}>
                            <button className={classes.SelectButtonSetting}>BUY</button>
                            <button className={classes.UnselectButtonSetting} onClick={() => setActive("Sell")}>Sell</button>
                            <button class="btn" className={classes.bottonSetting} onClick={showBTC}>BTC</button>
                            <button class="btn" className={classes.bottonSetting} onClick={showBCH}>BCH</button>
                            <button class="btn" className={classes.bottonSetting} onClick={showETH}>ETH</button>
                            <button class="btn" className={classes.bottonSetting} onClick={showUSDC}>USDC</button>
                        </div>
                        <div className={classes.buttonContainer}>
                            <Popup contentStyle={{
                                width: "40%", height: '600px', backgroundColor: '#04011A'
                            }} position="bottom right" trigger={<button className={classes.bottonSetting2} onClick={() => { history.push('/CreateOrder') }}>Create</button>}>
                                {close => (

                                    <CreateOrder Refresh= {setRefresh}/>

                                )}
                            </Popup>
                            <Popup contentStyle={{
                                width: "60%", height: '60%', backgroundColor: '#04011A'
                            }} position="bottom right" trigger={<button className={classes.bottonSetting2}>User Order</button>}>
                                {close => (

                                    <UserOrder />

                                )}
                            </Popup>

                        </div>
                    </div>
                    <hr
                        style={{
                            color: '#707070',
                            height: 3,
                            width: '90%'
                        }} />
                    <div className={classes.searchContainers}>
                        <div className={classes.subTitleContainer}>
                            <div className={classes.subTitleSetting}>Amount</div>
                            <div className={classes.subsearchContainers}>
                                <input type="text" className={classes.inputSetting} placeholder="Enter Amount"></input>
                                <button className={classes.searchbuttonSetting}>Search </button>
                            </div>
                        </div>
                        <div className={classes.subTitleContainer}>
                            <div className={classes.subTitleSetting}>Payment</div>
                            <div >
                                <select className={classes.inputSetting2}>
                                    <option >all payment</option>
                                    <option >Check</option>
                                    <option >Card</option>
                                </select>
                            </div>
                        </div>
                        <div className={classes.subTitleContainer2}>
                            <button className={classes.inputSetting2} onClick={()=>RefreshPage()}>Refresh </button>
                        </div>
                    </div>

                    <div className={classes.infoContainers}>
                        <div className={classes.subTitleSetting2}>Advertisers</div>
                        <div className={classes.subTitleSetting2}>Price</div>
                        <div className={classes.subTitleSetting2}>Limit/Available</div>
                        <div className={classes.subTitleSetting2}>Payment</div>
                        <div className={classes.subTitleSetting2}>Trade</div>
                    </div>

                    {buyplist.map((item, index) => {
                        return (
                            <div className={classes.infoContainers}>
                                <div className={classes.infoTextSetting}>{item.tradePair}</div>
                                <div className={classes.infoTextSetting}>{item.price}</div>
                                <div>
                                    <div className={classes.infoTextSetting}>
                                        Limit:{item.maxAmount}-{item.minAmount}

                                    </div>
                                    <div className={classes.infoTextSetting}>
                                        Available:{item.amount - item.doneAmount}
                                    </div>
                                </div>
                                <div className={classes.infoTextSetting}>Card</div>
                                {/* <div className={classes.infoTextSetting}>{item.Payment}</div> */}
                                <div><Popup contentStyle={{
                                    width: "20%", height: '20%', backgroundColor: '#04011A'
                                }} position="bottom right" trigger={<button className={classes.SelectButtonSetting3} >Buy</button>} onOpen={() => { handleBuy(item) }}>
                                    <BuyOrder sendInfo={item} Refresh= {setRefresh}/>
                                </Popup></div>
                            </div>

                        );
                    })}
                    {/*<li key={index} className={item.cName}>
                            {item.Asset} 
                            <span>  {item.Advertiser}  </span>
                            <span>  {item.Price}</span>
                            <span>  {item.Limit}</span>
                            <span>  {item.Availabke}</span>
                            <span>  {item.Payment}</span>
                            <button>bUY xxx</button>
                        </li>
                        */}

                </div>
            }
            {active === "Sell" &&
                <div className={classes.mainContainer}>
                    <div style={{ display: 'grid', gridTemplateColumns: '70% 30%' }}>
                        <div className={classes.buttonContainer}>
                            <button className={classes.UnselectButtonSetting} onClick={() => setActive("Buy")}>BUY</button>
                            <button className={classes.SelectButtonSetting}>Sell</button>
                           
                            <button className={classes.bottonSetting} onClick={showBTC}>BTC</button>
                            <button className={classes.bottonSetting} onClick={showBCH}>BCH</button>
                            <button className={classes.bottonSetting} onClick={showETH}>ETH</button>
                            <button className={classes.bottonSetting} onClick={showUSDC}>USDC</button>
                        </div>
                        <div className={classes.buttonContainer}>
                            <Popup contentStyle={{
                                width: "40%", height: '600px', backgroundColor: '#04011A'
                            }} position="bottom right" trigger={<button className={classes.bottonSetting2} onClick={() => { history.push('/CreateOrder') }}>Create</button>}>
                                {close => (

                                    <CreateOrder  Refresh= {setRefresh}/>

                                )}
                            </Popup>
                            <Popup contentStyle={{
                                width: "60%", height: '60%', backgroundColor: '#04011A'
                            }} position="bottom right" trigger={<button className={classes.bottonSetting2}>User Order</button>}>
                                {close => (

                                    <UserOrder />

                                )}
                            </Popup>

                        </div>
                    </div>
                    <hr
                        style={{
                            color: '#707070',
                            height: 3,
                            width: '90%'
                        }} />
                    <div className={classes.searchContainers}>
                        <div className={classes.subTitleContainer}>
                            <div className={classes.subTitleSetting}>Amount</div>
                            <div className={classes.subsearchContainers}>
                                <input type="text" className={classes.inputSetting} placeholder="Enter Amount"></input>
                                <button className={classes.searchbuttonSetting}>Search </button>
                            </div>
                        </div>
                        <div className={classes.subTitleContainer}>
                            <div className={classes.subTitleSetting}>Payment</div>
                            <div >
                                <select className={classes.inputSetting2}>
                                    <option >all payment</option>
                                    <option >check</option>
                                    <option >card</option>
                                </select>
                            </div>
                        </div>
                        <div className={classes.subTitleContainer2}>
                            <button className={classes.inputSetting2} onClick={()=>RefreshPage()}>Refresh </button>
                        </div>
                    </div>

                    <div className={classes.infoContainers}>
                        <div className={classes.subTitleSetting2}>Advertisers</div>
                        <div className={classes.subTitleSetting2}>Price</div>
                        <div className={classes.subTitleSetting2}>Limit/Available</div>
                        <div className={classes.subTitleSetting2}>Payment</div>
                        <div className={classes.subTitleSetting2}>Trade</div>
                    </div>
                    {sellplist.map((item, index) => {
                        return (
                            <div className={classes.infoContainers}>
                                <div className={classes.infoTextSetting}>{item.tradePair}</div>
                                <div className={classes.infoTextSetting}>{item.price}</div>
                                <div>
                                    <div className={classes.infoTextSetting}>
                                        max:{item.maxAmount} min:{item.minAmount}

                                    </div>
                                    <div className={classes.infoTextSetting}>
                                        Available: {item.amount - item.doneAmount}
                                    </div>
                                </div>
                                <div className={classes.infoTextSetting}>Card</div>
                                <div>
                                    <Popup contentStyle={{
                                        width: "20%", height: '20%', backgroundColor: '#04011A'
                                    }} position="bottom right" trigger={<button className={classes.SelectButtonSetting2} >Sell</button>} onOpen={() => { handleBuy(item) }}>
                                        <BuyOrder sendInfo={item} Refresh= {setRefresh}/>
                                    </Popup>

                                </div>
                            </div>

                        );
                    })}
                </div>
            }
        </div>
    )
}

export default C2C