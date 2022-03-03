import {useState} from 'react';
//import {Link} from 'react-route-dom';
import { useStyles } from './style';

const ResetPassword=()=>{
    const classes = useStyles()
    const [email,setEmail]=useState("");
    const [resetEmailSent,setResetEmailSent]=useState(false)

    const updateEmail=(event)=>{
        setEmail(event.target.value);
    }

    const sendPasswordResetEmail=()=>{
        setResetEmailSent(true)
    }
    const handleChangePassword=()=>{

    }

    return(
        <div>

        </div>
    )
}
export default ResetPassword