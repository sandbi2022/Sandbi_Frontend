import {useState, useContext, useEffect} from 'react';
import { useStyles } from './style';
import Logo from './Logo'
import UserLogin from './UserLogin';
import Functions from './Functions';
import UserControl from './UserControl';
import AuthContext from '../../context/AuthProvider';
const NavBar=()=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {auth}=useContext(AuthContext)

    useEffect(()=>{
        if(auth.loggedIn){
            setIsLoggedIn(true)
        }else{
            setIsLoggedIn(false)
        }
    },[auth])
    const classes = useStyles()
    return (
        <div className={classes.barContainer}>
            <div className={classes.icon}>
                <Logo/>
            </div>
            <div className={classes.selection}>
                <Functions/>
            </div>
            <div className={classes.buttons}>
                {
                    isLoggedIn?<UserControl setLogin={setIsLoggedIn}/>
                    : <UserLogin setLogin={setIsLoggedIn}/>
                }
            </div>
        </div>
    )
}
export default NavBar