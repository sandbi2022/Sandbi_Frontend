import React from 'react'
import { useStyles } from './style'
import { useHistory } from 'react-router-dom'

const Functions = () => {
    const classes = useStyles()
    const history = useHistory()

    const redirectExchange=()=>{
        history.push('/Exchange')
    }
    const redirectC2C=()=>{
        history.push('/C2C')
    }
    return (
        <div className={classes.userControlsContainers}>
            <div className={classes.Button} onClick={redirectExchange}>
                EXCHANGE
            </div>
            <div className={classes.Button}>
                MARKET
            </div>
            <div className={classes.Button} onClick={redirectC2C}>
                C2C
            </div>
            <div className={classes.Button}>
                MARGI
            </div>
            <div className={classes.Button}>
                FUTURES
            </div>
        </div>
    )
}

export default Functions