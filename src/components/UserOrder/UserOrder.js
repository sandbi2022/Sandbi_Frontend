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
    const dispatch = useDispatch();

    useEffect(() => {
        c2cAPI.getPUOrder({"TradePair":"BTCUSD","UID":user.UID}).then((response) => {
            var newList=[]
            for (let value of Object.values(response.data)) {
                var data= JSON.parse(value)
                 newList.push(data)
                
              }
               console.log(newList)
               setrenderlist(newList)
        }
        )
      }, []);

      useEffect(() => {
        c2cAPI.getUserHistory({"TradePair":"BTCUSD","UID":user.UID}).then((response) => {
            var newList=[]
            for (let value of Object.values(response.data)) {
                var data= JSON.parse(value)
                 newList.push(data)
                
              }
               console.log(newList)
               setrenderlist(newList)
        }
        )
      }, []);

    const  handleCancel=(item)=>{
        c2cAPI.CancelPendingOrder({"TradePair":item.tradePair,"TID":item.Tid})
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



    return (
        <div >
                <div className={classes.mainContainer}>
                    <div className={classes.buttonContainer}>
                        {/* <button className={classes.SelectButtonSetting}>BUY</button>
                        <button className={classes.UnselectButtonSetting} onClick={() => setActive("Sell")}>Sell</button> */}
                        <button className={classes.bottonSetting}>Finished Order</button>
                        <button className={classes.bottonSetting}>Processing Order</button>

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
                        <div className={classes.subTitleSetting2}>Limit/Available</div>
                        <div className={classes.subTitleSetting2}>Payment</div>
                        <div className={classes.subTitleSetting2}>Trade</div>
                    </div>
                    {renderlist.map((item, index) => {
                        return (
                            <div className={classes.infoContainers}>
                                <div className={classes.infoTextSetting}>{item.tradePair}</div>
                                <div className={classes.infoTextSetting}>{item.price}</div>
                                <div>
                                    <div className={classes.infoTextSetting}>
                                        Limit:{item.maxAmount}

                                    </div>
                                    <div className={classes.infoTextSetting}>
                                        Available{item.amount-item.doneAmount}
                                    </div>
                                </div>
                                <div className={classes.infoTextSetting}>{item.Payment}</div>
                                <div><button className={classes.SelectButtonSetting2} onClick={()=>{handleCancel(item)}}>Cancel</button></div>
                                <div><button className={classes.SelectButtonSetting2} onClick={()=>{handleFinish(item)}}>Finish</button></div>
                            </div>

                        );
                    })}

                </div>
            
            
        </div>
    )
}

export default UserOrder