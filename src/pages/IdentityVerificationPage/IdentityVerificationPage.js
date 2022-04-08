import React from 'react'
import {useStyles } from './style'
import {useContext, useEffect, useState} from 'react'
import IdVerify from '../../components/IdentityVerification/IdentityVerification'

const IdentityVerificationPage =()=>{
    const classes = useStyles()
    return(
        <div className={classes.pageContainer}>
            <IdVerify/>
        </div>
    )
}
export default IdentityVerificationPage