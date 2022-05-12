import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import WalletAPI from '../../../api/wallet_api';
import InfoAPI from '../../../api/Info-api';
import MarketAPI from '../../../api/market-api';
import { getSvgIconUtilityClass } from '@mui/material';

const AssetTable = params => {
    const [PairInfo, setInfo] = useState({})
    const classes = useStyles()
    const [CoinRender, setCoinRender] = useState([])
    const [Coindata, setCoindata] = useState([])
    const [change, setChange] = useState()
    const setTradepair = params.setTPair;
    const setcoin1 = params.setC1;
    const setcoin2 = params.setC2;



    useEffect(() => {
        InfoAPI.getTradePairs().then((response) => {
            var newlist = {}
            for (let [key, value] of Object.entries(response.data)) {
                var data = JSON.parse(value)
                newlist[key] = data
            }
            setInfo(newlist)
        })
    }, [])

    const changetradetype = (type) => {
        setTradepair(type);
        setcoin1(PairInfo[type]["Coin1"])
        setcoin2(PairInfo[type]["Coin2"])
    }


    useEffect(() => {
        var pairlist = []
        var Promiselist = [];
        for (let [key, value] of Object.entries(PairInfo)) {
            var Tpair = value["Coin1"] + value["Coin2"]
            pairlist.push(Tpair)
            
            const response = MarketAPI.getPrice({ "TradePair": Tpair })
            Promiselist.push(response)
            const openresponse = MarketAPI.getOpenPrice({ "TradePair": Tpair })
            Promiselist.push(openresponse)
        }

        Promise.all(Promiselist).then((res) => {

            var newCoindata = []
            for (let i = 0; i < pairlist.length; i++) {
                console.log()
                var price = res[2 * i].data["price"]
                var openprice = res[2 * i + 1].data["price"]
                var digit = PairInfo[pairlist[i]]["LimitPrice"]
                console.log(pairlist[i],price, openprice);
                newCoindata.push({
                    Type: pairlist[i],
                    lastPrice: price.toFixed(digit),
                    change: perenatage(price, openprice),
                    sign: getSign(price, openprice)

                })
            }
            console.log(newCoindata)
            setCoindata(newCoindata)
            setCoinRender(newCoindata)
        })

    }, [PairInfo, params.Refresh])

    const showCoin2 = (unitchange) => {
        if (unitchange == "BTC" || unitchange == "USDC") {
            var newlist = []
            for (let pair in Coindata) {
                var type = Coindata[pair].Type
                var tmpCoin = PairInfo[type]["Coin2"]
                if (tmpCoin == unitchange) {
                    newlist.push(Coindata[pair])
                }
            }
            setCoinRender(newlist)
            setTradepair(newlist[0].Type)
            setcoin1(PairInfo[newlist[0].Type]["Coin1"])
            setcoin2(PairInfo[newlist[0].Type]["Coin2"])
        }
        else {
            setCoinRender(Coindata)
            setTradepair(Coindata[0].Type)
            setcoin1(PairInfo[Coindata[0].Type]["Coin1"])
            setcoin2(PairInfo[Coindata[0].Type]["Coin2"])

        }
    }

    const perenatage = (close, open) => {
        //  console.log(number)
        if (open == 0 || close == 0) { return "0.00%" }
        if (open < close) {
            return "+" + ((close - open) / open *100).toFixed(2) + "%"
        }
        else if (open > close) {
            return ((close - open) / open *100).toFixed(2) + "%"
        }
        else {
            return "0.00%"
        }
    }

    const getColor=(change)=>{
        if(change===1){
            return "red";
        } else if(change === -1){
            return "green";
        } else {
            return "#DBDBDB";
        }
    }
    

    const getSign=(close, open)=>{
        if(open == 0|| close==0 ){return 0;}
        else{
            return Math.sign(close-open)
        }
    }

    return (
        <div className={classes.columPartContainers}>
            <div className={classes.leftSideCoinContainer}>
                <div style={{ color: 'white', fontSize: '14px' }}>Coins:</div>
                <button className={classes.CoinSetting} onClick={() => showCoin2("ALL")}>ALL</button>
                <button className={classes.CoinSetting} onClick={() => showCoin2("USDC")}>USDC</button>
                <button className={classes.CoinSetting} onClick={() => showCoin2("BTC")}>BTC</button>
                <div></div>
            </div>
            <div className={classes.leftSideContainer}>
                <div className={classes.smallText2}>Asset</div>
                <div className={classes.smallText2}>Last Price</div>
                <div className={classes.smallText2}>Change</div>
            </div>
            {CoinRender.map((item, index) => {
                return (
                    <div className={classes.leftSideContainer}>
                        <div className={classes.smallText} onClick={() => changetradetype(item.Type)}>{item.Type}</div>
                        <div className={classes.smallText}>{item.lastPrice}</div>
                        <div style={{color:  getColor(item.sign),fontSize:'14px'}}>{item.change}</div>
                    </div>
                );
            })}
        </div>

    )
}

export default AssetTable