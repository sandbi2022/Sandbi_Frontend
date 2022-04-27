import React from 'react'
import {useStyles } from './style'
import {useContext, useEffect, useState} from 'react'
import Future from '../../components/Future/Future'

const FuturePage =()=>{
    const classes = useStyles()
    return(
        <div className={classes.pageContainer}>
            <Future/>
        </div>
    )
}
export default FuturePage