import React from 'react'
import {useStyles } from './style'
import {useContext, useEffect, useState} from 'react'
import Margin from '../../components/Margin/Margin'

const MarginPage =()=>{
    const classes = useStyles()
    return(
        <div className={classes.pageContainer}>
            <Margin/>
        </div>
    )
}
export default MarginPage