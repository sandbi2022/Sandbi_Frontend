import React from 'react'
import {useStyles } from './style'
import {useContext, useEffect, useState} from 'react'
import Home from '../../components/Home/index.js'

const HomePage =()=>{
    const classes = useStyles()

    return(
        <div>
            <Home/>
        </div>
    )
}
export default HomePage