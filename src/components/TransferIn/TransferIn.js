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
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
const TransferIn = () => {
    const classes = useStyles()
    const user = useSelector((state) => state.user.value);
    const history = useHistory();
    const [coin, setCoin] = React.useState('Select a Coin')
    const [address,setAddress]=useState()



    useEffect(() => {
        UserServer.getAddress({ "UID": user.UID }).then((response) => {
            console.log(response.data)
            setAddress(response.data["Address"])
        })
    }, [])
    const handleCoinChange = (event) => {
        setCoin(event.target.value);
    };
    const redirectWithdraw = () => {
        history.push('/Withdraw')
    }
    const data = [
        {
            type: 'test net',
        },

    ]
    return (
        <div>
            <div>
                <SideBar className={classes.sidebar} />
            </div>

            <div className={classes.UserInfoContainer}>
                <div className={classes.TitleContainer}>{user.email}</div>
                <div className={classes.TitleContainer}>User Name:{user.username}</div>
            </div>
            <div className={classes.SwitchButtonContainer}>
                <div style={{
                    color: 'white', fontWeight: 'bold', fontSize: '20px', textAlign: 'center', backgroundColor: '#141126',
                    border: 'solid', borderWidth: "3px 0px 0px 0px",
                    borderColor: "#37C24A", width: '180px', padding: '3px 9px 3px 9px'
                }}>Transfer In</div>
                <div style={{ color: 'white', fontWeight: 'bold', fontSize: '20px', textAlign: 'center', width: '180px', padding: '3px 9px 3px 9px' }} onClick={redirectWithdraw}> Withdraw</div>
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
                    <div style={{ width: '160px', borderWidth: '2px', marginLeft: '10px', textAlign: 'left' }}>
                        <select className={classes.inputSetting2}>


                            <option >BTC</option>

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
                    <Popup
                        contentStyle={{ width: '40%', height: '300px', backgroundColor: '#04011A', }}
                        trigger={<button className={classes.PopUpButton}>Transfer History</button>} position="top">
                        {close => (
                            <div>

                                <div className={classes.PopUpContainer}>
                                    <div className={classes.PopUpTitle}>Hash</div>
                                    <div className={classes.PopUpTitle}>Amount</div>
                                </div>
                                <div className={classes.PopUpContainer}>
                                    <div className={classes.PopUptext}>sample  hash</div>
                                    <div className={classes.PopUptext}>sample amount</div>
                                </div>
                            </div>
                        )}

                    </Popup>



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
                    <div className={classes.textSetting} >Select Chain</div>
                    {data.map((item, index) => {
                        return (
                            <div style={{ border: 'solid', borderColor: 'white', width: '160px', borderWidth: '2px', marginLeft: '30px', marginBottom: '10px' }}>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                                <label for="vehicle1" className={classes.textSetting}>{item.type}</label>
                            </div>
                        );
                    })}
                    <div className={classes.textSetting} >Address:</div>
                    <div className={classes.textSetting} >{address}</div>

                </div>


            </div>
        </div>
    )
}

export default TransferIn