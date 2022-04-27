import React from 'react'
import {useStyles } from './style'
import {useContext, useEffect, useState} from 'react'
import Home from '../../components/Home/index.js'
import bg from "/opt/front/react-app-master/src/images/bg.jpeg"

const HomePage =()=>{
    const classes = useStyles()

    return(
        <div style={{ backgroundImage: `url(${bg})` }}>
        <div className={classes.pageContainer} >
            <div className={classes.loginContainer}>
                <Home/>
            </div>
        </div>
        </div>
    )
}
export default HomePage