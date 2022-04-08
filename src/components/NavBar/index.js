import {useState, useContext, useEffect} from 'react';
import { useStyles } from './style';
import Logo from './Logo'
import UserLogin from './UserLogin';
import Functions from './Functions';
import UserControl from './UserControl';
import AuthContext from '../../context/AuthProvider';
import{useSelector} from 'react-redux';
const NavBar=()=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const {auth}=useContext(AuthContext)

   
    const classes = useStyles()
    const user = useSelector((state)=>state.user.value)
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
                    user.logged?<UserControl setLogin={setIsLoggedIn}/>
                    : <UserLogin setLogin={setIsLoggedIn}/>
                }
            </div>
        </div>
    )
}
export default NavBar