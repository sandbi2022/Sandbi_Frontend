import React from 'react'
import {useStyles } from './style'
import {useContext, useEffect, useState} from 'react'
import MyAlgoWallet from '../../components/AlgoWallet/MyAlgoWallet/MyAlgoWallet'

const AlgoWalletPage =()=>{
    const classes = useStyles()
    return(
        <div className={classes.pageContainer}>
            <MyAlgoWallet/>
        </div>
    )
}
export default AlgoWalletPage