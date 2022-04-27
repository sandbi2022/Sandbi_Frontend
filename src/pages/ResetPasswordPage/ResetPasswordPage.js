import React from 'react'
import { useStyles } from './style'
import ResetPassword from '../../components/ResetPassword'

const ResetPasswordPage = () => {
    const classes = useStyles()

    return (
        <div className={classes.pageContainer}>
            <div className={classes.loginContainer}>
                <ResetPassword />
            </div>
        </div>
    )
}

export default ResetPasswordPage