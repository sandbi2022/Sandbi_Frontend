import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import c2cAPI from '../../api/c2c-api';
import { useDispatch, useSelector } from 'react-redux';
// import C2Cinfo from  "../C2C/C2C";


export default function BuyOrder({ sendInfo,Refresh }) {
    const trade = useSelector((state) => state.trade.value)
    const user = useSelector((state) => state.user.value)
    const classes = useStyles();
    const history = useHistory();
    const [amount, setAmount] = useState("Buy")
    const TradeType = 0
    const setRefresh=Refresh;

    useEffect(() => {
        console.log(sendInfo)
    }, [])


    const confirmCreation = () => {
        console.log("min max"+sendInfo.maxAmoun)
        console.log(trade.TID)
        var available = sendInfo.amount - sendInfo.doneAmount
        if (amount <= sendInfo.maxAmount && amount >= sendInfo.minAmount) {
            if (available >= amount) {
                c2cAPI.AcceptOrder({
                    "TradePair": trade.TradePair,
                    "UID": user.UID,
                    "TID": trade.TID,
                    "Amount": amount
                })
                history.push('/C2C');
            }
            else {
                alert("Sorry, there is no enough amount of order to be sold")
            }

        } else {
            alert("sorry, Seller set the amount range in " + sendInfo.minAmount + " - " + sendInfo.maxAmount)
        }
        setRefresh(1)
    }



    const updateAmount = (event) => {
        // console.log("update")
        // console.log(sendInfo.maxAmount)

        //if(event.target.value<sendInfo.maxAmount&&event.target.value>sendInfo.minAmount){
        console.log("ok")

        setAmount(event.target.value);
        // }else{
        //     alert("sorry, Seller set the amount range in "+sendInfo.maxAmount+" - "+sendInfo.minAmount)
        // }

    }
    return (
        <div >

            <div style={{ color: 'white', fontSize: '50', fontWeight: 'bold', textAlign: 'center', margin: '2%' }}>Amount</div>
            <div style={{ textAlign: 'center', width: '100%' }}>
                <input type="number"
                    style={{ width: '80%' }}
                    placeholder="Amount"
                    onChange={updateAmount}
                    min={sendInfo.minAmount}
                    max={sendInfo.maxAmount}
                />
            </div>

            <div style={{ textAlign: 'center' }}>
                <div>
                    <button type="submit" onClick={confirmCreation} style={{
                        color: 'white', backgroundColor: '#4566bf', textAlign: 'center',
                        marginTop: '5%', width: '60%'
                    }}>
                        Confirm Purchase
                    </button>
                </div>
            </div>


        </div>
    )
}

//export default BuyOrder