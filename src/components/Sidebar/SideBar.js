import { useRef, useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import UserServer from '../../api/user-api';
import axios from 'axios';
import { useStyles } from "./style";
import { render } from '@testing-library/react';
import {useDispatch} from 'react-redux';
import { login } from '../../features/user';
const SideBar =()=>{
    const classes=useStyles()
    const history = useHistory();
    const dispatch = useDispatch();

    const redirectWallet=()=>{
        history.push('/Wallet')
    }
    const redirectSetting=()=>{
        history.push('/Setting')
    }
    const redirectIdVerify=()=>{
        history.push('/IdentityVerification')
    }
    const redirectDashboard=()=>{
        history.push('/Dashboard')
    }
    const redirectLogOut=()=>{
        dispatch(login({email:"",logged:false}))
        history.push('/')
    }
    return(
        <div className={classes.sideBarContainer}>
            <div className={classes.textStyle} onClick={redirectDashboard}>
                Dashboard
            </div>
            <div  className={classes.textStyle} onClick={redirectWallet}>
                Wallet
            </div>
            <div className={classes.textStyle} onClick={redirectSetting}>
                Setting
            </div>
            <div className={classes.textStyle} onClick={redirectIdVerify}>
                Identity Verification
            </div>
            <div className={classes.textStyle} onClick={redirectLogOut}>
                Log out
            </div>


        </div>
    )
}

export default SideBar