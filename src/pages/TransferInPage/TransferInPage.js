import React from 'react'
import {useStyles } from './style'
import {useContext, useEffect, useState} from 'react'
import TransferIn from '../../components/TransferIn/TransferIn'

const TransferInPage =()=>{
    const classes = useStyles()
    return(
        <div className={classes.pageContainer}>
            <TransferIn/>
        </div>
    )
}
export default TransferInPage