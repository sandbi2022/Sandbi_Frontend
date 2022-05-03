import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import c2cAPI from '../../api/c2c-api';
import { useDispatch, useSelector } from 'react-redux';


const CreateOrder = params => {
        const user = useSelector((state) => state.user.value)
        const classes = useStyles();
        const history = useHistory();
        const [Coin, setCoin] = useState("")
        const [amount, setAmount] = useState("Buy")
        const [maxAmount, setmaxAmount] = useState(0)
        const [minAmount, setminAmount] = useState(0)
        const [price, setprice] = useState(0)
        const [side,setSide]=useState()
        const TradeType = 1
        const setRefresh=params.Refresh;

        const confirmCreation = () => {
                c2cAPI.createOrder({
                        "TradePair": Coin + "USD",
                        "UID": user.UID,
                        "Amount": amount,
                        "MaxAmount": maxAmount,
                        "MinAmount": minAmount,
                        "Price": price,
                        "TradeType": TradeType
                })
                setRefresh(1)
                history.push('/C2C');
        }

        const updateCoin = (event) => {
                setCoin(event.target.value);
        }

        const updateAmount = (event) => {
                setAmount(event.target.value);
        }
        const updateMAX = (event) => {
                setmaxAmount(event.target.value);
        }

        const updateMin = (event) => {
                setminAmount(event.target.value);
        }
        const updatePrice = (event) => {
                setprice(event.target.value);
        }
        const updateSide = (event) => {
                setSide(event.target.value);
        }

        return (
                <div >
                        <div style={{color:'white',
                                fontSize:'30px',
                                margin:'20px',
                                fontWeight:'bold',
                                textAlign:'center'
                                }}>Create Order</div>
                        <div className={classes.CreateOrderInputContainer}>
                                <div style={{color:'white',fontSize:'20px'}}>Coin</div>
                                
                                        <select className={classes.inputSetting3} onChange={updateCoin}>
                                        <option >BTC</option>
                                        <option >ETH</option>
                                        <option >BCH</option>
                                        <option >USDT</option>
                                        </select>
                                
                        </div>
                        <div className={classes.CreateOrderInputContainer}>
                                <div style={{color:'white',fontSize:'20px'}}>Side</div>
                                
                                        <select className={classes.inputSetting3} onChange={updateSide}>
                                        <option >Buy</option>
                                        <option >Sell</option>
                                        </select>
                                
                        </div>
                        <div  className={classes.CreateOrderInputContainer}>
                                <div style={{color:'white',fontSize:'20px'}}>Amount</div>
                                <div className={classes.inputWrapper}>
                                        <input
                                                placeholder="Amount"
                                                onChange={updateAmount}
                                        />
                                </div>
                        </div>
                        <div  className={classes.CreateOrderInputContainer}>
                                <div style={{color:'white',fontSize:'20px'}}>Max</div>
                                <div className={classes.inputWrapper}>
                                        <input
                                                placeholder="Max"
                                                onChange={updateMAX}
                                        />
                                </div>
                        </div>
                        <div  className={classes.CreateOrderInputContainer}>
                                <div style={{color:'white',fontSize:'20px'}}>Min</div>
                                <div className={classes.inputWrapper}>
                                        <input
                                                placeholder="Min"
                                                onChange={updateMin}
                                        />
                                </div>
                        </div>
                        <div  className={classes.CreateOrderInputContainer}>
                                <div style={{color:'white',fontSize:'20px'}}>Price</div>
                                <div className={classes.inputWrapper}>
                                        <input
                                                placeholder="Price"
                                                onChange={updatePrice}
                                        />
                                </div>
                        </div>
                        <div style={{textAlign:'center'}}>
                        <button type="submit" style={{position:'center',color:'white',backgroundColor:'#4ABCBB',borderRadius: '5px',margin:'5%',fontSize:'20px',width:'30%'}}onClick={confirmCreation}>
                                Create
                        </button>
                        </div>


                </div>
        )
}

export default CreateOrder