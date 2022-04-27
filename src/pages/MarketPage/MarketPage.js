import React from 'react'
import {useStyles } from './style'
import {useContext, useEffect, useState} from 'react'
import Market from '../../components/Market/Market'

const MarketPage =()=>{
    const classes = useStyles()

    return(
        <div className={classes.pageContainer}>
            <div className={classes.loginContainer}>
                <Market/>
            </div>
        </div>
    )
}
export default MarketPage