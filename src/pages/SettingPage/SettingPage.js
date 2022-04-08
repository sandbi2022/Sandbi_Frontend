import React from 'react'
import {useStyles } from './style'
import {useContext, useEffect, useState} from 'react'
import Setting from '../../components/Setting/Setting'

const SettingPage =()=>{
    const classes = useStyles()
    return(
        <div className={classes.pageContainer}>
            <Setting/>
        </div>
    )
}
export default SettingPage