import { useStyles } from './style'
import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import AuthContext from '../../../context/AuthProvider';
import LOCAL_CONSTANT from '../../../constant/local-storage';
import profile_image from '../../../images/Default_profile.png';
const UserControl=({setLogin})=>{
    const classes=useStyles()
    const { auth } = useContext(AuthContext)
    const history = useHistory()

    const redirectSetting=()=>{
        history.push('/setting')
    }
    const redirectProfile=()=>{
        history.push(`/profile/${localStorage.getItem('uid')}`)
        localStorage.setItem(LOCAL_CONSTANT.PROFILE_TAG, 0)
    }

    return(
        <div className={classes.userControlsContainers}>
            <div className="dropdown">
                <div className={`dropdown-toggle `} type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" >
                <img className={classes.image_setting} src={profile_image} alt=""/>
                </div>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li><div className={`${classes.dropItem} dropdown-item`} onClick={redirectProfile}>Profile</div></li>
                    <li><div className={`${classes.dropItem} dropdown-item`} onClick={redirectSetting}>Setting</div></li>
                </ul>
            </div>
        </div>
    )
}
export default UserControl