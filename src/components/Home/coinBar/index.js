import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { green } from '@mui/material/colors';

const CoinBar=({CoinName,CoinPrice,CoinChange,CoinVolume,CoinRound,Sign})=>{
    const classes = useStyles()
    const Name=CoinName
    const Price=CoinPrice
    const Change = CoinChange
    const Round=CoinRound
    const Volumn= CoinVolume

    const getColor=(change)=>{
        if(change===1){
            return "red";
        } else if(change === -1){
            return "green";
        } else {
            return "#DBDBDB";
        }
    }


    return(
        <div className={classes.coinBarContainer} >
            <div className={classes.Title}>
                {Name}
            </div>
            <div className={classes.columContainers}>
                <div className={classes.Price}>
                    ${Price}
                </div>

            </div>
            <div className={classes.columContainers} >
                <div className={classes.change} style={{color:  getColor(Sign),fontSize:'14px'}}>
                    {Change}
                </div>
                <div className={classes.usdPrice}>
                    {Volumn} 24HVOL
                </div>
            </div>
        </div>
    )
}

export default CoinBar