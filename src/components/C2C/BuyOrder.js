import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import c2cAPI from '../../api/c2c-api';
import{useDispatch, useSelector} from 'react-redux';


const BuyOrder = () => {
    const trade = useSelector((state)=>state.trade.value)
    const user = useSelector((state)=>state.user.value)
    const classes = useStyles();
    const history = useHistory();
    const [amount, setAmount] = useState("Buy")
    const TradeType=0

   const confirmCreation=()=>{
         console.log(trade.TID)
            c2cAPI.AcceptOrder({
                "TradePair":trade.TradePair,
                "UID":user.UID,
                "TID":trade.TID,
                "Amount":amount
            })
            history.push('/C2C');
   }


    const updateAmount=(event)=>{
        setAmount(event.target.value);
    }
    return (
        <div >
            
            <div className={classes.textToLeft}>Amount</div>
                    <div className={classes.inputWrapper}>
                    <input
                            placeholder="Amount"
                            onChange={updateAmount}
                    />
                    </div>
           
            
            <button type="submit"  onClick={confirmCreation}>
                           Confirm Purchase
            </button>


        </div>
    )
}

export default BuyOrder