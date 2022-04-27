import React, { useRef, useState, useEffect, useContext } from 'react';
import { Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import UserServer from '../../api/user-api';
import axios from 'axios';
import { useStyles } from "./style";
import SideBar from '../Sidebar/SideBar';
import { render } from '@testing-library/react';
import QR_CODE from '../../images/QR_code.png';

const Withdraw = () => {
    const classes = useStyles()
    const history = useHistory();
    const [coin, setCoin] = React.useState('Select a Coin')
    const [Address, setAddress] = useState("");
    const [WithdrawalAmount, setWithdrawalAmount] = useState("");

    const updateAddress = (event) => {
        setAddress(event.target.value)
    }
    const updateWithdrawalAmount = (event) => {
        setWithdrawalAmount(event.target.value)
    }
    const redirectTransferIn=()=>{
        history.push('/Transfer In')
    }
    const data = [
        {
            type: 'ERC20',
        },
        {
            type: 'TRC20',
        },
        {
            type: 'BEP20',
        },
        {
            type: 'HECO',
        }
    ]
    return (
        <div>
            <div>
                <SideBar className={classes.sidebar} />
            </div>

            <div className={classes.UserInfoContainer}>
                <div className={classes.TitleContainer}>XXXXXXXXX@gmail.com</div>
                <div className={classes.TitleContainer}>User ID:XXXXXXXX</div>
            </div>
            <div className={classes.SwitchButtonContainer}>

                <div style={{ color: 'white', fontWeight: 'bold', fontSize: '20px', textAlign: 'center', width: '180px', padding: '3px 9px 3px 9px' }} onClick={redirectTransferIn}>Transfer In</div>
                <div style={{
                    color: 'white', fontWeight: 'bold', fontSize: '20px', textAlign: 'center', backgroundColor: '#141126',
                    border: 'solid', borderWidth: "3px 0px 0px 0px",
                    borderColor: "#37C24A", width: '180px', padding: '3px 9px 3px 9px'
                }}> Withdraw</div>
            </div>
            <div className={classes.mainContainer}>
                <div>
                    <div style={{
                        display: 'grid', gridTemplateColumns: '10% auto', width: '50%',
                        marginTop: '30px', marginLeft: '30px'
                    }}>
                        <div style={{ color: 'white', backgroundColor: '#4ABCBB', borderRadius: '20px', fontSize: '15px', fontWeight: 'bold', textAlign: 'center' }}>
                            1
                        </div>
                        <div style={{ color: 'white', fontSize: '17px', textAlign: 'left', marginLeft: '10px' }}>
                            Select Coin
                        </div>
                    </div>

                    <div className={classes.textSetting} >Tokens</div>
                    <div style={{width: '160px', borderWidth: '2px', marginLeft: '10px',textAlign:'left'}}>
                    <select className={classes.inputSetting2}> 
                                
                                    <option >USDT</option>
                                    <option >HT</option>
                                    <option >ETH</option>
                                    <option >HT</option>
                            </select>	
                    </div>
                    <div className={classes.infoContainer}>
                        <div className={classes.textSetting} >24H cumulative withdrawal limit</div>
                        <div className={classes.textSetting2} >100.00000 BTC</div>
                    </div>
                    <div className={classes.infoContainer}>
                        <div className={classes.textSetting} >Left</div>
                        <div className={classes.textSetting2} >100.00000 BTC</div>
                    </div>
                    <div style={{ height: '40px' }}></div>
                    <div className={classes.infoContainer}>
                        <div className={classes.textSetting} >Available</div>
                        <div className={classes.textSetting2} >100.00000 USDT</div>
                    </div>

                    <div className={classes.infoContainer}>
                        <div className={classes.textSetting} >Available amount</div>
                        <div className={classes.textSetting2} >100.00000 USDT</div>
                    </div>
                </div>
                <div>
                    <div style={{
                        display: 'grid', gridTemplateColumns: '10% auto', width: '50%',
                        marginTop: '30px', marginLeft: '30px'
                    }}>
                        <div style={{ color: 'white', backgroundColor: '#4ABCBB', borderRadius: '20px', fontSize: '15px', fontWeight: 'bold', textAlign: 'center' }}>
                            2
                        </div>
                        <div style={{ color: 'white', fontSize: '17px', textAlign: 'left', marginLeft: '10px' }}>
                            Withdrawal Address
                        </div>
                    </div>
                    <div className={classes.textSetting} >Address</div>
                    <div className={classes.inputWrapper}>
                        <input
                            className={classes.input}
                            type="address"
                            name="address"
                            placeholder="Enter withdrawal address here"
                            onChange={updateAddress}
                        />
                    </div>
                    <div className={classes.textSetting} >Select Chain</div>
                    {data.map((item, index) => {
                        return (
                            <div style={{ border: 'solid', borderColor: 'white', width: '160px', borderWidth: '2px', marginLeft: '30px', marginBottom: '10px' }}>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                                <label for="vehicle1" className={classes.textSetting}>{item.type}</label>
                            </div>
                        );
                    })}
                    <div className={classes.textSetting} >Withdrawal Amount</div>
                    <div className={classes.inputWrapper}>
                        <input
                            className={classes.input}
                            type="address"
                            name="address"
                            placeholder="MIN 24.3564035"
                            onChange={updateWithdrawalAmount}
                        />
                    </div>
                    
                    <div className={classes.infoContainer}>
                        <div className={classes.textSetting} >Fee</div>
                        <div className={classes.textSetting2} >0.00400</div>
                    </div>
                    <div className={classes.infoContainer}>
                        <div className={classes.textSetting} >You Recieve</div>
                        <div className={classes.textSetting2} >0 USDT</div>
                    </div>
                    

                    <div>
                        <button style={{color:'white',fontSize:'14px',fontWeight:'bold',
                        backgroundColor:'#154B67',padding:'7px 40px 7px 40px'}}>Checkout</button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default Withdraw