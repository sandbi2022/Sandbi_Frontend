import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import c2cAPI from '../../api/c2c-api';
import {useDispatch} from 'react-redux';
import { Pend } from '../../features/trade';

const C2C = () => {

    const classes = useStyles();
    const history = useHistory();
    const [formErrors, setFormErrors] = useState({})
    const [active, setActive] = useState("Buy")
    const [buyplist,setbuyplist]=useState([])
    const [sellplist,setsellplist]=useState([])
    const [historylist,sethlist]=useState([])
    const dispatch = useDispatch();
    useEffect(() => {
        c2cAPI.getPOrder({"TradePair":"BTCUSD","TradeType":0 }).then((response) => {
          var newList=[]
          for (let value of Object.values(response.data)) {
            var data= JSON.parse(value)
             newList.push(data)
            
          }
           console.log(newList)
           setbuyplist(newList)
        }
        )
      }, []);

    useEffect(() => {
        c2cAPI.getPOrder({"TradePair":"BTCUSD","TradeType":1 }).then((response) => {
          var newList=[]
          for (let value of Object.values(response.data)) {
              var data= JSON.parse(value)
               newList.push(data)
              
            }
             console.log(newList)
             setsellplist(newList)
        }
        )
      }, []);


      useEffect(() => {
        c2cAPI.getHistory({"TradePair":"BTCUSD" }).then((response) => {
          var newList=[]
          for (let value of Object.values(response.data)) {
              var data= JSON.parse(value)
               newList.push(data)
              
            }
             console.log(newList)
             sethlist(newList)
        }
        )
      }, []);

    const handleBuy =(item)=>{
        console.log(item)
        dispatch(Pend({
            TID:item.Tid,
            TradePair:item.tradePair,
            Seller:item.seller,  
        }))
        history.push('/BuyOrder')
    }

    return (
        <div >
            <div className={classes.TitleSetting}>C2C Trading</div>
            {active === "Buy" &&
                <div className={classes.mainContainer}>
                    <div className={classes.buttonContainer}>
                        <button className={classes.SelectButtonSetting}>BUY</button>
                        <button className={classes.UnselectButtonSetting} onClick={() => setActive("Sell")}>Sell</button>
                        <button className={classes.bottonSetting}>BTC</button>
                        <button className={classes.bottonSetting}>BCH</button>
                        <button className={classes.bottonSetting}>ETH</button>
                        <button className={classes.bottonSetting}>USDT</button>
                    </div>
                    <div>
                        <button className={classes.bottonSetting} onClick={()=>{history.push('/CreateOrder')}}>Create</button>
                    </div>
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



                    {/* <div className={classes.infoContainers}>
                        <div className={classes.infoTextSetting}>{info.Advertiser}</div>
                        <div className={classes.infoTextSetting}>{info.Price}</div>
                        <div>
                            <div className={classes.infoTextSetting}>
                                Limit:{info.Limit}

                            </div>
                            <div className={classes.infoTextSetting}>
                                Available{info.Available}
                            </div>
                        </div>
                        <div className={classes.infoTextSetting}>{info.Payment}</div>
                        <div><button className={classes.SelectButtonSetting2}>Buy xxx</button></div>
                    </div> */}






                    {buyplist.map((item, index) => {
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
                                <div><button className={classes.SelectButtonSetting2} onClick={()=>{handleBuy(item)}}>Buy</button></div>
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
                    <div className={classes.buttonContainer}>
                        <button className={classes.UnselectButtonSetting} onClick={() => setActive("Buy")}>BUY</button>
                        <button className={classes.SelectButtonSetting}>Sell</button>
                        <button className={classes.bottonSetting}>BTC</button>
                        <button className={classes.bottonSetting}>BCH</button>
                        <button className={classes.bottonSetting}>ETH</button>
                        <button className={classes.bottonSetting}>USDT</button>
                    </div>
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
                    {sellplist.map((item, index) => {
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
                                <div><button className={classes.SelectButtonSetting2} onClick={()=>{handleBuy(item)}}>Buy</button></div>
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
            <div className={classes.infoContainers}>
                        <div className={classes.subTitleSetting2}>Advertisers</div>
                        <div className={classes.subTitleSetting2}>Price</div>
                        <div className={classes.subTitleSetting2}>Limit/Available</div>
                        <div className={classes.subTitleSetting2}>Payment</div>
                        <div className={classes.subTitleSetting2}>Trade</div>
                    </div>

                    {historylist.map((item, index) => {
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
                            </div>

                        );
                    })}

        </div>
    )
}

export default C2C