import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import UserServer from '../../api/user-api';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { login } from '../../features/user';
const Login =()=>{
    const {setAuth}=useContext(AuthContext);

    const userRef=useRef();
    const errRef=useRef();

    const classes = useStyles()
    const [Email, setEmail] = useState("");
    const [username, setusername] = useState("");
    const [UID, setUID] = useState("");
    const [Password, setPassword] = useState("");
    const [errMsg,setErrMsg]=useState("");
    const [success,setSuccess]=useState(false);
    const history = useHistory()
    useEffect(()=>{
        userRef.current.focus();
    },[])

    useEffect(()=>{
        setErrMsg('');
    },[Email,Password])

    const updateEmail = (event) => {
        setEmail(event.target.value)
    }
    const updatePassword=(event)=>{
        setPassword(event.target.value)
    }
    const jumpToRegister=()=>{
        history.push("/Register")
    }

    const confirmLogin=async(event)=>{
        event.preventDefault();
        console.log(Email+","+Password);
        try{
            const response =await UserServer.getUser({Email,Password});
            console.log(response);
            const data = response.data;
            
            console.log(data)
            setusername(data["UserName"])
            setUID(data["UID"])
            
            console.log(data["UID"])
           
            setSuccess(true);
            
        }catch(err){
            console.log(err);
            if(!err.response){
                setErrMsg("no server response");
            }else if(err.response.status===400){
                alert('incorrect')
                setErrMsg('Missing Username or Password');
            }else if(err.response.status===401){
                setErrMsg('Unauthorized');
            }else{
                setErrMsg('login failed');
            }
            errRef.current.focus();
        }
        // setEmail("");
        // setPassword("");
        history.push("/");
        
    }
    useEffect(()=>{
        console.log(success);
        dispatch(login({
             email:Email,
             logged:success,
             username:username,
             UID:UID,
         }))
     },[UID,username,success])


    const dispatch = useDispatch();
    return(
        <div className={classes.loginForm}>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
            <div className={classes.titleWrapper}>
                <h3 className={classes.title}>Sign In</h3>
            </div>
            <div className={classes.loginWrapper}>
                <div className={classes.formGroup}>
                    <div className={classes.textToLeft}>Email</div>
                    <div className={classes.inputWrapper}>
                        <input
                            className={classes.input}
                            type="email"
                            name="email"
                            ref={userRef}
                            placeholder="Email"
                            onChange={updateEmail}
                        />
                       
                        

                    </div>
                    <div className={classes.textToLeft}>Password</div>
                    <div className={classes.inputWrapper}>
                        <input
                            className={classes.input}
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={updatePassword}
                        />
                    <div className={classes.buttonContainer}>
                        <button type="submit" className={classes.button} onClick={confirmLogin}>
                            Login
                        </button>
                    </div>
                    <div className={classes.signupText} onClick={jumpToRegister}>
                        don't have account yet?
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login