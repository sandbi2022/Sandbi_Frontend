import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const CoinBar=({CoinName,CoinPrice,CoinChange,CoinVolume,CoinRound})=>{
    const classes = useStyles()
    const Name=CoinName
    const Price=CoinPrice
    const Change = CoinChange
    const Round=CoinRound
    const Volumn= CoinVolume
    

    const perenatage = (number) => {
        console.log(number)
        if (number > 0) {
            return "+" + number + "%"
        }
        else {
            return "-" + number + "%"
        }


    }
    return(
        <div className={classes.coinBarContainer}>
            <div className={classes.Title}>
                {Name}
            </div>
            <div className={classes.columContainers}>
                <div className={classes.Price}>
                    {Price}
                </div>
                <div className={classes.usdPrice}>
                    ={(Price*6).toFixed(Round)}
                </div>
            </div>
            <div className={classes.columContainers}>
                <div className={classes.change}>
                    {Change}
                </div>
                <div className={classes.usdPrice}>
                    {Volumn.toFixed(6)} 24HVOL
                </div>
            </div>
        </div>
    )
}

export default CoinBar