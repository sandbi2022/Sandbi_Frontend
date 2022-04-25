import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import c2cAPI from '../../api/c2c-api';
import{useDispatch, useSelector} from 'react-redux';


const CreateOrder = () => {
    const user = useSelector((state)=>state.user.value)
    const classes = useStyles();
    const history = useHistory();
    const [Coin, setCoin] = useState("")
    const [amount, setAmount] = useState("Buy")
    const [maxAmount,setmaxAmount]=useState(0)
    const [minAmount,setminAmount]=useState(0)
    const [price,setprice]=useState(0)
    const TradeType=1

   const confirmCreation=()=>{
            c2cAPI.createOrder({
                "TradePair":Coin+"USD",
                "UID":user.UID,
                "Amount":amount,
                "MaxAmount":maxAmount,
                "MinAmount":minAmount,
                "Price":price,
                "TradeType":TradeType
            })
            history.push('/C2C');
   }

    const updateCoin =(event)=>{
        setCoin(event.target.value);
    }

    const updateAmount=(event)=>{
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

    return (
        <div >
            <div className={classes.textToLeft}>Email</div>
                    <div className={classes.inputWrapper}>
                    <input
                            placeholder="Coin"
                            onChange={updateCoin}
                    />
                    </div>
            <div className={classes.textToLeft}>Amount</div>
                    <div className={classes.inputWrapper}>
                    <input
                            placeholder="Amount"
                            onChange={updateAmount}
                    />
                    </div>
            <div className={classes.textToLeft}>Max</div>
                    <div className={classes.inputWrapper}>
                    <input
                            placeholder="Max"
                            onChange={updateMAX}
                    />
                    </div>
            <div className={classes.textToLeft}>Min</div>
                    <div className={classes.inputWrapper}>
                    <input
                            placeholder="Min"
                            onChange={updateMin}
                    />
                    </div>
            <div className={classes.textToLeft}>Price</div>
                    <div className={classes.inputWrapper}>
                    <input
                            placeholder="Price"
                            onChange={updatePrice}
                    />
                    </div>
            <button type="submit"  onClick={confirmCreation}>
                           Create
            </button>


        </div>
    )
}

export default CreateOrder