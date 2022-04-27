import React from 'react'
import {useStyles } from './style'
import {useContext, useEffect, useState} from 'react'
import Exchange from '../../components/Exchange/Exchange.js'

const ExchangePage =()=>{
    const classes = useStyles()
    return(
        <div className={classes.pageContainer}>
            <Exchange/>
        </div>
    )
}
export default ExchangePage