import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import CoinBar from './coinBar/index'
import WalletAPI from '../../api/wallet_api';


const Home=()=>{

    const [BTC, setBTC] = useState();
  const [BCH, setBCH] = useState();
  const [ETH, setETH] = useState();

  useEffect(() => {
    WalletAPI.getPrice({ "TradePair": "BTCUSDT" }).then((response) => {
      console.log(response.data)
      setBTC(response.data["price"])


    }
    )
  }, []);


  useEffect(() => {
    WalletAPI.getPrice({ "TradePair": "BCHUSDT" }).then((response) => {
      console.log(response.data)
      setBCH(response.data["price"])
    }
    )
  }, [])



  useEffect(() => {
    WalletAPI.getPrice({ "TradePair": "ETHUSDT" }).then((response) => {
      console.log(response.data)
      setETH(response.data["price"]);

    }
    )
  }, [])
    const classes = useStyles()
    return(
        <div>
            <div className={classes.TitleForm}>
            <div className={classes.titleWrapper}>
                <h3 className={classes.title}>Welcome to Sandbi</h3>
                <h4 className={classes.little}>The most Trust place to exchange your crypto</h4>
            </div>
            </div>
            <div className={classes.coinContainers}>
                <CoinBar CoinName={'BTCUSDT'} CoinPrice={BTC} CoinChange={111}/>
                <CoinBar CoinName={'ETHUSDT'} CoinPrice={ETH} CoinChange={111}/>
                <CoinBar CoinName={'BCHUSDT'} CoinPrice={BCH} CoinChange={111}/>
                <CoinBar CoinName={'XXXUSDT'} CoinPrice={444} CoinChange={111}/>
            </div>
        </div>
    )
}
export default Home