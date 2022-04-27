import React from 'react'
import { useStyles } from './style'
import { useHistory } from 'react-router-dom'
import logo from "/opt/front/react-app-master/src/images/logo.png"
const Logo = () => {
    const classes = useStyles()
    const history = useHistory()
    const redirectHome = ()=>{
        history.push('/')
    }
    return (
        <img className={classes.changeCursor}  onClick={redirectHome} src={logo} alt=""/>
    )
}

export default Logo
