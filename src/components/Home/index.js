import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import CoinBar from './coinBar/index'
import WalletAPI from '../../api/wallet_api';
import bg from "/opt/front/react-app-master/src/images/bg.jpeg"


const Home = () => {

  const [BTC, setBTC] = useState();
  const [BCH, setBCH] = useState();
  const [ETH, setETH] = useState();
  const [ETHBTC, setETHBTC] = useState();

  useEffect(() => {
    WalletAPI.getPrice({ "TradePair": "BTCUSDT" }).then((response) => {
      console.log(response.data)
      setBTC(response.data["price"].toFixed(2))
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

  useEffect(() => {
    WalletAPI.getPrice({ "TradePair": "ETHBTC" }).then((response) => {
      console.log(response.data)
      setETHBTC(response.data["price"].toFixed(2));

    }
    )
  }, [])

  // useEffect(() => {
  //   document.body.style.backgroundImage = bg;

  //   return () => {
  //     document.body.style.backgroundImage = bg;
  //   };
  // }, []);
  const classes = useStyles()
  return (
    
    //<div className={classes.bg}>
    <div >

      <div className={classes.TitleForm} >
        <div className={classes.titleWrapper}>
          <h3 className={classes.title}>Welcome to Sandbi</h3>
          <h4 className={classes.little}>The most Trust place to exchange your crypto</h4>
        </div>
      </div>
      <div className={classes.coinContainers}>
        <CoinBar CoinName={'BTCUSDT'} CoinPrice={BTC} CoinChange={111} Round={2} />
        <CoinBar CoinName={'ETHUSDT'} CoinPrice={ETH} CoinChange={111} Round={6} />
        <CoinBar CoinName={'BCHUSDT'} CoinPrice={BCH} CoinChange={111} Round={1}/>
        <CoinBar CoinName={'ETHBTC'} CoinPrice={ETHBTC} CoinChange={111} Round={2}/>
      </div>
    </div>
  )
}
export default Home