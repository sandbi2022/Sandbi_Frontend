import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import { useDispatch, useSelector } from 'react-redux';


const Manage = () => {

    const classes = useStyles();

    return (
        <div>
            <div>
                <div style={{color:'white'}}>
                    Transfer from:
                </div>
                <select className={classes.inputSetting2}>

                    <option >Exhange</option>
                    <option >C2C</option>
                    <option >Margin</option>
                </select>

                <div style={{color:'white'}}>
                    Transfer to:
                </div>
                <select className={classes.inputSetting2}>

                <option >Exhange</option>
                    <option >C2C</option>
                    <option >Margin</option>
                </select>

                <div style={{color:'white'}}>
                    choose Asset:
                </div>
                <select className={classes.inputSetting2}>

                    <option >USDT</option>
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

                    />
                </div>

                <div style={{
                    marginTop:'10%',textAlign:'center'
                }}>
                    
                    <button style={{backgroundColor:'#4ABCBB',
                    color:'white',width:'70%'}}>Confirm</button>
                </div>
            </div>


        </div>
    )

}

export default Manage