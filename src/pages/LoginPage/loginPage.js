import React from 'react'
import { useStyles } from './style'
import Login from '../../components/Login/index.js'

const LoginPage = () => {
    const classes = useStyles()

    return (
        <div className={classes.pageContainer}>
            <div className={classes.loginContainer}>
                <Login />
            </div>
        </div>
    )
}

export default LoginPage