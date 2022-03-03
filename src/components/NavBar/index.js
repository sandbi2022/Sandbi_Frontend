import {useState, useContext, useEffect} from 'react';
import { useStyles } from './style';
import UserLogin from './UserLogin';

const NavBar=()=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);
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
            <div>
                {
                    isLoggedIn?<UserControl setLogin={setIsLoggedIn}/>
                    : <UserLogin setLogin={setIsLoggedIn}/>
                }
            </div>
        </div>
    )
}
export default NavBar