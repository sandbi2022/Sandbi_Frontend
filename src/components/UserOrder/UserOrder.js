import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import c2cAPI from '../../api/c2c-api';

import { Pend } from '../../features/trade';
import{useDispatch, useSelector} from 'react-redux';
const UserOrder = () => {

    const classes = useStyles();
    const history = useHistory();
    const [formErrors, setFormErrors] = useState({})
    const user = useSelector((state)=>state.user.value)
    const [active, setActive] = useState("Buy")
    const [renderlist,setrenderlist]=useState([])
    const [Pendlist, setPendlist]= useState([])
    const [Processlist, setProcesslist]= useState([])
    const [TradePairlist, setTradepairlist] = useState(["BTC","ETH","USDC","BCH"])
    const [pendflag,setpendflag]=useState(true)
    const [Prceflag,setprceflag]=useState(false)
    const [change,setChange]=useState(0)
    const dispatch = useDispatch();

    useEffect(() => {
        renderPend()
        return setChange(0)
      }, [change]);



    const renderPend=()=>{
        console.log("Pending")
        var PromisePending = [];
        for (let value of TradePairlist) {
            console.log(value)
            var Tpair = value + "USD"
            console.log(Tpair)
            const order = c2cAPI.getPUOrder({"TradePair":Tpair,"UID":user.UID})
            PromisePending.push(order)   
        }
        Promise.all(PromisePending).then((res) => {
            console.log(res);
            var newList = []
            for (let i in res) {
                for (let value of Object.values(res[i].data)) {
                    var data = JSON.parse(value)
                    newList.push(data)
                }
            }
            console.log(newList)
            var final = newList.filter(order=>((order.tradeState!==3&&order.tradeState!==2)))
            final=final.map(item => {
                if ((item.amount-item.doneAmount)<item.minAmount) {
                    console.log("yes")
                  return {...item, minAmount:0};
                } else {
                  return item;
                }
            })
            console.log(final)
            setPendlist(final)
            setrenderlist(final)
            setpendflag(true)
            setprceflag(false)
        })



    }

const renderProcess=()=>{
    console.log("processing ")
    var PromisePending = [];
    for (let value of TradePairlist) {
        console.log(value)
        var Tpair = value + "USD"
        console.log(Tpair)
        const order = c2cAPI.getUserHistory({"TradePair":Tpair,"UID":user.UID})
        PromisePending.push(order)
        
    }
   
    Promise.all(PromisePending).then((res) => {
        console.log(res);
        var newList = []
        for (let i in res) {
            for (let value of Object.values(res[i].data)) {
                var data = JSON.parse(value)
                newList.push(data)
            }
        }

        console.log(newList)
        var final = newList.filter(order=>((order.tradeState!==3&&order.tradeState!==2)))
        setProcesslist(final)
        setrenderlist(final)
        setpendflag(false)
        setprceflag(true)
    })

       }



    const  handleCancel=(item)=>{
        console.log(item)
        c2cAPI.CancelPendingOrder({"TradePair":item.tradePair,"TID":item.Tid})
        setChange(1)
    }
    const  handleFinish=(item)=>{
        c2cAPI.FinishOrder({"TradePair":item.tradePair,"TID":item.Tid})
    }
    const  handlePay=(item)=>{
        c2cAPI.PayOrder({"TradePair":item.tradePair,"TID":item.Tid})
    }
    const  handleCancelAccepted=(item)=>{
        c2cAPI.CancelAcceptedOrder({"TradePair":item.tradePair,"TID":item.Tid})
    }
    const  getColor=(type)=>{
        if(type==1){return "red"}
        else{
            return "green"
        }
    }
    const Side=(type)=>{
        if(type==1){return "Sell"}
        else{
            return "Buy"
        }
    } 


    return (
        <div >
                <div className={classes.mainContainer}>
                    <div className={classes.buttonContainer}>
                        {/* <button className={classes.SelectButtonSetting}>BUY</button>
                        <button className={classes.UnselectButtonSetting} onClick={() => setActive("Sell")}>Sell</button> */}
                        <button className={classes.bottonSetting} onClick={()=>renderPend()}>Pending Order</button>
                        <button className={classes.bottonSetting} onClick={()=>renderProcess()}>Processing Order</button>
                            {/* <button class="btn" className={classes.bottonSetting} onClick={showBTC}>BTC</button>
                            <button class="btn" className={classes.bottonSetting} onClick={showBCH}>BCH</button>
                            <button class="btn" className={classes.bottonSetting} onClick={showETH}>ETH</button>
                            <button class="btn" className={classes.bottonSetting} onClick={showUSDC}>USDC</button> */}
                    </div>
                    
                    {/* <div>
                        <button className={classes.bottonSetting} onClick={()=>{history.push('/CreateOrder')}}>Create</button>
                    </div> */}
                    <hr
                        style={{
                            color: '#707070',
                            height: 3,
                            width: '90%'
                        }} />
                    <div className={classes.searchContainers}>
                        <div className={classes.subTitleContainer}>
                            <div className={classes.subTitleSetting}>Amout</div>
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
                            <button className={classes.inputSetting2}>Refresh </button>
                        </div>
                    </div>

                    <div className={classes.infoContainers}>
                        <div className={classes.subTitleSetting2}>Advertisers</div>
                        <div className={classes.subTitleSetting2}>Price</div>
                        {/* <div className={classes.subTitleSetting2}>Limit/Available</div> */}
                       {!Prceflag&&<div className={classes.subTitleSetting2}>Limit/Available</div>} 
                       {Prceflag&&<div className={classes.subTitleSetting2}>Amount</div>} 
                       {Prceflag&&<div className={classes.subTitleSetting2}>Total</div>} 
                        <div className={classes.subTitleSetting2}>Side</div>
                        <div className={classes.subTitleSetting2}>Payment</div>
                        <div className={classes.subTitleSetting2}>Trade</div>
                    </div>
                    {renderlist.map((item, index) => {
                        return (
                            <div className={classes.infoContainers}>
                                <div className={classes.infoTextSetting}>{item.tradePair}</div>
                                <div className={classes.infoTextSetting}>{item.price}</div>
                                <div>
                                    {!Prceflag&&<div className={classes.infoTextSetting}>
                                        Limit:{item.maxAmount}
                                    </div>}
                                    {Prceflag&&<div className={classes.infoTextSetting}>
                                        {item.amount}
                                    </div>
                                    }
                                    
                                    {!Prceflag&&<div className={classes.infoTextSetting}>
                                        Available{item.amount-item.doneAmount}
                                    </div>}
                                </div>
                                {Prceflag&&<div className={classes.infoTextSetting}>
                                        {item.amount*item.price}
                                    </div>}
                                <div className={classes.infoTextSetting} style={{color:getColor(item.tradeType)}}>{Side(item.tradeType)}</div>
                                <div className={classes.infoTextSetting}>Card</div>
                                
                          {(item.tradeState===0|item.tradeState===1)&&item.tradeType===1&&<div><button className={classes.SelectButtonSetting2} onClick={()=>{handleCancel(item)}}>Cancel</button></div>}
                          {Prceflag&& item.tradeState===1 &&<div><button className={classes.SelectButtonSetting2} onClick={()=>{handleFinish(item)}}>Finish</button></div>}
                            </div>

                        );
                    })}

                </div>
            
            
        </div>
    )
}

export default UserOrder