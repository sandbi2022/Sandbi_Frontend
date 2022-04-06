import React from 'react'
import {useStyles } from './style'
import {useContext, useEffect, useState} from 'react'
import Home from '../../components/Home/index.js'

const HomePage =()=>{
    const classes = useStyles()

    return(
        <div className={classes.pageContainer}>
            <div className={classes.loginContainer}>
                <Home/>
            </div>
        </div>
    )
}
export default HomePage