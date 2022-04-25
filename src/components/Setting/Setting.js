import { useRef, useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import UserServer from '../../api/user-api';
import axios from 'axios';
import { useStyles } from "./style";
import SideBar from '../Sidebar/SideBar';
import{useDispatch, useSelector} from 'react-redux';
import { render } from '@testing-library/react';
import validatePassword from './validatePassword'

const Setting =()=>{
    const classes=useStyles()
    const history = useHistory();
    const user = useSelector((state)=>state.user.value)
    const [OldPassword,setOldPassword]=useState("");
    const [NewPassword,setNewPassword]=useState("");
    const [ConfirmPassword,setConfirmPassword]=useState("");
    const [email,setEmail]= useState();
    const [formErrors, setFormErrors] = useState({})
    
    const updateOldPassword = (event) => {
        setOldPassword(event.target.value)
    }
    const updateNewPassword = (event) => {
        setNewPassword(event.target.value)
    }
    const updateConfirmPassword = (event) => {
        setConfirmPassword(event.target.value)
    }

    const confirmUpdatePassword= async(event)=>{
        const UID= user.UID;
        console.log("email:"+UID);
        event.preventDefault();
        const errorsRegister= await validatePassword({OldPassword,NewPassword, ConfirmPassword })
        setFormErrors(errorsRegister)

        if(Object.keys(errorsRegister).length===0){
            let u={UID,OldPassword,NewPassword};
            console.log('user:'+JSON.stringify(u));

            await UserServer.changePassword(u);
            history.push('/Dashboard');
        }
    }



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
                            name="OldPassword"
                            placeholder="Original Password"
                            onChange={updateOldPassword}
                        />
                </div>
            </div>
            <div className={classes.inputContainers}>
                <div className={classes.textToLeft}>New Password</div>
                <div className={classes.inputWrapper}>
                        <input
                            className={classes.input}
                            //ref={userRef}
                            name="NewPassword"
                            placeholder="New Password"
                            onChange={updateNewPassword}
                        />
                </div>
            </div>
            <div className={classes.inputContainers}>
                <div className={classes.textToLeft}>Confirm Password</div>
                <div className={classes.inputWrapper}>
                        <input
                            className={classes.input}
                            //ref={userRef}
                            name="ConfirmPassword"
                            placeholder="Confirm Password"
                            onChange={updateConfirmPassword}
                        />
                </div>
            </div>
            <div>
                <button className={classes.buttonSetting} onClick={confirmUpdatePassword}>&nbsp;&nbsp;Confirm&nbsp;&nbsp;</button>
            </div>
        </div>
        </div>
    )
}

export default Setting