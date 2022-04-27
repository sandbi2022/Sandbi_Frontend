import React from 'react'
import {useStyles } from './style'
import {useContext, useEffect, useState} from 'react'
import C2C from '../../components/C2C/C2C.js'

const C2CPage =()=>{
    const classes = useStyles()
    return(
        <div className={classes.pageContainer}>
            <C2C/>
        </div>
    )
}
export default C2CPage