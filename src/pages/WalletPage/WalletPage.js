import React from 'react'
import {useStyles } from './style'
import {useContext, useEffect, useState} from 'react'
import Wallet from '../../components/Wallet/Wallet.js'

const WalletPage =()=>{
    const classes = useStyles()
    return(
        <div className={classes.pageContainer}>
            <Wallet/>
        </div>
    )
}
export default WalletPage