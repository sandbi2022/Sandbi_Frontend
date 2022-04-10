import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import UserServer from '../../api/user-api';
import CoinBar from '../Home/coinBar';
import axios from 'axios';

const Market =()=>{

    const classes = useStyles();
    const history = useHistory();
    const [formErrors, setFormErrors] = useState({})
    const [PBalance,setPBalance] = useState()
    const TradeData=[
		{
			Pair: "xxx",
			LastPrice: 1000.000,
            Change:0.1,
            High:102.000,
            Low:98.0000,
            HVOL:100,
            HTumover:10000
		} ,
        {
			Pair: "xxx2",
			LastPrice: 1000.000,
            Change:-0.1,
            High:102.000,
            Low:98.0000,
            HVOL:100,
            HTumover:10000
		} ,
        {
			Pair: "xxx3",
			LastPrice: 1000.000,
            Change:0.1,
            High:102.000,
            Low:98.0000,
            HVOL:100,
            HTumover:10000
		} ,
        {
			Pair: "xxx4",
			LastPrice: 1000.000,
            Change:-0.1,
            High:102.000,
            Low:98.0000,
            HVOL:100,
            HTumover:10000
		} ,
    ]

    return(
        <div>
            <div className={classes.coinContainers}>
                <CoinBar CoinName={'XXX'} CoinPrice={222} CoinChange={111}/>
                <CoinBar CoinName={'YYY'} CoinPrice={111} CoinChange={111}/>
                <CoinBar CoinName={'ZZZ'} CoinPrice={333} CoinChange={111}/>
                <CoinBar CoinName={'AAA'} CoinPrice={444} CoinChange={111}/>
            </div>
            <div className={classes.mainContainer}>
                <div className={classes.TitleSetting}>
                    EXCHANGE
                </div>
                <div className={classes.infoContainers}>
                    <div className={classes.infoTitleSetting}>Pair</div>
                    <div  className={classes.infoTitleSetting}>Last Price</div>
                    <div className={classes.infoTitleSetting}>Change</div>
                    <div className={classes.infoTitleSetting}>High</div>
                    <div className={classes.infoTitleSetting}>Low</div>
                    <div className={classes.infoTitleSetting}>24H VOL</div>
                    <div className={classes.infoTitleSetting}>24H Tumover</div>
                </div>
                {TradeData.map((item, index) => {
                        return (
                            <div>
                            <div  className={classes.infoContainers}>
                                <div  className={classes.infoTextSetting}>{item.Pair}</div>
                                <div  className={classes.infoTextSetting}>{item.LastPrice}</div>
                    
                                <div  style={{color: Math.sign(item.Change) === -1 ? "green" : "red",fontSize:'14px'}}>
                                    {item.Change*100}%
                                </div>
                                <div  className={classes.infoTextSetting}>{item.High}</div>
                                    
                                    
                                <div  className={classes.infoTextSetting}>{item.Low}</div>
                                <div  className={classes.infoTextSetting}>{item.HVOL}</div>
                                <div  className={classes.infoTextSetting}>{item.HTumover}</div>
                            </div>
                            <hr
                            style={{
                                color: '#707070',
                                height: 3,
                                width:'90%'
                            }}/>
                            </div>
                        
                        );
                    })} 
 
            </div>

        </div>
    )
}
export default Market