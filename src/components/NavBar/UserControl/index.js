import { useStyles } from './style'
import {Dropdown} from 'react-bootstrap'
import React from 'react';
//import Dropdown from 'react-dropdown';
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../../context/AuthProvider';
import LOCAL_CONSTANT from '../../../constant/local-storage';
import user from '../../../images/user.png';
import {useDispatch} from 'react-redux';
import { login } from '../../../features/user';

const UserControl=()=>{
    const classes=useStyles()
    const { auth } = useContext(AuthContext)
    const history = useHistory()
    const dispatch = useDispatch();
    const redirectSetting=()=>{
        history.push('/setting')
    }
    const redirectProfile=()=>{
        history.push('/Wallet')
    }
    const redirectLogin=()=>{
        dispatch(login({email:"",logged:false}))
        history.push('/')
    }
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        <a
          href=""
          ref={ref}
          onClick={(e) => {
            e.preventDefault();
            onClick(e);
          }}
        >
          {children}
          &#x25bc;
        </a>
      ));

    return(
        <div className={classes.userControlsContainers}>
            {/*<div className="dropdown">
                <div className={`dropdown-toggle `} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" >
                <img className={classes.image_setting} src={profile_image} alt=""/>
                </div>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><div className={`${classes.dropItem} dropdown-item`} onClick={redirectProfile}>Wallet</div></li>
                    <li><div className={`${classes.dropItem} dropdown-item`} onClick={redirectSetting}>Setting</div></li>
                    <li><div className={`${classes.dropItem} dropdown-item`} onClick={redirectLogin}>log out</div></li>
    </ul>
    </div>*/}
            <img className={classes.image_setting} src={user} alt="" onClick={redirectProfile}/>
        </div>
    )
}
export default UserControl