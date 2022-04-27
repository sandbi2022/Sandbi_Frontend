import React from 'react'
import {useStyles } from './style'
import {useContext, useEffect, useState} from 'react'
import Dashboard from '../../components/Dashboard/Dashboard'

const DashboardPage =()=>{
    const classes = useStyles()
    return(
        <div className={classes.pageContainer}>
            <Dashboard/>
        </div>
    )
}
export default DashboardPage