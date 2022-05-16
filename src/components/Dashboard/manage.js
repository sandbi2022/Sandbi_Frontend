import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import { useDispatch, useSelector } from 'react-redux';
import UserServer from '../../api/user-api';


const Manage = () => {
    const [ManageFrom,setManageFrom]=useState(0)
    const [ManageTo,setManageTo]=useState(0)
    const [currency,setCurrency]=useState("USDC")
    const [amount,setAmount]=useState()
    const history = useHistory();
    const classes = useStyles();
    const user = useSelector((state) => state.user.value);

    const setFrom = (event) => {
        if(event.target.value=="Exchange"){
            setManageFrom(0)
        }else if(event.target.value=="C2C"){
            setManageFrom(1)
        }else if(event.target.value=="Margin"){
            setManageFrom(2)
        }
    }
    const setTo = (event) => {
        if(event.target.value=="Exchange"){
            setManageTo(0)
        }else if(event.target.value=="C2C"){
            setManageTo(1)
        }else if(event.target.value=="Margin"){
            setManageTo(2)
        }
    }
    const setCoin = (event) => {
        setCurrency(event.target.value)
    }
    const setInput = (event) => {
        setAmount(event.target.value)
    }
    const handleSubmit=()=>{
        console.log(ManageFrom+","+ManageTo+","+currency+","+amount)
        UserServer.setManage({"UID":user.UID, "ManageFrom":ManageFrom,"ManageTo":ManageTo,"Currency":currency,"Amount":amount}).then((response) => {
            console.log(response.data)
        })
        window.location.reload();
        
    }


    return (
        <div>
            <div>
                <div style={{color:'white'}}>
                    Transfer from:
                </div>
                <select className={classes.inputSetting2} onChange={setFrom}>

                    <option >Exchange</option>
                    <option >C2C</option>
                    <option >Margin</option>
                </select>

                <div style={{color:'white'}}>
                    Transfer to:
                </div>
                <select className={classes.inputSetting2} onChange={setTo}>

                <option >Exchange</option>
                    <option >C2C</option>
                    <option >Margin</option>
                </select>

                <div style={{color:'white'}}>
                    choose Asset:
                </div>
                <select className={classes.inputSetting2}  onChange={setCoin}>

                    <option >USDC</option>
                    <option >BTC</option>
                    <option >ETH</option>
                    <option >BCH</option>
                </select>
                <div style={{color:'white'}}>
                    Amount
                </div>
                <div>
                    <input
                    type="text" className={classes.inputSetting}
                    onChange={setInput}
                    />
                </div>

                <div style={{
                    marginTop:'10%',textAlign:'center'
                }}>
                    
                    <button style={{backgroundColor:'#4ABCBB',
                    color:'white',width:'70%'}}
                    onClick={handleSubmit}>Confirm</button>
                </div>
            </div>


        </div>
    )

}

export default Manage