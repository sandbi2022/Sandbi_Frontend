import {useState,useEffect} from 'react';
import { useStyles } from './style';
import { useParams } from 'react-router-dom';


const UserProfilePage=()=>{
    const classes=useStyles()
    const {userId}=useParams()
    const [self, setSelf] = useState(false)
    const [tag, setTag] = useState(0)

    useEffect(()=>{
        if(localStorage.getItem('uid') === userId){
            setSelf(true)
        }
    }, [userId])

    return(
        <div>

        </div>
    )
}

export default UserProfilePage