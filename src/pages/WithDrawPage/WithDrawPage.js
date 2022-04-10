import React from 'react'
import {useStyles } from './style'
import {useContext, useEffect, useState} from 'react'
import Withdraw from '../../components/Withdraw/Withdraw'

const WithdrawPage =()=>{
    const classes = useStyles()
    return(
        <div className={classes.pageContainer}>
            <Withdraw/>
        </div>
    )
}
export default WithdrawPage