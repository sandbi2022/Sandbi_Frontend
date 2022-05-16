import { useState, useEffect, useContext } from 'react';
import { useStyles } from './style';
import UserServer from '../../api/user-api';
import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import validateRegistration from './validateRegistration';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Register = () => {

    const classes = useStyles();
    const history = useHistory();
    const [Email, setEmail] = useState("");
    const [VCode, setVCode] = useState("");
    const [Code, setCode] = useState("");
    const [Password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [UserName, setName] = useState("");
    const [ButtonInfo, setButtonInfo] = useState("verify your email");
    const [formErrors, setFormErrors] = useState({})
    const [disable, setDisable] = useState(false);
    const updateEmail = (event) => {
        setEmail(event.target.value);
    }

    const updatePassword = (event) => {
        setPassword(event.target.value);
    }
    const updateConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    }

    const updateName = (event) => {
        setName(event.target.value);
    }
    const updateCode = (event) => {
        setCode(event.target.value);
    }
    const updateVCode = (event) => {
        setVCode(event.target.value);
    }
    const jumpToRegister=()=>{
        history.push("/Login")
    }
    const confirmRegister = async (event) => {

        event.preventDefault();
        console.log("Code="+Code)
        if (VCode == Code) {
            const errorsRegister = await validateRegistration({ UserName, Email, Password, confirmPassword })
            setFormErrors(errorsRegister)

            if (Object.keys(errorsRegister).length === 0) {
                let user = { UserName, Email, Password };
                console.log('user:' + JSON.stringify(user));

                await UserServer.createUser(user);
                history.push('/');
            }
        }else{
            console.log("fail")
            console.log("Code="+Code)
            alert("Wrong code.");
        }
    }
    const confirmEmail = async (event) => {
        
        var Code = Math.floor(Math.random() * 900000) + 100000;
        setVCode(Code);
        setButtonInfo("Already Send");
        let user = { Email, Code };
        console.log(Email + "," + Code);
        console.log('user:' + JSON.stringify(user));
        await UserServer.sendMail(user);
    }
    return (
        <div className={classes.loginForm}>
            <div className={classes.titleWrapper}>
                <h3 className={classes.title}>Register Here</h3>
            </div>
            <div className={classes.loginWrapper}>
                <div className={classes.formGroup}>
                    <div className={classes.textToLeft}>Email</div>
                    <div className={classes.inputWrapper}>
                        <input
                            className={formErrors?.EmailError ? classes.inputError : classes.input}
                            type="email"
                            name="email"
                            placeholder="Email"
                            onChange={updateEmail}
                        />
                        {formErrors?.EmailError && (
                            <p className={classes.errorMsg}>{formErrors.EmailError}</p>
                        )}
                    </div>


                    <div className={classes.textToLeft}>Display Name</div>
                    <div className={classes.inputWrapper}>
                        <input
                            className={formErrors?.UsernameError ? classes.inputError : classes.input}
                            type="name"
                            name="name"
                            placeholder="Display Name"
                            onChange={updateName}
                        />
                        {formErrors?.UsernameError && (
                            <p className={classes.errorMsg}>{formErrors.UsernameError}</p>
                        )}
                    </div>
                    <div className={classes.textToLeft}>Password</div>
                    <div className={classes.inputWrapper}>
                        <input
                            className={formErrors?.PasswordError ? classes.inputError : classes.input}
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={updatePassword}
                        />
                        {formErrors?.PasswordError && (
                            <p className={classes.errorMsg}>{formErrors.PasswordError}</p>
                        )}
                    </div>

                    <div className={classes.textToLeft}>Confirm Password</div>
                    <div className={classes.inputWrapper}>
                        <input
                            className={formErrors?.ConfirmPasswordError ? classes.inputError : classes.input}
                            type="password"
                            name="password"
                            placeholder="Enter Password Again"
                            onChange={updateConfirmPassword}
                        />
                        {formErrors?.ConfirmPasswordError && (
                            <p className={classes.errorMsg}>{formErrors.ConfirmPasswordError}</p>
                        )}
                    </div>
                    <div className={classes.buttonContainer}>
                    <Popup contentStyle={{ width: "40%", }} trigger={<button className={classes.button}>Continue</button>} position="center">
                        {close => (
                            <div style={{ width: "90%",height:'50%', textAlign: 'center', padding: '5%' }}>
                                <div style={{ fontSize: '30px', fontWeight: 'bold',color:'#154B67'}}>verify your email</div>
                                
                                <div style={{display:'grid',gridTemplateColumns:'80% 20%',marginBottom:'4%'}}>
                                <input
                                    className={classes.input}
                                    type="code"
                                    name="code"
                                    placeholder="Verification Code"
                                    onChange={updateCode}
                                />
                                <button disabled={disable} style={{ backgroundColor:'#154B67', color:'white', 
                                    fontSize:'10px',borderRadius:'10px'}} onClick={()=>{confirmEmail();setDisable(true);}} > {ButtonInfo}</button>
                                </div>
                                <div className={classes.buttonContainer}>
                                <button type="submit" className={classes.button} onClick={confirmRegister}>
                                    Continue
                                </button>
                                </div>
                            </div>
                        )}
                    </Popup>
                    </div>
                    <div className={classes.signupText} onClick={jumpToRegister}>
                        have an account already?
                    </div>

                </div>
            </div>
            <div className={classes.divider}></div>

        </div>
    )
}
export default Register