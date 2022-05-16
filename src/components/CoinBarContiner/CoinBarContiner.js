import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import CoinBar from '../Home/coinBar/index';
import WalletAPI from '../../api/wallet_api';
import InfoAPI from '../../api/Info-api';
import MarketAPI from '../../api/market-api';

const CoinBarContainer = () => {
    const history = useHistory();
    const classes = useStyles()
    const [Pricelist, setPricelist] = useState([]);
    const [Vollist, setVollist] = useState([]);
    const [Precionlist, setPrecionlist] = useState([])
    const [Clist, setClist] = useState([])
    const [Slist, setSlist] = useState([])
    const [PairInfo, setInfo] = useState({})
    const TradePair = ["BTCUSDC", "BCHUSDC", "ETHUSDC", "ETHBTC"]

    const jumpExhange = (TradePair) => {
        console.log(TradePair)
        history.push({
            pathname: '/Exchange',
            state: { detail: TradePair }
        })

    }

    useEffect(() => {
        InfoAPI.getTradePairs().then((response) => {
            var newlist = {}
            for (let [key, value] of Object.entries(response.data)) {
                var data = JSON.parse(value)
                newlist[key] = data
            }
            setInfo(newlist)
            var Precion = []
            for (let obj in TradePair) {
                Precion.push(newlist[TradePair[obj]]["LimitPrice"])
            }
            setPrecionlist(Precion)
        })

    }, [])



    useEffect(() => {
        var Price = [];
        var vlist = []
        var PricePromise = [];
        var vlistPromise = []
        var changelist = []
        var signlist = []
        for (let obj in TradePair) {
            const price = WalletAPI.getPrice({ "TradePair": TradePair[obj] })
            const vol = MarketAPI.getGraphData({ "TradePair": TradePair[obj], "Period": "1", "Second": 86400 });
            PricePromise.push(price)
            vlistPromise.push(vol)
        }
        Promise.all(PricePromise).then((res) => {
            for (let obj in res) {
                Price.push(res[obj].data["price"])
            }
            setPricelist(Price)
        })

        Promise.all(vlistPromise).then((res) => {
            for (let obj in res) {
                for (let key of Object.keys(res[obj].data)) {
                    if (key !== "time") {
                        var data = JSON.parse(res[obj].data[key])
                        vlist.push(data["volume"])
                        changelist.push(perenatage(data["close"], data["open"]))
                        signlist.push(Math.sign(data["close"] - data["open"]))
                    }
                }
            }
            setVollist(vlist)
            setClist(changelist)
            setSlist(signlist)
        })
    }, [PairInfo])


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

    return (
        <div className={classes.coinContainers} >
            {TradePair.map((item, index) => {
                
                return <div onClick={() => jumpExhange(item)}><CoinBar CoinName={item} CoinPrice={Pricelist[index]} CoinChange={Clist[index]} Sign={Slist[index]} CoinVolume={Vollist[index]} Round={Precionlist[index]} />
                </div>
            })
            }
        </div>

    )
}

export default CoinBarContainer