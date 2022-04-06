import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const CoinBar=({CoinName,CoinPrice,CoinChange})=>{
    const classes = useStyles()
    const Name=CoinName
    const Price=CoinPrice
    const Change=CoinChange
    
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
                    ={Price*6}
                </div>
            </div>
            <div className={classes.columContainers}>
                <div className={classes.change}>
                    {Change}
                </div>
                <div className={classes.usdPrice}>
                    24HVOL
                </div>
            </div>
        </div>
    )
}

export default CoinBar