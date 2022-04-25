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
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const IdVerify =()=>{
    const classes=useStyles()
    const history = useHistory();
    const user = useSelector((state)=>state.user.value)
    const [First,setFirstName]=useState("");
    const [Middle,setMiddleName]=useState("none");
    const [Birthday,setBirthday]=useState("");
    const [Last,setLastName]=useState("");
    const [xGender,setGender]=useState("");
    const [SSN,setTaxID]=useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [checkedOne,setCheckedOne]=useState(false);
    const [checkedTwo,setCheckedTwo]=useState(false);
    const [checkedThree,setCheckedThree]=useState(false);


    const updateFirstName = (event) => {
        setFirstName(event.target.value)
    }
    const updateMiddleName = (event) => {
        setMiddleName(event.target.value)
    }
    const updateBirthday = (event) => {
        setBirthday(event.target.value)
    }
    const updateLastName = (event) => {
        setLastName(event.target.value)
    }
    const updateGender = (event) => {
        setGender(event)
    }
    const updateTaxID = (event) => {
        setTaxID(event.target.value)
    }
    const handleDate = (event) => {
        setStartDate(event);

      };
    const handleChangeOne = () => {

        setCheckedOne(true);
        setCheckedTwo(false)
        setCheckedThree(false)
        updateGender("Male")


      };
      const handleChangeTwo = () => {

        setCheckedOne(false)
        setCheckedTwo(true);
        setCheckedThree(false)
        updateGender("Female")
            

      };
      const handleChangeThree = () => {

        setCheckedOne(false)
        setCheckedTwo(false)
        setCheckedThree(true);
        updateGender("Unspecified")


      };
      const handleConfirm=async(event)=>{
        event.preventDefault();
        const UID=user.UID
        const zero="0"
        let year=startDate.getFullYear().toString()

        let month=(startDate.getMonth()+1).toString()
        if(month.length<2){
            month=zero.concat(month)
        }
        let day=startDate.getDate().toString()
        if(day.length<2){
            day=zero.concat(day)
        }
        let Birth=year+month+day

        let Gender=0
        if(xGender=="Male"){
            Gender=0
        }else if(xGender=="Female"){
            Gender=1
        }else{
            Gender=2
        }
        console.log("UID:"+UID+"FirstName:"+First+",MiddleName:"+Middle+",LastName:"+Last+",Birthday:"+Birth+",Gender:"+Gender+",TaxId:"+SSN)
        let data={UID,First,Middle,Last,Birth,Gender,SSN}
        await UserServer.IdentityVerification(data);
        history.push('/Dashboard');
      }



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
                            onChange={updateFirstName}
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
                            onChange={updateMiddleName}
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
                            onChange={updateLastName}
                        />
                </div>
            </div>
            <div>
                <div className={classes.textToLeft}>Date of Birth</div>
                <div className={classes.inputWrapper2}>
                <DatePicker className={classes.input} placeholder="MM/DD/YYYY" selected={startDate} onChange={(date=Date)=>handleDate(date)}/>
                </div>
            </div>
            <div className={classes.textToLeft}>Gender</div>
            <div className={classes.inputContainers}>
                <div>
                {/*<input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"/>*/}
                <input type="checkbox" checked={checkedOne} id="1" name="mycheckbox" value="1" onChange={handleChangeOne}/>
                <label for="1" className={classes.textToGender}> Male</label>
                </div>
                <div>
                <input type="checkbox" checked={checkedTwo} id="2" name="mycheckbox" value="2" onChange={handleChangeTwo}/>
                <label for="2" className={classes.textToGender}>Female</label>
                </div>
                <div>
                <input type="checkbox" checked={checkedThree} id="3" name="mycheckbox" value="3" onChange={handleChangeThree}/>
                <label for="3" className={classes.textToGender}>Unspecified</label>
                </div>
            </div>
            <div>
                <div className={classes.textToLeft}>Tax ID/SSN</div>
                <div className={classes.inputWrapper}>
                        <input
                            className={classes.input}
                            //ref={userRef}
                            placeholder="Your ID or SSN"
                            onChange={updateTaxID}
                        />
                </div>
            </div>
            <div>
                <button className={classes.buttonSetting} onClick={handleConfirm}>&nbsp;&nbsp;Confirm&nbsp;&nbsp;</button>
            </div>
        </div>
        </div>
    )
}

export default IdVerify