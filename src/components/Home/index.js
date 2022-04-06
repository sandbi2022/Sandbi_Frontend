import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
//import coinBar from './coinBar/index'

const Home=()=>{
    const classes = useStyles()
    return(
        <div>
            <div className={classes.TitleForm}>
            <div className={classes.titleWrapper}>
                <h3 className={classes.title}>Welcome to Sandbi</h3>
            </div>
            </div>
            <div className={classes.coinContainers}>
                <CoinBar CoinName={'XXX'} CoinPrice={222} CoinChange={111}/>
                <CoinBar CoinName={'YYY'} CoinPrice={111} CoinChange={111}/>
                <CoinBar CoinName={'ZZZ'} CoinPrice={333} CoinChange={111}/>
                <CoinBar CoinName={'AAA'} CoinPrice={444} CoinChange={111}/>
            </div>
        </div>
    )
}
export default Home