import React from 'react'
import { useStyles } from './style'
import { useHistory } from 'react-router-dom'

const Functions = () => {
    const classes = useStyles()
    const history = useHistory()
    return (
        <div className={classes.userControlsContainers}>
            <div className={classes.Button}>
                EXCHANGE
            </div>
            <div className={classes.Button}>
                MARKET
            </div>
            <div className={classes.Button}>
                C2C
            </div>
            <div className={classes.Button}>
                MARGIN
            </div>
            <div className={classes.Button}>
                FUTURES
            </div>
        </div>
    )
}

export default Functions