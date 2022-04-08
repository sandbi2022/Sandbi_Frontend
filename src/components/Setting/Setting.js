import { useRef, useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import UserServer from '../../api/user-api';
import axios from 'axios';
import { useStyles } from "./style";
import SideBar from '../Sidebar/SideBar';
import { render } from '@testing-library/react';

const Setting =()=>{
    const classes=useStyles()
    const history = useHistory();
    return(
        <div>
            <div>
                <SideBar className={classes.sidebar}/>
            </div>
        <div className={classes.mainContainer}>
            <div className={classes.TitleContainer}>
                Change Password
            </div>
            <div className={classes.inputContainers}>
                <div className={classes.textToLeft}>Original Password</div>
                <div className={classes.inputWrapper}>
                        <input
                            className={classes.input}
                            //ref={userRef}
                            placeholder="Original Password"
                            //onChange={updateEmail}
                        />
                </div>
            </div>
            <div className={classes.inputContainers}>
                <div className={classes.textToLeft}>New Password</div>
                <div className={classes.inputWrapper}>
                        <input
                            className={classes.input}
                            //ref={userRef}
                            placeholder="New Password"
                            //onChange={updateEmail}
                        />
                </div>
            </div>
            <div className={classes.inputContainers}>
                <div className={classes.textToLeft}>Confirm Password</div>
                <div className={classes.inputWrapper}>
                        <input
                            className={classes.input}
                            //ref={userRef}
                            placeholder="Confirm Password"
                            //onChange={updateEmail}
                        />
                </div>
            </div>
            <div>
                <button className={classes.buttonSetting}>&nbsp;&nbsp;Confirm&nbsp;&nbsp;</button>
            </div>
        </div>
        </div>
    )
}

export default Setting