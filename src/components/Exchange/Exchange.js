import { useRef, useState, useEffect, useContext } from 'react';

import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import AuthContext from "../../context/AuthProvider"
import UserServer from '../../api/user-api';
import axios from 'axios';
const Exchange =()=>{

    const history = useHistory();
    const [formErrors, setFormErrors] = useState({})
    const [total,setotal] = useState()
    const CoinData=[
		{
			Type:"xxx",
            lastPrice:100,
            change:"+100%"
		} ,
        { 
			Type:"xxx",
            lastPrice:100,
            change:"+100%"
		} ,
		{
            Type:"xxx",
            lastPrice:100,
            change:"+100%"
		},
        {
            Type:"xxx",
            lastPrice:100,
            change:"+100%"
        },
        {
            Type:"xxx",
            lastPrice:100,
            change:"+100%"
        } 
];

    const order= [
        {
        price:100,
        amount:100,
        sum :100
        },
        {
            price:100,
            amount:100,
            sum :100
        },
        {
        price:100,
        amount:100,
        sum :100
        },
]


const market= [
    {
    time:"xxxx",
    price:100,
    amount:100,
    },
    {
    time:"xxxx",
    price:100,
    amount:100,
    },
    {
        time:"xxxx",
        price:100,
        amount:100,
    },
]
    

    return(
        <div >
          <div className='leftsideMarket' style={{left:0}}>
            <div > 
			    <input type="text"></input>
			    <button >Search </button>   
		    </div> 
            {CoinData.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                      {item.Type} 
                      <span>  {item.lastPrice}  </span>
                      <span>  {item.change}</span>
                  </li>
                );
              })}

          </div>
          <div className='orderbook'>
            <div>Order Book</div>
            {order.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                      {item.price} 
                      <span>  {item.amount}  </span>
                      <span>  {item.sum}</span>
                  </li>
                );
              })}

          </div>

          <div className='Market'>
            <div>Market trading</div>
            {market.map((item, index) => {
                return (
                  <li key={index} className={item.cName}>
                      {item.time} 
                      <span>  {item.price}</span>
                      <span>  {item.amount}  </span>
                  </li>
                );
              })}

          </div>

          <div className='history'>
             <button>Open Order</button>
             <button>Order history</button>
             {/* <button>Normal</button>
             <button>Scmp-limit</button>
             <button>Trigger Order</button> */}
          </div>

         <div className='exhange'>
         <div className='left'>
             <label>Exchange</label>
             {/* <button>limit</button>
             <button>Market</button>
             <button>Stop-limit</button>
             <button>Trigger order</button> */}
             <input type="text"></input>
             <input type="text"></input>
             <label>Total</label>
             <label>{total}</label>
             <button>Exchange</button>
        </div> 
        <div className='right'>
             <label>Exchange</label>
             {/* <button>limit</button>
             <button>Market</button>
             <button>Stop-limit</button>
             <button>Trigger order</button> */}
             <input type="text"></input>
             <input type="text"></input>
             <label>Total</label>
             <label>{total}</label>
             <button>swap</button>
        </div> 
         </div>



          

        </div>
    )
}

export default Exchange