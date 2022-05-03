import { useRef, useState, useEffect, useContext } from 'react';
import { useStyles } from "./style";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import CoinBar from './coinBar/index'
import CoinBarContainer from '../CoinBarContiner/CoinBarContiner';
import WalletAPI from '../../api/wallet_api';
import bg from "/opt/front/react-app-master/src/images/bg.jpeg"


const Home = () => {
  
  const classes = useStyles()
  return (
    
    
    <div style={{marginTop:'10%'}}>

      <div className={classes.TitleForm} >
        <div className={classes.titleWrapper}>
          <h3 className={classes.title}>Welcome to Sandbi</h3>
          <h4 className={classes.little}>The most Trust place to exchange your crypto</h4>
        </div>
      </div>

    <CoinBarContainer/>
      
    </div>
  )
}
export default Home