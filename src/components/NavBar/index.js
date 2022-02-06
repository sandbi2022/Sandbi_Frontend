import {useState, useContext, useEffect} from 'react';
import { useStyles } from './style';
import UserLogin from './UserLogin';

const NavBar=()=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const classes = useStyles()
    return (
        <div className={classes.barContainer}>
            <div>
                <UserLogin/>
            </div>
        </div>
    )
}
export default NavBar