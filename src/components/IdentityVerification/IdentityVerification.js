import { useRef, useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import UserServer from '../../api/user-api';
import axios from 'axios';
import { useStyles } from "./style";
import SideBar from '../Sidebar/SideBar';
import { render } from '@testing-library/react';

const IdVerify =()=>{
    const classes=useStyles()
    const history = useHistory();
    return(
        <div>
            <div>
                <SideBar className={classes.sidebar}/>
            </div>
        <div className={classes.mainContainer}>
            <div className={classes.TitleContainer}>
                Verify your Identity
            </div>
            <div>
                <div className={classes.textToLeft}>First Name</div>
                <div className={classes.inputWrapper}>
                        <input
                            className={classes.input}
                            //ref={userRef}
                            placeholder="Your First Name"
                            //onChange={updateEmail}
                        />
                </div>
            </div>
            <div>
                <div className={classes.textToLeft}>Middle Name(optional)</div>
                <div className={classes.inputWrapper}>
                        <input
                            className={classes.input}
                            //ref={userRef}
                            placeholder="Your Middle Name"
                            //onChange={updateEmail}
                        />
                </div>
            </div>
            <div>
                <div className={classes.textToLeft}>Last Name</div>
                <div className={classes.inputWrapper}>
                        <input
                            className={classes.input}
                            //ref={userRef}
                            placeholder="Your Last Name"
                            //onChange={updateEmail}
                        />
                </div>
            </div>
            <div>
                <div className={classes.textToLeft}>Date of Birth</div>
                <div className={classes.inputWrapper}>
                        <input
                            className={classes.input}
                            //ref={userRef}
                            placeholder="MM/DD/YYYY"
                            //onChange={updateEmail}
                        />
                </div>
            </div>
            <div className={classes.textToLeft}>Gender</div>
            <div className={classes.inputContainers}>
                <div>
                {/*<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>*/}
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                <label for="vehicle1" className={classes.textToGender}> Male</label>
                </div>
                <div>
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                <label for="vehicle1" className={classes.textToGender}>Female</label>
                </div>
                <div>
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>
                <label for="vehicle1" className={classes.textToGender}>Unspecified</label>
                </div>
            </div>
            <div>
                <div className={classes.textToLeft}>Tax ID/SSN</div>
                <div className={classes.inputWrapper}>
                        <input
                            className={classes.input}
                            //ref={userRef}
                            placeholder="Your ID or SSN"
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

export default IdVerify